// Utility functions for portfolio OS
export function getCurrentTime() {
	const now = new Date();
	return now.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
}
