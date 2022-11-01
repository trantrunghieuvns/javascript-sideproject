import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import requests from "../Request";

import { truncateString } from "../constants/truncateString";

const Main = () => {
  const [movies, setMovies] = useState([]);

  const movie = movies[Math.floor(Math.random() * movies.length)];

  const imgPath = movie?.backdrop_path;

  useEffect(() => {
    axios.get(requests.requestTrending).then((response) => {
      setMovies(response.data.results);
    });
  }, []);

  return (
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
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5 ">
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
  );
};

export default Main;
