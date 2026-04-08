import Link from 'next/link';
import React from 'react';

const RegisterPage = () => {
	return (
		<section className='mx-auto w-xl py-12'>
			<div className=''>
				<form className='my-4 flex flex-col gap-7'>
					<h2 className='text-4xl mb-6'>Create an account</h2>
					<input
						className='bg-slate-700 text-white px-6 py-2 rounded'
						placeholder='Name'
					></input>
					<input
						className='bg-slate-700 text-white px-6 py-2 rounded'
						type='email'
						placeholder='Email'
					></input>
					<input
						className='bg-slate-700 text-white px-6 py-2 rounded'
						type='password'
						placeholder='Password'
					></input>
					<input
						className='bg-slate-700 text-white px-6 py-2 rounded'
						type='password'
						placeholder='Confirm password'
					></input>
					<button className='px-6 py-2 my-5 mx-auto rounded bg-cyan-800 text-white font-bold w-xs'>
						Submit
					</button>
			<Link href='/login' className='text-xl'>
				Login with existing account
			</Link>
				</form>
			</div>
		</section>
	);
};

export default RegisterPage;
