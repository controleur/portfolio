import { writable, derived } from 'svelte/store';
import type { App } from '$lib';
import { ICONS } from '$lib';
import { _ } from 'svelte-i18n';

type BaseApp = {
	id: number;
	internalName: string;
	nameKey: string;
	icon: keyof typeof ICONS;
	descriptionKey: string;
};

const baseApps: BaseApp[] = [
	{
		id: 1,
		internalName: 'Explorer',
		nameKey: 'apps.explorer.name',
		icon: 'fileManager',
		descriptionKey: 'apps.explorer.description'
	},
	{
		id: 2,
		internalName: 'Browser',
		nameKey: 'apps.browser.name',
		icon: 'browser',
		descriptionKey: 'apps.browser.description'
	},
	{
		id: 3,
		internalName: 'Terminal',
		nameKey: 'apps.terminal.name',
		icon: 'terminal',
		descriptionKey: 'apps.terminal.description'
	},
	{
		id: 4,
		internalName: 'Editor',
		nameKey: 'apps.editor.name',
		icon: 'editor',
		descriptionKey: 'apps.editor.description'
	},
	{
		id: 5,
		internalName: 'Settings',
		nameKey: 'apps.settings.name',
		icon: 'settings',
		descriptionKey: 'apps.settings.description'
	},
	{
		id: 6,
		internalName: 'About',
		nameKey: 'apps.about.name',
		icon: 'about',
		descriptionKey: 'apps.about.description'
	}
];

// Fallback apps when locale is not ready
const fallbackApps: App[] = [
	{
		id: 1,
		name: 'Explorer',
		icon: 'fileManager',
		description: 'Browse your files',
		internalName: 'Explorer'
	},
	{ id: 2, name: 'Browser', icon: 'browser', description: 'Surf the web', internalName: 'Browser' },
	{
		id: 3,
		name: 'Terminal',
		icon: 'terminal',
		description: 'Command line access',
		internalName: 'Terminal'
	},
	{ id: 4, name: 'Editor', icon: 'editor', description: 'Edit your code', internalName: 'Editor' },
	{
		id: 5,
		name: 'Settings',
		icon: 'settings',
		description: 'Configure your system',
		internalName: 'Settings'
	},
	{
		id: 6,
		name: 'About',
		icon: 'about',
		description: 'Learn more about this project',
		internalName: 'About'
	}
];

export const apps = derived(_, ($_) => {
	if ($_ && typeof $_ === 'function') {
		try {
			const localizedApps: App[] = baseApps.map((app) => ({
				id: app.id,
				name: $_(app.nameKey),
				icon: app.icon,
				description: $_(app.descriptionKey),
				internalName: app.internalName
			}));
			return localizedApps;
		} catch (error) {
			console.warn('Error localizing apps:', error);
			return fallbackApps;
		}
	}
	// Return fallback when locale is not ready
	return fallbackApps;
});
