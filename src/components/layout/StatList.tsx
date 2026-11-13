type Stat = { label: string; value: string };

// Mono label/value row for page headers
export default function StatList({ stats }: { stats: Stat[] }) {
	return (
		<dl className='grid grid-cols-3 gap-6 sm:gap-12'>
			{stats.map((stat) => (
				<div key={stat.label}>
					<dt className='mb-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase'>
						{stat.label}
					</dt>
					<dd className='font-mono text-2xl font-extralight tracking-tight sm:text-4xl'>
						{stat.value}
					</dd>
				</div>
			))}
		</dl>
	);
}
