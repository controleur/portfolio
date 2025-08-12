// Adapt imports to use the $lib alias if needed
export function getCurrentTime() {
	const now = new Date();
	return now.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
}

export function getCurrentDate() {
	const now = new Date();
	return now.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

export function getCurrentTheme() {
	if (typeof window !== 'undefined') {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			return storedTheme;
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
}

export function isDarkTheme() {
	return getCurrentTheme() === 'dark';
}