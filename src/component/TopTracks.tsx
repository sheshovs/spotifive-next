import { Box, IconButton, Slider, Typography } from "@mui/material";
import React from "react";
import {
	FastRewindRounded,
	PlayArrowRounded,
	FastForwardRounded,
} from "@mui/icons-material";

interface TopTracksProps {
	tracks: any[];
}

const TopTracks = React.forwardRef(({ tracks }: TopTracksProps, ref) => {
	return (
		<Box
			ref={ref}
			id="top-10"
			sx={{
				width: "50%",
				padding: "10px 30px 20px 30px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				background: "#212124",
			}}
		>
			<Typography
				variant="h4"
				align="center"
				sx={{
					marginY: "10px",
					color: "#fff",
					fontFamily: "Gotham-Bold",
					fontWeight: 400,
				}}
			>
				SpotiFive
				<Typography
					sx={{
						fontSize: "14px !important",
						fontFamily: "Gotham-Light",
						fontWeight: 400,
					}}
				>
					(last 6 months)
				</Typography>
			</Typography>
			{tracks?.map((track, i) => (
				<Box
					key={i}
					sx={{
						width: "600px",
						height: "100px",
						margin: "5px 0",
						overflow: "hidden",
						borderRadius: "20px",
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
							filter: `blur(15px)`,

							"&::before": {
								content: "''",
								width: "600px",
								height: "100px",
								position: "relative",
								background: "rgba(0,0,0,.3)",
								borderRadius: "20px",
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
							border: "1px solid rgba(255,255,255,.15)",
							borderRadius: "20px",
							overflow: "hidden",
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
										<PlayArrowRounded sx={{ color: "#fff" }} fontSize="large" />
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
	);
});

TopTracks.displayName = "TopTracks";

export default TopTracks;
