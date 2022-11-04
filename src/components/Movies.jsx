import React, { useState } from "react";
import { truncateString } from "./actions/truncateString";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import TrailerMovie from "./Trailers/TrailerMovie";
import { AiOutlineClose } from "react-icons/ai";

const Movies = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, "user", `${user?.email}`);

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
          release_date: item.release_date,
          overview: item.overview,
        }),
      });
    } else {
      alert("pls login to save a movie");
    }
  };

  const [trailer, setTrailer] = useState(false);
  const [movieTitle, setMovieTitle] = useState();

  const MovieTitle = (item) => {
    setMovieTitle(item.title);
    setTrailer(true);
  };

  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 ">
        <img
          className="w-full h-auto block"
          src={`https://image.tmdb.org/t/p/w500/.${item?.backdrop_path}`}
          alt={item?.title}
        />
        <div className="transition hover:opacity-90 duration-150 absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 text-white">
          <p
            onClick={() => {
           
              MovieTitle(item);
            }}
            className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center "
          >
            {truncateString(item?.title, 30)}
          </p>

          <p onClick={saveShow} className="absolute top-5 right-5">
            {like ? <FaHeart /> : <FaRegHeart />}
          </p>
        </div>
      </div>

      {/* trailer part */}
      {trailer ? (
        <div
          onClick={() => setTrailer(false)}
          className="z-50  w-screen fixed inset-0 bg-black/90 text-white/90 "
        >
          <div className="flex player items-center justify-center h-screen w-screen">
            <TrailerMovie movieTitle={movieTitle} movie={item} />

            <AiOutlineClose
              id={item.title}
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

export default Movies;
