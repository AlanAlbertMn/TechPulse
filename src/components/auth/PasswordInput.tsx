'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, LockKeyIcon } from '@phosphor-icons/react';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<React.ComponentProps<'input'>, 'type'> & {
	icon?: React.ReactNode;
};

// Password field with a show/hide toggle. Accepts react-hook-form's register() spread.
export default function PasswordInput({
	icon,
	className,
	...props
}: PasswordInputProps) {
	const [visible, setVisible] = useState(false);

	return (
		<InputGroup className='h-12 rounded-lg bg-muted/40'>
			<InputGroupAddon>{icon ?? <LockKeyIcon className='size-5' />}</InputGroupAddon>
			<InputGroupInput
				{...props}
				type={visible ? 'text' : 'password'}
				className={cn('text-base', className)}
			/>
			<InputGroupAddon align='inline-end'>
				<InputGroupButton
					size='icon-sm'
					aria-label={visible ? 'Hide password' : 'Show password'}
					aria-pressed={visible}
					onClick={() => setVisible((v) => !v)}
				>
					{visible ? <EyeSlashIcon /> : <EyeIcon />}
				</InputGroupButton>
			</InputGroupAddon>
		</InputGroup>
	);
}
