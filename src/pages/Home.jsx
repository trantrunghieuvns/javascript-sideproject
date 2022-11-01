import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import requests from "../Request";
import ReactPlayer from "react-player";
const Home = (props) => {
	return (
		<>
			<Main />
			<Row rowID = '1' title="Trending" fetchURL={requests.requestTrending} />
			<Row rowID = '2' title="Up coming" fetchURL={requests.requestUpComing} />
			<Row rowID = '3' title="Top Rated" fetchURL={requests.requestTopRated} />
		</>
	);
};

export default Home;
