'use client';
import { signUpSchema } from '@/types/User';
import Link from 'next/link';
import { Resolver, SubmitErrorHandler, useForm } from 'react-hook-form';
import { signUp } from '../api/auth/nextjs/actions';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

const resolver: Resolver<signUpSchema> = async (values) => {
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

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<signUpSchema>({ resolver });

	async function onSubmit(data: signUpSchema) {
		// console.log(data);
		const user = await signUp(data);
		if (
			user === 'Account already exists for this email' ||
			user === 'Unable to create account'
		) {
			toast.error(user, {
				position: 'bottom-right',
				closeOnClick: true,
				pauseOnHover: false,
				theme: 'colored',
			});
		} else redirect('/');
	}

	const onError: SubmitErrorHandler<signUpSchema> = (errors) =>
		console.log(errors);

	return (
		<section className='mx-auto w-xl py-12'>
			<div className=''>
				<form
					className='my-4 flex flex-col gap-7'
					onSubmit={handleSubmit(onSubmit, onError)}
				>
					<h2 className='text-4xl mb-6'>Create an account</h2>
					<input
						className='bg-[#d8d8d8] text-slate-950 dark:bg-slate-700 dark:text-white px-6 py-2 rounded'
						placeholder='Name'
						{...register('name')}
						required
						minLength={2}
						autoComplete={'name'}
					/>
					<input
						className='bg-[#d8d8d8] text-slate-950 dark:bg-slate-700 dark:text-white px-6 py-2 rounded'
						type='email'
						placeholder='Email'
						required
						{...register('email')}
						autoComplete={'email'}
					/>
					{errors.email && (
						<p className='text-red-500'>{errors.email.message}</p>
					)}
					<input
						className='bg-[#d8d8d8] text-slate-950 dark:bg-slate-700 dark:text-white px-6 py-2 rounded'
						type='password'
						placeholder='Password'
						{...register('password')}
						required
						minLength={8}
					></input>
					<input
						className='bg-[#d8d8d8] text-slate-950 dark:bg-slate-700 dark:text-white px-6 py-2 rounded'
						type='password'
						placeholder='Confirm password'
						{...register('confirmPassword')}
						required
					></input>
					<button
						type='submit'
						className='px-6 py-2 my-5 mx-auto rounded bg-[#2563EB] hover:bg-[#1a4196] cursor-pointer text-white font-bold w-xs'
					>
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
