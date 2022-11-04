import React from "react";
import ReactPlayer from "react-player/lazy";
import { truncateString } from "../actions/truncateString";
import { useState } from "react";
import movieTrailer from "movie-trailer";
import { useEffect } from "react";

const TrailerMovie = ({ movieTitle, movie }) => {
  const [video, setVideo] = useState("inception");
  const [videoURL, setVideoURL] = useState("");
console.log(movieTitle);
  function handleSearch() {
    setVideo(movieTitle);
    movieTrailer(video).then((res) => {
      setVideoURL(res);
    });
  }
  useEffect(() => {
    handleSearch();
    console.log(videoURL)
  }, [videoURL]);

  // const theMovieTitle = () => {
  //   { movieTitle ? movie.title : movie.name}

  // }

  return (
    <div className="flex">
      <div className="flex su:flex-col-reverse md:flex-row sm:flex-col-reverse relative">
        <div className="flex flex-col md:h-screen p-6 whitespace-normal justify-center w-[20rem]">
          <h1 className="font-black  ml-0 text-3xl">{movieTitle}</h1>
          <p className="text-gray-400 text-sm mt-3">
            Release: {movie?.release_date}
          </p>

          <p className="text-gray-300 text-sm mt-3 whitespace-normal">
            Overview: {truncateString(movie?.overview, 170)}
          </p>
        </div>

        <div className="Container hidden absolute z-[50]"></div>
        <div className="su:h-[10rem] sm:h-[12rem] flex items-center justify-center md:h-screen">
          <div className="flex player  md:w-[460px] md:h-[300px] lg:w-[800px] lg:h-[650px]">
            <ReactPlayer
              className="react-player"
              playing
              width="100%"
              height="80%"
              url={videoURL}
              controls={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerMovie;
