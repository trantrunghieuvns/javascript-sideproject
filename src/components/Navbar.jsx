import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

const Navbar = ({ movies, searchResults, setSearchResults }) => {
	const navigate = useNavigate();
	const inputRef = useRef("");
	const [term, setTerm] = useState("");
	const { user, logOut } = UserAuth();

	const handleLogOut = async () => {
		try {
			await logOut();
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		navigate("/search");
		if (!term) return;
		setSearchResults(term);
		inputRef.current.value = "";
	};

	const handleSearchChange = (e) => {
		setTerm(e.target.value);
	};

	return (
		<div className="flex justify-between p-4 z-[100] w-full absolute">
			<Link to="/">
				<h1 className="text-red-600 text-2xl font-bold cursor-pointer">
					NETFLIX
				</h1>
			</Link>

			{user?.email ? ( // 2 situations
				<div>
					<div className="my-10 absolute md:my-0 md:-mt-3 md:-m-[30%] lg:-mx-[20%] opacity-70 hover:opacity-80 transition-all transition-duration: 350ms">
						<div className="search-bar">
							<form onSubmit={handleSubmit}>
								<input
									ref={inputRef}
									className="placeholder:px-3 bg-slate-700 py-1 mt-4 rounded cursor-pointer text-white w-[100%] -mr-1 md:-mr-8 "
									type="text"
									placeholder={`Search...`}
									onChange={handleSearchChange}
								/>

								<div className="text-white">
									<button type="submit" className="block">
										<AiOutlineSearch className=" absolute -my-6 right-3 block" />
									</button>
								</div>
							</form>
						</div>
					</div>

					<Link to="/account">
						<button className="text-white pr-5">Account</button>
					</Link>
					<Link to="/">
						<button
							className="bg-red-600  px-5 py-2 rounded cursor-pointer text-white"
							onClick={handleLogOut}
						>
							Log Out
						</button>
					</Link>
				</div>
			) : (
				<div>
					<Link to="/login">
						<button className="text-white pr-5">Sign In</button>
					</Link>
					<Link to="/signup">
						<button className="bg-red-600  px-5 py-2 rounded cursor-pointer text-white">
							Sign Up
						</button>
					</Link>
				</div>
			)}
		</div>
	);
};

export default Navbar;
