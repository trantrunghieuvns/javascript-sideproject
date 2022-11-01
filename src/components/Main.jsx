import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import requests from "../Request";
import TrailerMovie from "./Trailers/TrailerMovie";
import { truncateString } from "../constants/truncateString";
import { AiOutlineClose } from "react-icons/ai";
const Main = () => {
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
  
    console.log(movie);
  }, [movies]);

  
  const imgPath = movie?.backdrop_path;

  const [trailer, setTrailer] = useState(false);
  const [movieTitle, setMovieTitle] = useState();

  const MovieTitle = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(true);
  };

  return (
    <>
      <div className="w-full h-[550px] text-white mb-6">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black"></div>
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original/${imgPath}`}
            alt="movie?.title"
          />
          <div className="absolute w-full top-[20%] p-4 md:p-8">
            <h1 className="font-black py-5 ml-0 text-5xl">{movie?.title}</h1>
            <div>
              <button
                onClick={() => {
                  MovieTitle(movie);
                }}
                className="border bg-gray-300 text-black border-gray-300 py-2 px-5 "
              >
                Play
              </button>
              <button className="border text-white border-gray-300 py-2 px-5 ml-4">
                Watch Later
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Release: {movie?.release_date}
            </p>

            <p className="text-gray-300 text-sm mt-4 w-full md:max-w-[60%] lg:max-w-[35%] ">
              Overview: {truncateString(movie?.overview, 150)}
            </p>
          </div>
        </div>
      </div>

      {trailer ? (
        <div
          onClick={() => setTrailer(false)}
          className="z-50  w-screen fixed inset-0 bg-black/90 text-white/90 "
        >
          <div className="flex player items-center justify-center h-screen w-screen">
            <TrailerMovie movieTitle={movieTitle} movie={movie} />

            <AiOutlineClose
              id={movie.title}
              className="fixed mx-[8em] -my-[11em] md:mx-[23em] md:-my-[9em]  lg:mx-[33em] lg:-my-[18em] xl:mx-[33em] xl:-my-[18em] cursor-pointer"
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
