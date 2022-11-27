import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './pages/Search';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from './Request';

function App() {
	const [searchResults, setSearchResults] = useState('');
	const [movies, setMovies] = useState([]);
	const fetchURLSearch = `${requests.requestSearch} + '+' ${searchResults} `;

	useEffect(() => {
		if (searchResults)
			axios.get(fetchURLSearch).then((response) => {
				setMovies(response.data.results);
			});
	}, [searchResults, fetchURLSearch]);

	return (
		<div className=''>
			<AuthContextProvider>
				<Navbar setSearchResults={setSearchResults} className='z-[100]' />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<Signup />} />
					<Route
						setSearchResults={searchResults}
						path='/search'
						element={<Search movies={movies} />}
					/>
					<Route
						path='/account'
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AuthContextProvider>
		</div>
	);
}

export default App;
