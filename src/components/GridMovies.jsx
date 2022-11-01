import React, { useEffect, useState } from "react";
import Movies from "./Movies";


function GridMovies(movies) {
	const films = movies.movies.movies;
	const [filteredFilms, setFilteredFilms] = useState([]);

	useEffect(() => {
		setFilteredFilms(films.filter((item) => item.backdrop_path !== null));
	}, [films]);

	return (
		<>
			<div className="py-12 z-[100]">
				<h2 className=" text-white font-medium md:text-xl py-12 px-8">
					Your Search
				</h2>

				<div className="group relative flex items-center">
					<div
						id={"slider"}
						className="w-full h-full overflow-x-scroll scroll-smooth scrollbar-hide relative"
					>
						{filteredFilms.map((item, id) => (
							<Movies key={id} item={item} />
						))}
					</div>
				</div>
			</div>
		</>
	);
}

export default GridMovies;
