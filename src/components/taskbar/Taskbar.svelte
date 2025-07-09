<script lang="ts">
	import SysIcon from './SysIcon.svelte';
	import AppIcon from './AppIcon.svelte';
	import QuickActions from '../quickActions/QuickActions.svelte';
	import { ICONS } from '../../lib/icons';
	import { getCurrentTime, isDarkTheme } from '../../lib/misc';
	import { onMount } from 'svelte';

	interface App {
		id: number;
		name: string;
		isActive: boolean;
		icon: keyof typeof ICONS;
	}

	let currentTime: string = getCurrentTime();
	let showQuickActions: boolean = false;
	let isWifiConnected: boolean = true;
	let isSoundMuted: boolean = false;
	let isDarkMode: boolean = false;
	
	const apps: App[] = [
		{ id: 1, name: "File Explorer", isActive: true, icon: "fileManager" },
		{ id: 2, name: "Browser", isActive: false, icon: "browser" },
		{ id: 3, name: "Terminal", isActive: false, icon: "terminal" },
		{ id: 4, name: "Editor", isActive: false, icon: "editor" }
	];
	
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
		console.log(`App ${appId} clicked`);
	}
</script>

<div
	id="taskbar"
	class="absolute bottom-2 left-2 right-2 rounded-lg z-40 box-content flex h-10 justify-between border-t border-gray-300/50 bg-white/75 backdrop-blur-lg dark:border-gray-600/50 dark:bg-gray-800/75"
>
	<div id="taskbarLeft" class="flex">
		<button id="startBtn" class="flex size-10 p-1 text-gray-900 dark:text-gray-100 hover:bg-black/10 dark:hover:bg-white/10 rounded transition-colors">
			{@html ICONS.startMenu}
		</button>
		<div id="openedApps" class="flex gap-0.5">
			{#each apps as app (app.id)}
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
	
	{#if showQuickActions}
		<QuickActions onClose={closeQuickActions} />
	{/if}
</div>
