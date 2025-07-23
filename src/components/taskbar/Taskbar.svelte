<script lang="ts">
	import SysIcon from './SysIcon.svelte';
	import AppIcon from './AppIcon.svelte';
	import QuickActions from './QuickActions.svelte';
	import StartMenu from './StartMenu.svelte';
	import { ICONS } from '../../lib/icons';
	import { TASKBAR_ICONS } from '../../lib/taskbarIcons';
	import { getCurrentTime, isDarkTheme } from '../../lib/misc';
	import { windowManager } from '../../lib/windowManager';
	import { onMount } from 'svelte';

	interface App {
		id: number;
		name: string;
		isActive: boolean;
		icon: keyof typeof TASKBAR_ICONS;
	}

	let currentTime: string = getCurrentTime();
	let showQuickActions: boolean = false;
	let showStartMenu: boolean = false;
	let isWifiConnected: boolean = true;
	let isSoundMuted: boolean = false;
	let isDarkMode: boolean = false;
	
	// Available applications with their metadata
	const availableApps: Array<{ id: number; name: string; icon: keyof typeof TASKBAR_ICONS; description: string }> = [
		{ id: 1, name: "File Explorer", icon: "fileManager", description: "Browse your files" },
		{ id: 2, name: "Browser", icon: "browser", description: "Surf the web" },
		{ id: 3, name: "Terminal", icon: "terminal", description: "Command line access" },
		{ id: 4, name: "Editor", icon: "editor", description: "Edit your code" }
	];

	// Mapping taskbar icons to main icons
	const iconMapping: Record<keyof typeof TASKBAR_ICONS, keyof typeof ICONS> = {
		fileManager: "fileManager",
		browser: "browser", 
		terminal: "terminal",
		editor: "editor"
	};
	
	// Calculate apps that have open windows (minimized or not)
	$: appsWithWindows = availableApps.filter(app => {
		const hasWindows = $windowManager.some(window => window.appName === app.name);
		return hasWindows;
	}).map(app => {
		// An app is active if it has the currently focused window
		const hasFocusedWindow = $windowManager.some(window => 
			window.appName === app.name && window.isActive
		);
		return {
			...app,
			isActive: hasFocusedWindow
		};
	});
	
	onMount(() => {
		isDarkMode = isDarkTheme();
		
		const interval = setInterval(() => {
			currentTime = getCurrentTime();
		}, 1000);

		return () => clearInterval(interval);
	});

	function toggleQuickActions(): void {
		showQuickActions = !showQuickActions;
	}

	function toggleStartMenu(): void {
		showStartMenu = !showStartMenu;
	}

	function closeStartMenu(): void {
		showStartMenu = false;
		}

	function closeQuickActions(): void {
		showQuickActions = false;
	}

	function toggleWifi(): void {
		isWifiConnected = !isWifiConnected;
	}
	
	function toggleSound(): void {
		isSoundMuted = !isSoundMuted;
	}
	
	function toggleTheme(): void {
		const newTheme = isDarkMode ? "light" : "dark";
		
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', newTheme);
			
			if (newTheme === 'dark') {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
			
			isDarkMode = !isDarkMode;
		}
	}

	function handleAppClick(appId: number): void {
		const app = availableApps.find(a => a.id === appId);
		if (!app) return;
		
		// Check if there are minimized windows for this app
		const minimizedWindows = $windowManager.filter(window => 
			window.appName === app.name && window.isMinimized
		);
		
		if (minimizedWindows.length > 0) {
			// Restore the last minimized window
			const lastMinimized = minimizedWindows[minimizedWindows.length - 1];
			windowManager.minimizeWindow(lastMinimized.id); // Toggle minimize (will restore)
			windowManager.focusWindow(lastMinimized.id);
		} else {
			// Check if there are open windows for this app
			const openWindows = $windowManager.filter(window => 
				window.appName === app.name && !window.isMinimized
			);
			
			if (openWindows.length > 0) {
				// Focus the last opened window
				const lastOpen = openWindows[openWindows.length - 1];
				windowManager.focusWindow(lastOpen.id);
			} else {
				// Open a new window
				const mainIcon = iconMapping[app.icon];
				windowManager.openWindow(app.name, app.name, mainIcon, '');
			}
		}
	}
</script>

<div
	id="taskbar"
	class="absolute bottom-2 left-2 right-2 rounded-lg z-[9999] box-content flex h-10 justify-between bg-white/75 backdrop-blur-lg dark:border-gray-600/50 dark:bg-gray-800/75"
>
	<div id="taskbarLeft" class="flex">
		<button id="startBtn" class="flex size-10 p-1 text-gray-900 dark:text-gray-100 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors" on:click={toggleStartMenu} aria-label="Open Start Menu">
			{@html ICONS.startMenu}
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
			icon={isDarkMode ? ICONS.darkMode : ICONS.lightMode}
			tooltip="Toggle light/dark mode"
			clickable={true}
			onclick={toggleTheme}
		/>
		<SysIcon
			icon={isSoundMuted ? ICONS.soundMuted : ICONS.sound}
			tooltip="Volume"
			clickable={true}
			onclick={toggleSound}
		/>
		<SysIcon
			icon={isWifiConnected ? ICONS.wifi : ICONS.wifiDisconnected}
			tooltip="Network"
			clickable={true}
			onclick={toggleWifi}
		/>
		<SysIcon
			icon={ICONS.more}
			tooltip="Show quick Actions"
			clickable={true}
			onclick={toggleQuickActions}
		/>
		<SysIcon
			tooltip="Time and date"
			value={currentTime}
			clickable={true}
			onclick={() => console.log('Time clicked')}
		/>
	</div>
	
	{#if showStartMenu}
		<StartMenu
			apps={availableApps}
			onLaunch={handleAppClick}
			onClose={closeStartMenu}
		/>
	{/if}
	{#if showQuickActions}
		<QuickActions onClose={closeQuickActions} />
	{/if}
</div>
