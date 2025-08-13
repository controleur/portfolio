<script lang="ts">
	import SysIcon from './SysIcon.svelte';
	import AppIcon from './AppIcon.svelte';
	import QuickActions from './QuickActions.svelte';
	import StartMenu from './StartMenu.svelte';
	import { onMount } from 'svelte';
	import { getCurrentTime, getIcon } from '$lib';
	import {
		windows,
		openWindow,
		focusWindow,
		minimizeWindow,
		apps,
		isDarkMode,
		isSoundMuted,
		currentLanguage,
		toggleTheme,
		toggleSound,
		toggleLanguage
	} from '$lib/stores';
	import type { App } from '$lib';
	import { _ } from 'svelte-i18n';

	let currentTime: string = getCurrentTime();
	let showQuickActions = false;
	let showStartMenu = false;

	// Use the shared apps store
	let availableApps: App[] = [];
	$: availableApps = $apps;

	// List apps with at least one open window, mark active if focused
	$: appsWithWindows = availableApps
		.filter((app) => $windows.some((window) => window.appName === app.internalName))
		.map((app) => ({
			...app,
			isActive: $windows.some((window) => window.appName === app.internalName && window.isActive)
		}));
	onMount(() => {
		const interval = setInterval(() => {
			currentTime = getCurrentTime();
		}, 1000);
		return () => clearInterval(interval);
	});

	function toggleQuickActions() {
		showQuickActions = !showQuickActions;
	}
	function toggleStartMenu() {
		showStartMenu = !showStartMenu;
	}
	function closeStartMenu() {
		showStartMenu = false;
	}
	function closeQuickActions() {
		showQuickActions = false;
	}

	/**
	 * Handle app icon click: restore minimized, focus opened, or open new window
	 */
	function handleAppClick(appId: number): void {
		const app = availableApps.find((a) => a.id === appId);
		if (!app) return;
		const appWindows = $windows.filter((w) => w.appName === app.internalName);
		const minimized = appWindows.filter((w) => w.isMinimized);
		const opened = appWindows.filter((w) => !w.isMinimized);

		if (minimized.length > 0) {
			const lastMinimized = minimized[minimized.length - 1];
			minimizeWindow(lastMinimized.id); // Restore
			focusWindow(lastMinimized.id);
			return;
		}

		if (opened.length > 0) {
			const lastOpen = opened[opened.length - 1];
			focusWindow(lastOpen.id);
			return;
		}

		openWindow(app.internalName, app.name, app.icon, '');
	}
</script>

<div
	id="taskbar"
	class="absolute right-2 bottom-2 left-2 z-[9999] box-content flex h-10 justify-between rounded-lg bg-white/75 backdrop-blur-lg dark:border-gray-600/50 dark:bg-gray-800/75"
>
	<div id="taskbarLeft" class="flex">
		<button
			id="startBtn"
			class="flex size-10 rounded p-1 text-gray-900 transition-colors hover:bg-black/10 dark:text-gray-100 dark:hover:bg-white/10"
			on:click={toggleStartMenu}
			aria-label="Open Start Menu"
		>
			{@html getIcon('startMenu')}
		</button>
		<div id="openedApps" class="flex gap-0.5">
			{#each appsWithWindows as app (app.id)}
				<AppIcon
					isActive={app.isActive}
					appName={app.name}
					iconName={app.icon}
					onClick={() => handleAppClick(app.id)}
				/>
			{/each}
		</div>
	</div>
	<div id="tray" class="flex gap-2 p-2 pr-3">
		<SysIcon
			icon={$isDarkMode ? getIcon('darkMode') : getIcon('lightMode')}
			tooltip={$_('taskbar.toggleTheme')}
			clickable={true}
			onclick={toggleTheme}
		/>
		<SysIcon
			icon={$isSoundMuted ? getIcon('soundMuted') : getIcon('sound')}
			tooltip={$_('taskbar.volume')}
			clickable={true}
			onclick={toggleSound}
		/>
		<SysIcon
			value={$currentLanguage}
			tooltip={$_('taskbar.language')}
			clickable={true}
			onclick={toggleLanguage}
		/>
		<SysIcon
			icon={getIcon('more')}
			tooltip={$_('taskbar.quickActions')}
			clickable={true}
			onclick={toggleQuickActions}
		/>
		<SysIcon
			tooltip={$_('taskbar.time')}
			value={currentTime}
			clickable={false}
		/>
	</div>

	{#if showStartMenu}
		<StartMenu onLaunch={handleAppClick} onClose={closeStartMenu} />
	{/if}
	{#if showQuickActions}
		<QuickActions onClose={closeQuickActions} />
	{/if}
</div>
