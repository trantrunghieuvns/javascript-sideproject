import React, { useState } from "react";
import TrailerMovie from "../components/Trailers/TrailerMovie";
import { AiOutlineClose } from "react-icons/ai";

const Trailer = ({movieTitle, movie}) => {


	const [trailer, setTrailer] = useState(true);
	


	return (
		<>
			{trailer ? (
				<div
					onClick={() => setTrailer(false)}
					className="z-50  w-screen fixed inset-0 
  bg-black/90 text-white/90 "
				>
					<div className="flex player items-center justify-center h-screen w-screen">
						<TrailerMovie movieTitle={movieTitle} movie={movie} />

						<AiOutlineClose
							id={movie.title}
							className="fixed mx-[25em] -my-[8em]"
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

export default Trailer;
