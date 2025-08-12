import { writable } from 'svelte/store';
import type { App } from '$lib';

export const apps = writable<App[]>([
	{ id: 1, name: 'Explorer', icon: 'fileManager', description: 'Browse your files' },
	{ id: 2, name: 'Browser', icon: 'browser', description: 'Surf the web' },
	{ id: 3, name: 'Terminal', icon: 'terminal', description: 'Command line access' },
	{ id: 4, name: 'Editor', icon: 'editor', description: 'Edit your code' },
	{ id: 5, name: 'Settings', icon: 'settings', description: 'Configure your system' },
	{ id: 6, name: 'About', icon: 'about', description: 'Learn more about this project' }
]);
