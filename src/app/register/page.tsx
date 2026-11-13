'use client';
import { EXISTING_ACCOUNT, signUpSchema } from '@/types/User';
import Link from 'next/link';
import {
	Resolver,
	SubmitErrorHandler,
	useForm,
	useWatch,
} from 'react-hook-form';
import { signUp } from '../api/auth/nextjs/actions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
	ArrowRightIcon,
	CheckCircleIcon,
	EnvelopeSimpleIcon,
	LightningIcon,
	LockKeyIcon,
	PackageIcon,
	ShieldCheckIcon,
	SignInIcon,
	UserIcon,
} from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import {
	Field,
	FieldDescription,
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
import { Spinner } from '@/components/ui/spinner';
import PasswordInput from '@/components/auth/PasswordInput';
import { cn } from '@/lib/utils';
import { EASE_OUT_EXPO, rise, stagger } from '@/lib/motion';

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

const pageStagger = stagger(0.1, 0.07);

const PERKS = [
	{ icon: PackageIcon, text: 'Orders // every purchase tracked' },
	{ icon: LightningIcon, text: 'Buy now // one-click checkout' },
	{ icon: ShieldCheckIcon, text: 'Password // salted + hashed' },
];

// 3×3 emblem: outer tiles light up clockwise around the logo in the centre.
// Literal class strings so Tailwind can see them.
const TILE_DELAYS = [
	'[animation-delay:0ms]',
	'[animation-delay:400ms]',
	'[animation-delay:800ms]',
	'[animation-delay:2800ms]',
	null, // centre: logo
	'[animation-delay:1200ms]',
	'[animation-delay:2400ms]',
	'[animation-delay:2000ms]',
	'[animation-delay:1600ms]',
];

// Visual hint only: does not block submission
function passwordStrength(password: string) {
	const checks = [
		password.length >= 8,
		/[a-z]/.test(password) && /[A-Z]/.test(password),
		/\d/.test(password),
		/[^A-Za-z0-9]/.test(password),
	];
	const score = checks.filter(Boolean).length;
	const label = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][score];
	return { score, label };
}

const labelClass = 'font-mono text-xs tracking-widest text-muted-foreground uppercase';

