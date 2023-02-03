import React from "react";
import { useRouter } from "next/router";
import { Box, Button, IconButton, Slider, Typography } from "@mui/material";
import { API } from "../api/hello";
import {
	FastRewindRounded,
	PlayArrowRounded,
	FastForwardRounded,
} from "@mui/icons-material";

const initialState = {
	access_token: ``,
	token_type: ``,
	expires_in: ``,
};

const Home = () => {
	const router = useRouter();

	const [values, setValues] = React.useState(initialState);
	const [tracks, setTracks] = React.useState<any[]>([]);
	const [user, setUser] = React.useState<any>({});

	React.useEffect(() => {
		const path = router.asPath.split("#")[1];
		setValues({
			access_token: `${path.split("&")[0].split("=")[1]}`,
			token_type: `${path.split("&")[1].split("=")[1]}`,
			expires_in: `${path.split("&")[2].split("=")[1]}`,
		});
	}, [router.asPath]);

	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				minHeight: "100vh",
				alignItems: "center",
				flexDirection: "column",
				marginTop: "20px",
			}}
		>
			<Button
				variant="contained"
				size="large"
				color="success"
				onClick={async () => {
					setUser(await API.getUser(values));
					setTracks(await API.getTopArtists(values));
				}}
			>
				Get Data
			</Button>
			{user && (
				<Box
					sx={{
						width: "40%",
						margin: "10px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					{user?.images?.length > 0 && (
						<img
							src={user?.images[0].url}
							alt="Profile picture"
							style={{
								marginBottom: "10px",
							}}
						/>
					)}
					<Typography variant="h5">{user?.display_name}</Typography>
				</Box>
			)}
			<Button variant="contained" size="large" color="success">
				Convert to PNG
			</Button>
			<Typography
				variant="h4"
				align="center"
				sx={{
					marginTop: "20px",
					color: "#fff",
					fontFamily: "Gotham",
					fontWeight: 500,
				}}
			>
				SPOTI-FIVE
				<Typography
					sx={{
						fontSize: "14px !important",
						fontFamily: "Gotham",
						fontWeight: 200,
					}}
				>
					(últimos 6 meses)
				</Typography>
			</Typography>
			<Box
				id="top-10"
				sx={{
					width: "50%",
					margin: "10px",
					padding: "10px 30px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{tracks?.map((track, i) => (
					<Box
						key={i}
						sx={{
							width: "600px",
							height: "100px",
							margin: "5px 0",
						}}
					>
						<Box
							sx={{
								width: "600px",
								height: "100px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								borderRadius: "20px",
								background: `url(${track.album.images[1].url})`,
								backgroundSize: "cover",
								backgroundPosition: "center center",
								overflow: "hidden",

								"&::before": {
									content: "''",
									width: "600px",
									height: "100px",
									position: "absolute",
									backdropFilter: "blur(20px)",
									background: "rgba(0,0,0,.3)",
									borderRadius: "20px",
									border: "1px solid rgba(255,255,255,.15)",
								},
							}}
						></Box>
						<Box
							sx={{
								position: "relative",
								top: "-100px",
								width: "100%",
								height: "100%",
								display: "flex",
								justifyContent: "space-evenly",
								alignItems: "center",
							}}
						>
							<img
								src={`${track.album.images[1].url}`}
								style={{
									width: "70px",
									height: "70px",
									borderRadius: "10px",
									border: "1px solid white",
									boxShadow: "0 0 5px 2px rgba(255,255,255,.2)",
								}}
							/>
							<Box
								sx={{
									width: "80%",
									height: "100%",
									paddingY: "14px",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Box
									sx={{
										width: "65%",
										display: "flex",
										flexDirection: "column",
									}}
								>
									<Typography
										sx={{
											fontSize: "18px !important",
											color: "#fff",
											fontWeight: 700,
										}}
									>
										{track.name}
									</Typography>
									<Typography
										sx={{
											fontSize: "14px !important",
											color: "#E3E3E3",
											fontWeight: "100 !important",
										}}
									>
										{track.artists.map((artist: { name: string }, i: number) =>
											i === track.artists.length - 1
												? `${artist.name}`
												: `${artist.name}, `
										)}
									</Typography>
								</Box>
								<Box
									sx={{
										width: "30%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Box
										sx={{
											width: "100%",
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center",
										}}
									>
										<IconButton sx={{ width: "40px", height: "40px" }}>
											<FastRewindRounded
												sx={{ color: "#fff" }}
												fontSize="large"
											/>
										</IconButton>
										<IconButton sx={{ width: "40px", height: "40px" }}>
											<PlayArrowRounded
												sx={{ color: "#fff" }}
												fontSize="large"
											/>
										</IconButton>
										<IconButton sx={{ width: "40px", height: "40px" }}>
											<FastForwardRounded
												sx={{ color: "#fff" }}
												fontSize="large"
											/>
										</IconButton>
									</Box>
									<Box
										sx={{
											width: "90%",
										}}
									>
										<Slider
											size="small"
											defaultValue={Math.round(Math.random() * 100)}
											sx={{
												color: "#fff",
											}}
										/>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default Home;
