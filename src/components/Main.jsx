import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import requests from '../Request';
import TrailerMovie from './Trailers/TrailerMovie';
import { truncateString } from './actions/truncateString';
import { AiOutlineClose } from 'react-icons/ai';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import '../CSS/slider.css';

const Main = () => {
	//react-Slick setting
	const settings = {
		dots: true,
		infinite: true,
		speed: 1100,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		centerPadding: '100px',
		autoplaySpeed: 1800,
		cssEase: 'linear',
		fade: true,
		pauseOnHover: true,
	};

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios.get(requests.requestTrending).then((response) => {
			setMovies(response.data.results);
		});
	}, []);

	const [movie, setMovie] = useState([]);

	useEffect(() => {
		const movie = movies[Math.floor(Math.random() * movies.length)];
		setMovie(movie);
	}, [movies]);

	// const imgPath = movie?.backdrop_path;

	const [trailer, setTrailer] = useState(false);
	const [movieTitle, setMovieTitle] = useState();

	const MovieTitle = (movie) => {
		setMovieTitle(movie.title ? movie.title : movie.name);
		setTrailer(true);
	};

	return (
		<>
			<div className='slider_main z-0 w-full h-[560px] text-white mb-6'>
				<Slider {...settings}>
					{movies.map((movie) => (
						<div className='desc-main w-full h-[560px]'>
							<div className='blackBg '></div>
							<img
								src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
								alt={`watch ${movie.title} online`}
							/>
							<div className='description absolute w-full top-[20%] p-4 md:p-8 md:-mt-7 sm:mt-5 su:w-[60%]'>
								<h1 className='font-black py-5 ml-0 md:text-5xl su:text-3xl sm:text-4xl'>
									{movie?.title ? movie.title : movie.name}
								</h1>
								<div>
									<button
										onClick={() => {
											MovieTitle(movie);
										}}
										className='border bg-gray-300 text-black border-gray-300 py-2 px-5 '>
										Play
									</button>
									<button className='border text-white border-gray-300 py-2 px-5 ml-4'>
										Watch Later
									</button>
								</div>
								<p className='text-gray-400 text-sm mt-4'>
									Release: {movie?.release_date}
								</p>

								<p className='text-gray-300 text-sm sm:mt-5 su:w-[60%] md:w-[90%] md:max-w-[80%] lg:max-w-[85%] '>
									Overview: {truncateString(movie?.overview, 150)}
								</p>
							</div>
						</div>
					))}
				</Slider>
			</div>

			{trailer ? (
				<div
					onClick={() => setTrailer(false)}
					className='z-50 w-screen overflow:hidden fixed inset-0 bg-black/90 text-white/90 '>
					<div className='flex player fixed items-center justify-center h-screen w-screen'>
						<TrailerMovie movieTitle={movieTitle} movie={movie} />
						<AiOutlineClose
							id={movie.title}
							className='fixed mx-[8em] -my-[11em] md:mx-[23em] md:-my-[9em]  lg:mx-[33em] lg:-my-[18em] xl:mx-[33em] xl:-my-[18em] cursor-pointer'
							onClick={() => setTrailer(false)}
						/>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	);
};

export default Main;