const RegisterPage = () => {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<signUpSchema>({ resolver });
	const router = useRouter();

	async function onSubmit(data: signUpSchema) {
		// On success the server action redirects to '/', so only errors come back
		const message = await signUp(data);
		if (!message) return;
		if (message === EXISTING_ACCOUNT) {
			toast.info(message, {
				position: 'bottom-right',
				closeOnClick: true,
				pauseOnHover: false,
				theme: 'colored',
			});
			router.push('/login');
		} else {
			toast.error(message, {
				position: 'bottom-right',
				closeOnClick: true,
				pauseOnHover: false,
				theme: 'colored',
			});
		}
	}

	const onError: SubmitErrorHandler<signUpSchema> = (errors) =>
		console.log(errors);

	const [password = '', confirmPassword = ''] = useWatch({
		control,
		name: ['password', 'confirmPassword'],
	});
	const strength = passwordStrength(password);
	const passwordsMatch = confirmPassword.length > 0 && confirmPassword === password;

	return (
		<main className='relative isolate grid min-h-dvh overflow-hidden lg:grid-cols-[1fr_1.1fr]'>
			{/* Atmosphere shared by both halves */}
			<div aria-hidden className='absolute inset-0 -z-10 bg-blueprint' />
			<div
				aria-hidden
				className='absolute -top-64 -right-48 -z-10 size-[48rem] rounded-full bg-[radial-gradient(circle,var(--signal-bloom),transparent_65%)]'
			/>

			{/* LEFT: form */}
			<section className='order-2 flex items-center justify-center px-6 py-16 md:px-12 lg:order-1'>
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
						02 {'//'} Create account
					</motion.p>
					<motion.h1
						variants={rise}
						className='mb-3 font-display text-5xl leading-[0.9] font-black tracking-tighter md:text-6xl'
					>
						Build your profile.
					</motion.h1>
					<motion.p
						variants={rise}
						className='mb-10 text-lg font-extralight text-muted-foreground'
					>
						Takes thirty seconds. Your cart comes with you.
					</motion.p>

					<form onSubmit={handleSubmit(onSubmit, onError)}>
						<FieldGroup className='gap-6'>
							<motion.div variants={rise}>
								<Field>
									<FieldLabel htmlFor='name' className={labelClass}>
										Name
									</FieldLabel>
									<InputGroup className='h-12 rounded-lg bg-muted/40'>
										<InputGroupAddon>
											<UserIcon className='size-5' />
										</InputGroupAddon>
										<InputGroupInput
											id='name'
											className='text-base'
											placeholder='Ada Lovelace'
											{...register('name')}
											required
											minLength={2}
											autoComplete={'name'}
										/>
									</InputGroup>
								</Field>
							</motion.div>

							<motion.div variants={rise}>
								<Field data-invalid={Boolean(errors.email) || undefined}>
									<FieldLabel htmlFor='email' className={labelClass}>
										Email
									</FieldLabel>
									<InputGroup className='h-12 rounded-lg bg-muted/40'>
										<InputGroupAddon>
											<EnvelopeSimpleIcon className='size-5' />
										</InputGroupAddon>
										<InputGroupInput
											id='email'
											className='text-base'
											type='email'
											placeholder='you@example.com'
											aria-invalid={Boolean(errors.email) || undefined}
											required
											{...register('email')}
											autoComplete={'email'}
										/>
									</InputGroup>
									<FieldError>{errors.email?.message}</FieldError>
								</Field>
							</motion.div>

							<motion.div variants={rise} className='grid gap-6 sm:grid-cols-2'>
								<Field>
									<FieldLabel htmlFor='password' className={labelClass}>
										Password
									</FieldLabel>
									<PasswordInput
										id='password'
										placeholder='8+ characters'
										autoComplete='new-password'
										{...register('password')}
										required
										minLength={8}
									/>
								</Field>
								<Field>
									<FieldLabel htmlFor='confirmPassword' className={labelClass}>
										Confirm
									</FieldLabel>
									<PasswordInput
										id='confirmPassword'
										placeholder='Repeat it'
										autoComplete='new-password'
										icon={
											passwordsMatch ? (
												<CheckCircleIcon weight='fill' className='size-5 text-signal' />
											) : (
												<LockKeyIcon className='size-5' />
											)
										}
										{...register('confirmPassword')}
										required
									/>
								</Field>
							</motion.div>

							{/* Strength meter */}
							<motion.div variants={rise} aria-live='polite'>
								<div className='mb-2 grid grid-cols-4 gap-1.5'>
									{[1, 2, 3, 4].map((step) => (
										<span
											key={step}
											className={cn(
												'h-1 rounded-full bg-border transition-colors duration-500',
												password && strength.score >= step && 'bg-signal',
											)}
										/>
									))}
								</div>
								<FieldDescription className='flex justify-between font-mono text-[11px] tracking-widest uppercase'>
									<span>Strength // {password ? strength.label : '—'}</span>
									{confirmPassword && (
										<span className={cn(passwordsMatch && 'text-signal')}>
											{passwordsMatch ? 'Match' : 'No match yet'}
										</span>
									)}
								</FieldDescription>
							</motion.div>

							<motion.div variants={rise}>
								<Button
									type='submit'
									disabled={isSubmitting}
									className='group/submit h-12 w-full gap-2 text-sm font-extrabold tracking-wide uppercase transition-colors hover:bg-signal hover:text-signal-foreground'
								>
									{isSubmitting ? (
										<>
											<Spinner /> Creating account
										</>
									) : (
										<>
											Create account
											<ArrowRightIcon
												weight='bold'
												className='transition-transform duration-300 ease-out-expo group-hover/submit:translate-x-1'
											/>
										</>
									)}
								</Button>
							</motion.div>

							<motion.div
								variants={rise}
								className='flex items-center gap-4 font-mono text-xs tracking-widest text-muted-foreground uppercase'
							>
								<Separator className='flex-1' />
								Have an account?
								<Separator className='flex-1' />
							</motion.div>

							<motion.div variants={rise}>
								<Button
									variant='outline'
									nativeButton={false}
									render={<Link href='/login' />}
									className='h-12 w-full gap-2 text-sm font-extrabold tracking-wide uppercase hover:border-signal hover:text-signal dark:hover:bg-transparent'
								>
									<SignInIcon weight='bold' /> Sign in instead
								</Button>
							</motion.div>
						</FieldGroup>
					</form>
				</motion.div>
			</section>

			{/* RIGHT: brand panel */}
			<motion.section
				initial='hidden'
				animate='show'
				variants={pageStagger}
				className='relative order-1 hidden flex-col justify-between border-l border-border/50 px-12 py-12 lg:order-2 lg:flex xl:px-16'
			>
				<motion.div
					variants={rise}
					className='inline-flex w-fit items-center gap-2 self-end rounded-full border bg-muted/50 px-3 py-1'
				>
					<span className='size-1.5 rounded-full bg-signal animate-signal-pulse' />
					<span className='font-mono text-xs tracking-widest text-muted-foreground uppercase'>
						New node {'//'} Provisioning
					</span>
				</motion.div>

				<motion.div
					variants={{
						hidden: { opacity: 0, scale: 0.85, rotate: 12 },
						show: {
							opacity: 1,
							scale: 1,
							rotate: 0,
							transition: { duration: 1.4, ease: EASE_OUT_EXPO },
						},
					}}
					aria-hidden
					className='mx-auto my-8 grid grid-cols-3 gap-3'
				>
					{TILE_DELAYS.map((delay, i) =>
						delay === null ? (
							<span
								key={i}
								className='grid size-20 place-items-center rounded-xl border border-border bg-muted/40 xl:size-24'
							>
								<span className='grid size-10 rotate-45 place-items-center rounded-sm bg-foreground shadow-[0_0_40px_-8px_var(--signal-glow)]'>
									<span className='size-3.5 bg-signal' />
								</span>
							</span>
						) : (
							<span
								key={i}
								className={cn(
									'size-20 rounded-xl border animate-tile motion-reduce:animate-none xl:size-24',
									delay,
								)}
							/>
						),
					)}
				</motion.div>

				<div className='text-right'>
					<motion.h2
						variants={rise}
						className='mb-6 font-display text-7xl leading-[0.85] font-black tracking-tighter xl:text-8xl'
					>
						JOIN
						<br />
						<span className='text-muted-foreground'>THE PULSE.</span>
					</motion.h2>
					<motion.p
						variants={rise}
						className='mb-8 ml-auto max-w-md text-xl leading-relaxed font-extralight text-muted-foreground'
					>
						One account for your orders, faster checkout and every deal we
						drop.
					</motion.p>
					<motion.ul
						variants={rise}
						className='flex flex-col items-end gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase'
					>
						{PERKS.map(({ icon: Icon, text }) => (
							<li key={text} className='flex items-center gap-3'>
								{text}
								<Icon className='text-signal' />
							</li>
						))}
					</motion.ul>
				</div>
			</motion.section>
		</main>
	);
};

export default RegisterPage;
