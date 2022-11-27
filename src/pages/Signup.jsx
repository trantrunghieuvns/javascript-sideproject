import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

function Signup() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user, signUp } = UserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signUp(email, password);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const imageK =
		'https://assets.nflxext.com/ffe/siteui/vlv3/0f07b807-7be1-457d-be88-eb9153d5d4e9/c9061c43-8a1d-46b1-a5e4-9b6faddf4536/VN-en-20220815-popsignuptwoweeks-perspective_alpha_website_medium.jpg';

	return (
		<div className='z-40 relative'>
			<div className='w-full h-screen '>
				<img
					className=' opacity-0 sm:opacity-100 fixed w-full h-full object-cover '
					src={imageK}
					alt='background'
				/>

				<div className=' w-full h-full px-4 py-24 z-50 absolute'>
					<div className='max-w-[450px] h-[600px] mx-auto bg-black/75 text-white'>
						<div className='max-w-[320px] mx-auto py-16 '>
							<h1 className='text-3xl font-bold text-gray-100'>Sign Up</h1>
							<form
								onSubmit={handleSubmit}
								className='flex py-12 w-full flex-col'>
								<input
									onChange={(e) => setEmail(e.target.value)}
									className='my-3 p-2 bg-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
									type='email'
									placeholder='Email'
									autoComplete='email'
								/>
								<input
									onChange={(e) => setPassword(e.target.value)}
									className=' my-1 p-2 bg-gray-700 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500'
									type='password'
									placeholder='Password'
									autoComplete='current-password'
								/>

								<button
									className='bg-red-600 py-3 my-6 rounded font-bold text-gray-100 hover:bg-red-700'
									onClick={handleSubmit}>
									Sign Up
								</button>

								<div className='flex justify-between '>
									<p className='text-gray-100'>
										<input
											className='mr-2 checked:bg-gray-100'
											type='checkbox'
										/>
										Remember Me
									</p>
									<p className='hover:cursor-pointer hover:underline text-gray-100 hover:text-blue-100'>
										Need Help
									</p>
								</div>
								<div>
									<p className='py-1 flex 	justify-left'>
										<span className='text-gray-600 	text-xs py-3  mr-3'>
											Already subscribed to netflix?
										</span>

										<Link to='/login' className='py-2'>
											Sign In
										</Link>
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div className='bg-black/60 fixed top-0 left-0 w-full h-screen'></div>
		</div>
	);
}

export default Signup;
