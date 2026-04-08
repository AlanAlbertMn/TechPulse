import Link from 'next/link';

const LoginPage = () => {
	return (
		<section className='mx-auto w-xl py-12'>
			<div className='h-96'>
				<form className='my-4 flex flex-col gap-7'>
					<h2 className='text-4xl'>Login with email</h2>

					<input
						className='bg-slate-700 text-white px-6 py-2 rounded'
						placeholder='email'
					></input>
					<input
						className='bg-slate-700 text-white px-6 py-2 rounded'
						type='password'
						placeholder='password'
					></input>
          <button className='w-xs mx-auto px-6 py-2 my-6 rounded bg-cyan-800 text-white font-bold'>Login</button>
				</form>
				<Link href='/register' className='text-xl'>Create an account</Link>
			</div>
		</section>
	);
};

export default LoginPage;
