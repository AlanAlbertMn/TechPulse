// Helpers that turn long marketplace copy into display-friendly pieces.

/** "Apple AirPods Pro 3, Active Noise…" → { name: "Apple AirPods Pro 3", subtitle: "Active Noise…" } */
export function splitTitle(title: string, maxName = 60) {
	const match = title.match(/^(.{8,80}?)(?:,| - | – | \| )\s*(.+)$/);
	if (match) return { name: match[1].trim(), subtitle: match[2].trim() };
	if (title.length <= maxName) return { name: title, subtitle: null };

	// No separator: break at the last word boundary before maxName
	const cut = title.lastIndexOf(' ', maxName);
	const at = cut > 0 ? cut : maxName;
	return { name: title.slice(0, at).trim(), subtitle: title.slice(at).trim() };
}

/** Three steps of display size, picked by how long the headline is */
export function titleSizeClass(name: string) {
	if (name.length <= 32) return 'text-5xl lg:text-7xl';
	if (name.length <= 50) return 'text-4xl lg:text-6xl';
	return 'text-3xl lg:text-5xl';
}

/** "HEART RATE SENSING — Built-in heart rate…" → { heading, body } */
export function parseFeature(text: string) {
	const match = text.match(/^(.{3,60}?)\s*(?:—|–|:| - )\s*([\s\S]+)$/);
	if (!match) return { heading: null, body: text.trim() };
	const heading = match[1].trim();
	return {
		// Marketplace bullets SHOUT their headings; tame them to sentence case
		heading:
			heading === heading.toUpperCase()
				? heading.charAt(0) + heading.slice(1).toLowerCase()
				: heading,
		body: match[2].trim(),
	};
}

export function discountPercent(price: number, original?: number | null) {
	if (!original || original <= price) return null;
	return Math.round((1 - price / original) * 100);
}
