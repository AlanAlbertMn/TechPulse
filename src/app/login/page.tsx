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
						className='bg-slate-700 text-white px-6 py-2 rounded'
						placeholder='email'
						{...register('email')}
					/>
					{errors.email && (
						<p className='text-red-500'>{errors.email.message}</p>
					)}
					<input
						className='bg-slate-700 text-white px-6 py-2 rounded'
						type='password'
						placeholder='password'
						{...register('password')}
					/>
					<button className='w-xs mx-auto px-6 py-2 my-6 rounded bg-cyan-800 text-white font-bold'>
						Login
					</button>
				</form>
				<Link href='/register' className='text-xl'>
					Create an account
				</Link>
			</div>
		</section>
	);
};

export default LoginPage;
