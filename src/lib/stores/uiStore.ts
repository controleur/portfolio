import { writable, type Writable } from 'svelte/store';
import { locale } from 'svelte-i18n';

function getInitialTheme(): boolean {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('theme');
		if (saved === 'dark') return true;
		if (saved === 'light') return false;
		return window.matchMedia('(prefers-color-scheme: dark)').matches;
	}
	return false;
}

function applyTheme(dark: boolean) {
	if (typeof window !== 'undefined') {
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('theme', dark ? 'dark' : 'light');
	}
}

export const isDarkMode: Writable<boolean> = writable(getInitialTheme());
isDarkMode.subscribe(applyTheme);

export function toggleTheme(): void {
	isDarkMode.update((v) => !v);
}

export const isSoundMuted: Writable<boolean> = writable(false);

function getInitialLanguage(): string {
	if (typeof window !== 'undefined') {
		const saved = localStorage.getItem('language');
		if (saved === 'fr' || saved === 'en') return saved;
	}
	return 'en';
}

export const currentLanguage: Writable<string> = writable(getInitialLanguage());
currentLanguage.subscribe((lang) => {
	locale.set(lang);
	if (typeof window !== 'undefined') {
		localStorage.setItem('language', lang);
	}
});

export function toggleLanguage(): void {
	currentLanguage.update((lang) => (lang === 'en' ? 'fr' : 'en'));
}
export function toggleSound(): void {
	isSoundMuted.update((v) => !v);
}
