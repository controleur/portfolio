// Get current time
export function getCurrentTime() {
	const now = new Date();
	return now.toLocaleTimeString('en-US', { 
		hour: '2-digit', 
		minute: '2-digit',
		hour12: false 
	});
}

// Get current date
export function getCurrentDate() {
	const now = new Date();
	return now.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}

// Get current theme from localStorage
export function getCurrentTheme() {
	if (typeof window !== 'undefined') {
		const storedTheme = localStorage.getItem('theme');
		if (storedTheme) {
			return storedTheme;
		}
		// Check system preference if no stored theme
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light'; // Default fallback
}

// Check if current theme is dark
export function isDarkTheme() {
	return getCurrentTheme() === 'dark';
}