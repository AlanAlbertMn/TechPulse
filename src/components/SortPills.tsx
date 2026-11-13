'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type SortPillsProps<T extends string> = {
	options: { value: T; label: string }[];
	value: T;
	onValueChange: (value: T) => void;
	ariaLabel: string;
};

// Pill-shaped single-select used for sorting lists
export default function SortPills<T extends string>({
	options,
	value,
	onValueChange,
	ariaLabel,
}: SortPillsProps<T>) {
	return (
		<ToggleGroup
			aria-label={ariaLabel}
			value={[value]}
			onValueChange={(next) => {
				if (next[0]) onValueChange(next[0] as T);
			}}
			className='w-full overflow-x-auto pb-1 md:w-auto md:pb-0'
		>
			{options.map((option) => (
				<ToggleGroupItem
					key={option.value}
					value={option.value}
					className='h-8 rounded-full border px-4 whitespace-nowrap text-muted-foreground hover:border-muted-foreground hover:bg-transparent hover:text-foreground aria-pressed:border-foreground aria-pressed:bg-foreground aria-pressed:font-extrabold aria-pressed:text-background'
				>
					{option.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
