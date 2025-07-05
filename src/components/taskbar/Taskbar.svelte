<script>
	import SysIcon from './SysIcon.svelte';
	import QuickActions from '../quickActions/QuickActions.svelte';
	import { ICONS } from '../../lib/icons.js';
	import { getCurrentTime, isDarkTheme } from '../../lib/misc.js';
	import { onMount } from 'svelte';

	let currentTime = getCurrentTime();
	let showQuickActions = false;
	let isWifiConnected = true;
	let isSoundMuted = false;
	let isDarkMode = false;
	
	onMount(() => {
		isDarkMode = isDarkTheme();
		const interval = setInterval(() => {
			currentTime = getCurrentTime();
		}, 1000);

		return () => clearInterval(interval);
	});

	function toggleQuickActions() {
		showQuickActions = !showQuickActions;
	}

	function closeQuickActions() {
		showQuickActions = false;
	}

	function toggleWifi() {
		isWifiConnected = !isWifiConnected;
	}
	function toggleSound() {
		isSoundMuted = !isSoundMuted;
	}
	function toggleTheme() {
		if (isDarkMode) {
			localStorage.theme = "light";
			document.documentElement.classList.remove("dark");
		} else {
			localStorage.theme = "dark";
			document.documentElement.classList.add("dark");
		}
		isDarkMode = !isDarkMode;
	}
</script>

<div
	id="taskbar"
	class="absolute bottom-2 left-2 right-2 rounded-lg z-40 box-content flex h-10 justify-between border-t border-gray-300/50 bg-white/75 backdrop-blur-lg dark:border-gray-600/50 dark:bg-gray-800/75"
>
	<div id="taskbarLeft" class="flex">
		<div id="startBtn" class="flex size-10 p-1 text-gray-900 dark:text-gray-100">
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
				<g transform="translate(-46,-1) translate(-22,0)" id="start-here-kde">
					<rect
						style="fill:none;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
						id="rect3343"
						width="32"
						height="32"
						x="68"
						y="1"
					/>
					<path
						id="path20"
						style="fill:currentColor"
						transform="translate(46,1)"
						d="M 32 4 A 1.5 1.5 0 0 0 30.5 5.5 A 1.5 1.5 0 0 0 32 7 A 1.5 1.5 0 0 0 33.5 5.5 A 1.5 1.5 0 0 0 32 4 z M 42.5 4 L 39.5 7 L 44 11.5 L 39.5 16 L 42.5 19 L 50 11.5 L 42.5 4 z M 28.5 13 A 2.5 2.5 0 0 0 26 15.5 A 2.5 2.5 0 0 0 28.5 18 A 2.5 2.5 0 0 0 31 15.5 A 2.5 2.5 0 0 0 28.5 13 z M 35 22 A 3 3 0 0 0 32 25 A 3 3 0 0 0 35 28 A 3 3 0 0 0 38 25 A 3 3 0 0 0 35 22 z "
						class="ColorScheme-Text"
					/>
				</g>
			</svg>
		</div>
		<div id="openedApps" class="flex gap-0.5">
			<div class="flex size-10 p-1">
				<svg
					width="30"
					height="26"
					viewBox="0 0 30 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M1 0V7H0V26H11H12H30V5H29V2H15L13 0H1Z" fill="#4183D7" />
				</svg>
			</div>
			<div class="flex size-10 p-1">
				<svg
					width="30"
					height="26"
					viewBox="0 0 30 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M1 0V7H0V26H11H12H30V5H29V2H15L13 0H1Z" fill="#4183D7" />
				</svg>
			</div>
			<div class="flex size-10 p-1">
				<svg
					width="30"
					height="26"
					viewBox="0 0 30 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M1 0V7H0V26H11H12H30V5H29V2H15L13 0H1Z" fill="#4183D7" />
				</svg>
			</div>
			<div class="flex size-10 p-1">
				<svg
					width="30"
					height="26"
					viewBox="0 0 30 26"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M1 0V7H0V26H11H12H30V5H29V2H15L13 0H1Z" fill="#4183D7" />
				</svg>
			</div>
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
