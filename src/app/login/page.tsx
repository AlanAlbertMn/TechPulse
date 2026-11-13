'use client';
import { signInSchema } from '@/types/User';
import Link from 'next/link';
import { Resolver, SubmitErrorHandler, useForm } from 'react-hook-form';
import { signIn } from '../api/auth/nextjs/actions';
import { toast } from 'react-toastify';
import { motion } from 'motion/react';
import {
	ArrowRightIcon,
	EnvelopeSimpleIcon,
	LockKeyIcon,
	ShieldCheckIcon,
	ShoppingCartSimpleIcon,
	UserPlusIcon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from '@/components/ui/input-group';
import PasswordInput from '@/components/auth/PasswordInput';
import { Spinner } from '@/components/ui/spinner';
import { EASE_OUT_EXPO, rise, stagger } from '@/lib/motion';

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

const pageStagger = stagger(0.1);

const STATUS_LINES = [
	{ icon: ShieldCheckIcon, text: 'Session // encrypted cookie' },
	{ icon: LockKeyIcon, text: 'Checkout // Stripe secured' },
	{ icon: ShoppingCartSimpleIcon, text: 'Cart // saved on this device' },
];

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<signInSchema>({ resolver });

	async function onSubmit(data: signInSchema) {
		// On success the server action redirects to '/', so only errors come back
		const message = await signIn(data);
		if (message) {
			toast.error(message, {
				position: 'bottom-right',
				closeOnClick: true,
				pauseOnHover: false,
				theme: 'colored',
			});
		}
	}

	const onError: SubmitErrorHandler<signInSchema> = (errors) =>
		console.log(errors);

	return (
		<main className='relative isolate grid min-h-dvh overflow-hidden lg:grid-cols-[1.1fr_1fr]'>
			{/* Atmosphere shared by both halves */}
			<div aria-hidden className='absolute inset-0 -z-10 bg-blueprint' />
			<div
				aria-hidden
				className='absolute -bottom-64 -left-48 -z-10 size-[48rem] rounded-full bg-[radial-gradient(circle,var(--signal-bloom),transparent_65%)]'
			/>

			{/* LEFT: brand panel */}
			<motion.section
				initial='hidden'
				animate='show'
				variants={pageStagger}
				className='relative hidden flex-col justify-between border-r border-border/50 px-12 py-12 lg:flex xl:px-16'
			>
				<motion.div
					variants={rise}
					className='inline-flex w-fit items-center gap-2 rounded-full border bg-muted/50 px-3 py-1'
				>
					<span className='size-1.5 rounded-full bg-signal animate-signal-pulse' />
					<span className='font-mono text-xs tracking-widest text-muted-foreground uppercase'>
						Auth.sys {'//'} Ready
					</span>
				</motion.div>

				{/* Orbital emblem: the logo diamond with rotating rings and a scan line */}
				<motion.div
					variants={{
						hidden: { opacity: 0, scale: 0.85, rotate: -20 },
						show: {
							opacity: 1,
							scale: 1,
							rotate: 0,
							transition: { duration: 1.4, ease: EASE_OUT_EXPO },
						},
					}}
					aria-hidden
					className='relative mx-auto my-8 grid size-64 place-items-center xl:size-72'
				>
					<div className='absolute inset-0 animate-orbit rounded-full border border-dashed border-border motion-reduce:animate-none'>
						<span className='absolute top-1/2 -left-1 size-2 rounded-full bg-signal shadow-[0_0_12px_var(--signal-glow)]' />
					</div>
					<div className='absolute inset-8 animate-orbit-reverse rounded-full border border-border/70 motion-reduce:animate-none'>
						<span className='absolute -top-1 left-1/2 size-2 rounded-full bg-foreground' />
						<span className='absolute -bottom-1 left-1/2 size-1.5 rounded-full bg-muted-foreground' />
					</div>
					<div className='absolute inset-16 overflow-hidden rounded-full border border-border/40 bg-[radial-gradient(circle,var(--signal-bloom),transparent_70%)]'>
						<div className='absolute inset-x-0 top-0 h-1/2 animate-scan bg-linear-to-b from-transparent via-signal/15 to-transparent motion-reduce:animate-none' />
					</div>
					<span className='grid size-16 rotate-45 place-items-center rounded-md bg-foreground shadow-[0_0_60px_-10px_var(--signal-glow)]'>
						<span className='size-6 bg-signal' />
					</span>
				</motion.div>

				<div>
					<motion.h2
						variants={rise}
						className='mb-6 font-display text-7xl leading-[0.85] font-black tracking-tighter xl:text-8xl'
					>
						WELCOME
						<br />
						<span className='text-muted-foreground'>BACK.</span>
					</motion.h2>
					<motion.p
						variants={rise}
						className='mb-8 max-w-md text-xl leading-relaxed font-extralight text-muted-foreground'
					>
						Sign in to track your orders, check out in one click and pick up
						right where you left off.
					</motion.p>
					<motion.ul
						variants={rise}
						className='flex flex-col gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase'
					>
						{STATUS_LINES.map(({ icon: Icon, text }) => (
							<li key={text} className='flex items-center gap-3'>
								<Icon className='text-signal' />
								{text}
							</li>
						))}
					</motion.ul>
				</div>
			</motion.section>

			{/* RIGHT: form */}
			<section className='flex items-center justify-center px-6 py-16 md:px-12'>
				<motion.div
					initial='hidden'
					animate='show'
					variants={pageStagger}
					className='w-full max-w-md'
				>
					<motion.p
						variants={rise}
						className='mb-4 font-mono text-xs tracking-widest text-signal uppercase'
					>
						01 {'//'} Sign in
					</motion.p>
					<motion.h1
						variants={rise}
						className='mb-3 font-display text-5xl leading-[0.9] font-black tracking-tighter md:text-6xl'
					>
						Access your account.
					</motion.h1>
					<motion.p
						variants={rise}
						className='mb-10 text-lg font-extralight text-muted-foreground'
					>
						Use the email and password you registered with.
					</motion.p>

					<form onSubmit={handleSubmit(onSubmit, onError)}>
						<FieldGroup className='gap-6'>
							<motion.div variants={rise}>
								<Field data-invalid={Boolean(errors.email) || undefined}>
									<FieldLabel
										htmlFor='email'
										className='font-mono text-xs tracking-widest text-muted-foreground uppercase'
									>
										Email
									</FieldLabel>
									<InputGroup className='h-12 rounded-lg bg-muted/40'>
										<InputGroupAddon>
											<EnvelopeSimpleIcon className='size-5' />
										</InputGroupAddon>
										<InputGroupInput
											id='email'
											placeholder='you@example.com'
											autoComplete='email'
											inputMode='email'
											aria-invalid={Boolean(errors.email) || undefined}
											className='text-base'
											{...register('email')}
										/>
									</InputGroup>
									<FieldError>{errors.email?.message}</FieldError>
								</Field>
							</motion.div>

							<motion.div variants={rise}>
								<Field>
									<FieldLabel
										htmlFor='password'
										className='font-mono text-xs tracking-widest text-muted-foreground uppercase'
									>
										Password
									</FieldLabel>
									<PasswordInput
										id='password'
										placeholder='••••••••'
										autoComplete='current-password'
										{...register('password')}
									/>
								</Field>
							</motion.div>

							<motion.div variants={rise}>
								<Button
									type='submit'
									disabled={isSubmitting}
									className='group/submit h-12 w-full gap-2 text-sm font-extrabold tracking-wide uppercase transition-colors hover:bg-signal hover:text-signal-foreground'
								>
									{isSubmitting ? (
										<>
											<Spinner /> Verifying
										</>
									) : (
										<>
											Sign in
											<ArrowRightIcon
												weight='bold'
												className='transition-transform duration-300 ease-out-expo group-hover/submit:translate-x-1'
											/>
										</>
									)}
								</Button>
							</motion.div>

							<motion.div variants={rise}>
								<div className='flex items-center gap-4 font-mono text-xs tracking-widest text-muted-foreground uppercase'>
									<Separator className='flex-1' />
									New here?
									<Separator className='flex-1' />
								</div>
							</motion.div>

							<motion.div variants={rise}>
								<Button
									variant='outline'
									nativeButton={false}
									render={<Link href='/register' />}
									className='h-12 w-full gap-2 text-sm font-extrabold tracking-wide uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent'
								>
									<UserPlusIcon weight='bold' /> Create an account
								</Button>
							</motion.div>
						</FieldGroup>
					</form>
				</motion.div>
			</section>
		</main>
	);
};

export default LoginPage;
