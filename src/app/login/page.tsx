'use client';
import { signInSchema } from '@/types/User';
import Link from 'next/link';
import { Resolver, SubmitErrorHandler, useForm } from 'react-hook-form';
import { signIn } from '../api/auth/nextjs/actions';
import { toast } from 'react-toastify';

const resolver: Resolver<signInSchema> = async (values) => {
	//TODO - Add passwords are equal validation
	return {
		values: values.email ? values : {},
		errors: !values.email
			? {
					email: {
						type: 'required',
						message: 'An email is required',
					},
				}
			: {},
	};
};

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<signInSchema>({ resolver });

	async function onSubmit(data: signInSchema) {
		// console.log(data);
		const user = await signIn(data);
		if (
			user === 'Account already exists for this email' ||
			user === 'Unable to log you in'
		) {
			toast.error(user, {
				position: 'bottom-right',
				closeOnClick: true,
				pauseOnHover: false,
				theme: 'colored',
			});
		} else console.log(user);
	}

	const onError: SubmitErrorHandler<signInSchema> = (errors) =>
		console.log(errors);
	return (
		<section className='mx-auto w-xl py-12'>
			<div className='h-96'>
				<form
					className='my-4 flex flex-col gap-7'
					onSubmit={handleSubmit(onSubmit, onError)}
				>
					<h2 className='text-4xl'>Login with email</h2>

					<input
						className='bg-[#d8d8d8] text-slate-950 dark:bg-slate-700 dark:text-white px-6 py-2 rounded'
						placeholder='email'
						{...register('email')}
					/>
					{errors.email && (
						<p className='text-red-500'>{errors.email.message}</p>
					)}
					<input
						className='bg-[#d8d8d8] text-slate-950 dark:bg-slate-700 dark:text-white px-6 py-2 rounded'
						type='password'
						placeholder='password'
						{...register('password')}
					/>
					<button className='w-xs mx-auto px-6 py-2 my-6 rounded bg-[#2563EB] hover:bg-[#1a4196] cursor-pointer text-white font-bold'>
						Login
					</button>
				</form>
				<Link href='/register' className=''>
					Not registered yet?{' '}
					<span className='text-[#2563EB]'>Create an account</span>
				</Link>
			</div>
		</section>
	);
};

export default LoginPage;
