import React, { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { truncateString } from "./actions/truncateString";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, onSnapshot } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";
import { isValidTimestamp } from "@firebase/util";
import TrailerMovie from "./Trailers/TrailerMovie";

const SavedShows = (item) => {
  const [movies, setMovies] = useState([]);

  const [trailer, setTrailer] = useState(false);
  const [movieTitle, setMovieTitle] = useState();
  const [movie, setMovie] = useState();
  const MovieTitle = (item) => {
    setMovie(item);
    setMovieTitle(item.title);
    setTrailer(true);
  };

  const { user } = UserAuth();

  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, "user", `${user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.email]);

  const imageK =
    "https://assets.nflxext.com/ffe/siteui/vlv3/0f07b807-7be1-457d-be88-eb9153d5d4e9/c9061c43-8a1d-46b1-a5e4-9b6faddf4536/VN-en-20220815-popsignuptwoweeks-perspective_alpha_website_medium.jpg";

  const movieRef = doc(db, "user", `${user.email}`);

  const deleteShow = async (theChosenId) => {
    try {
      const result = movies.filter((item) => item.id !== theChosenId);
      await updateDoc(movieRef, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full text-white">
        <img src={imageK} alt="" className="w-full h-[450px] object-cover" />
      </div>

      <div className="bg-black/50 fixed top-0 w-full left-0 h-[450px]"></div>
      <div className="absolute top-[20%] p-4 md:p-5">
        <h1 className="text-white text-3xl md:text-5xl font-bold">My Shows</h1>
      </div>
      <h4 className="text-white px-4 mt-6 text-white/50 font-bold">
        Here r my shows
      </h4>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="transition bg-white left-0 rounded-full absolute opacity-0 cursor-pointer z-10 group-hover:opacity-50 duration-500"
          size={40}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative "
        >
          {movies?.map((item, id) => (
            <div
              key={id}
              className="w-[200px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
            >
              <img
                className="w-full h-full block"
                src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
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

                <p
                  onClick={() => deleteShow(item.id)}
                  className="absolute text-gray-300 top-3 right-3 md:top-5 md:right-5"
                >
                  <AiOutlineClose></AiOutlineClose>
                </p>
              </div>
            </div>
          ))}
        </div>

        <MdChevronRight
          onClick={slideRight}
          className="transition bg-white right-0 rounded-full absolute opacity-0 cursor-pointer z-10 group-hover:opacity-50 duration-500"
          size={40}
        />
      </div>

      {/* trailer part */}
      {trailer ? (
        <div
          onClick={() => setTrailer(false)}
          className="z-50  w-screen fixed inset-0 bg-black/90 text-white/90 "
        >
          <div className="flex player items-center justify-center h-screen w-screen">
            <TrailerMovie movieTitle={movieTitle} movie={movie} />

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
    </div>
  );
};

export default SavedShows;
