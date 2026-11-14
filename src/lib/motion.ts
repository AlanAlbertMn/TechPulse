// Shared motion presets for the one orchestrated page-load reveal on each page.
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export const stagger = (delayChildren = 0.1, staggerChildren = 0.08) => ({
	hidden: {},
	show: { transition: { staggerChildren, delayChildren } },
});

export const rise = {
	hidden: { opacity: 0, y: 24 },
	show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_EXPO } },
};
