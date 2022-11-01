import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movies from "./Movies";



function Row({ title, fetchURL, rowID }) {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		axios.get(fetchURL).then((response) => {
			setMovies(response.data.results);
		});
	}, [fetchURL]);

	const slideLeft = () => {
		var slider = document.getElementById("slider" + rowID);
		slider.scrollLeft = slider.scrollLeft - 500;
	};

	const slideRight = () => {
		var slider = document.getElementById("slider" + rowID);
		slider.scrollLeft = slider.scrollLeft + 500;
	};



	return (
		<div className="">
			<h2 className=" text-white font-medium md:text-xl py-2 px-8">{title}</h2>

			<div className="group relative flex items-center">
				<MdChevronLeft
					onClick={slideLeft}
					className="transition bg-white left-0 rounded-full absolute opacity-0 cursor-pointer z-10 group-hover:opacity-50 duration-500"
					size={40}
				/>
				<div
					id={"slider" + rowID}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
				>
					{movies.map((item, id) => (
						<Movies key={id} item={item} />
					))}
				</div>

				<MdChevronRight
					onClick={slideRight}
					className="transition bg-white right-0 rounded-full absolute opacity-0 cursor-pointer z-10 group-hover:opacity-50 duration-500"
					size={40}
				/>

		
			</div>
		</div>
	);
}

export default Row;
