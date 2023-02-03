import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Box, Button, Typography } from "@mui/material";
import { API } from "../api/hello";
import TopTracks from "@/component/TopTracks";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

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

	React.useEffect(() => {
		const getData = async () => {
			setUser(await API.getUser(values));
			setTracks(await API.getTopArtists(values));
		};
		getData();
	}, [values]);

	const container = useRef(null);

	function exportToJPEG(dom: any) {
		domtoimage
			.toPng(dom)
			.then(function (dataUrl: string) {
				const link = document.createElement("a");
				link.href = dataUrl;
				link.download = "image.jpeg";
				link.click();
			})
			.catch(function (error: any) {
				console.error("oops, something went wrong!", error);
			});
	}

	return (
		<Box
			sx={{
				display: "flex",
				width: "100%",
				minHeight: "100vh",
				alignItems: "center",
				flexDirection: "column",
				marginTop: "0px",
			}}
		>
			{user && (
				<Box
					sx={{
						width: "40%",
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
					<Typography
						variant="h5"
						sx={{
							marginTop: "20px",
							color: "#fff",
							fontFamily: "Gotham-Bold",
							fontWeight: 400,
							textTransform: "uppercase",
						}}
					>
						USER: {user?.display_name}
					</Typography>
				</Box>
			)}

			<TopTracks ref={container} tracks={tracks} />

			<Button
				variant="contained"
				size="large"
				color="success"
				sx={{
					marginBottom: "10px",
				}}
				onClick={() => exportToJPEG(container.current)}
			>
				Download
			</Button>
			<Button
				variant="contained"
				size="large"
				color="success"
				onClick={() => {
					router.push({
						pathname: "http://localhost:3000",
					});
				}}
				sx={{
					marginBottom: "10px",
				}}
			>
				Logout
			</Button>
		</Box>
	);
};

export default Home;
