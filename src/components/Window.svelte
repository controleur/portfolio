<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { ICONS, getIcon } from '$lib';
	import { browser } from '$app/environment';
	import { _ } from 'svelte-i18n';

	export let title: string = $_('window.untitled');
	type IconKey = keyof typeof ICONS;
	export let appIcon: IconKey = 'fileManager'; // Default to fileManager icon
	export let isActive: boolean = true;
	export let isMinimized: boolean = false;
	export let isMaximized: boolean = false;
	export let x: number = 100;
	export let y: number = 100;
	export let width: number = 640;
	export let height: number = 480;
	export let zIndex: number = 10;

	const dispatch = createEventDispatcher<{
		close: void;
		minimize: void;
		maximize: void;
		focus: void;
	}>();

	let isDragging: boolean = false;
	let isResizing: boolean = false;
	let dragStartX: number = 0;
	let dragStartY: number = 0;
	let windowRef: HTMLDivElement;

	// Internal variables for current position
	let currentX: number;
	let currentY: number;
	let currentWidth: number;
	let currentHeight: number;

	function isMobile() {
		if (!browser) return false;
		return (
			window.innerWidth <= 768 ||
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
		);
	}

	// Initialize ONLY on component mount
	onMount(() => {
		if (isMobile()) {
			currentX = 0;
			currentY = 0;
			currentWidth = window.innerWidth;
			currentHeight = window.innerHeight - 60;
		} else {
			currentX = x;
			currentY = y;
			currentWidth = width;
			currentHeight = height;
		}
	});

	function handleMouseDown(event: MouseEvent): void {
		if (isMobile()) return; // Disable dragging on mobile
		// Check if click is not on a button
		const target = event.target as HTMLElement;
		if (target.tagName === 'BUTTON' || target.closest('button')) {
			return; // Don't start drag if clicking on a button
		}

		// Check if clicking on title bar or its children
		if (target.classList.contains('window-titlebar') || target.closest('.window-titlebar')) {
			isDragging = true;
			dragStartX = event.clientX - currentX;
			dragStartY = event.clientY - currentY;
			dispatch('focus');
		}
	}

	function handleMouseMove(event: MouseEvent): void {
		if (isMobile()) return; // Disable dragging on mobile
		if (isDragging) {
			currentX = event.clientX - dragStartX;
			currentY = event.clientY - dragStartY;

			// Prevent dragging outside viewport
			currentX = Math.max(0, Math.min(currentX, window.innerWidth - 200));
			currentY = Math.max(0, Math.min(currentY, window.innerHeight - 100));
		}
	}

	function handleMouseUp(): void {
		isDragging = false;
		isResizing = false;
	}

	function minimize(): void {
		isMinimized = !isMinimized;
		dispatch('minimize');
	}

	function maximize(): void {
		if (isMobile()) {
			isMaximized = true;
			currentX = 0;
			currentY = 0;
			currentWidth = window.innerWidth;
			currentHeight = window.innerHeight - 60;
			dispatch('maximize');
			return;
		}
		isMaximized = !isMaximized;
		if (isMaximized) {
			currentX = 0;
			currentY = 0;
			currentWidth = window.innerWidth;
			currentHeight = window.innerHeight - 60; // Account for taskbar
		} else {
			currentX = 100;
			currentY = 100;
			currentWidth = 640;
			currentHeight = 480;
		}
		dispatch('maximize');
	}

	function close(): void {
		dispatch('close');
	}

	function focus(): void {
		dispatch('focus');
	}
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div
	bind:this={windowRef}
	class="absolute overflow-hidden rounded-lg border border-gray-200/50
        bg-white/95 shadow-2xl backdrop-blur-sm select-none dark:border-gray-700/50 dark:bg-gray-800/95
        {isActive ? 'ring-2 ring-blue-500/50' : ''} 
        {isMinimized ? 'hidden' : ''} flex h-full min-h-0 flex-col"
	style="left: {isMobile() ? 0 : currentX}px; top: {isMobile() ? 0 : currentY}px; width: {isMobile()
		? '100vw'
		: currentWidth + 'px'}; height: {isMobile()
		? 'calc(100vh - 60px)'
		: currentHeight + 'px'}; z-index: {zIndex};"
	on:mousedown={focus}
	role="dialog"
	tabindex="0"
	aria-label={title}
>
	<div
		class="window-titlebar grid h-10 cursor-move grid-cols-[auto_1fr_auto] items-center border-b
			   border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-3 dark:border-gray-600 dark:from-gray-800 dark:to-gray-700"
		on:mousedown={handleMouseDown}
		role="button"
		tabindex="0"
	>
		<div class="flex items-center gap-2">
			<div
				class="app-icon flex h-5 w-5 flex-shrink-0 items-center justify-center overflow-hidden text-gray-700 dark:text-gray-300"
			>
				{@html getIcon(appIcon)}
			</div>
		</div>

		<div class="flex justify-center">
			<h3
				class="truncate text-center text-sm font-medium text-gray-900 select-none dark:text-gray-100"
			>
				{title}
			</h3>
		</div>

		<!-- Window controls on the right -->
		<div class="flex items-center gap-0.5">
			<button
				class="group flex h-7 w-7 items-center justify-center rounded-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
				on:click={minimize}
				aria-label="Minimize"
			>
				<div
					class="h-4 w-4 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200"
				>
					{@html getIcon('min')}
				</div>
			</button>
			<button
				class="group flex h-7 w-7 items-center justify-center rounded-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
				on:click={maximize}
				aria-label={isMaximized ? 'Restore' : 'Maximize'}
			>
				<div
					class="h-4 w-4 text-gray-600 group-hover:text-gray-800 dark:text-gray-400 dark:group-hover:text-gray-200"
				>
					{@html getIcon('max')}
				</div>
			</button>
			<button
				class="group flex h-7 w-7 items-center justify-center rounded-sm transition-colors hover:bg-red-500"
				on:click={close}
				aria-label="Close"
			>
				<div class="h-4 w-4 text-gray-600 group-hover:text-white dark:text-gray-400">
					{@html getIcon('windowClose')}
				</div>
			</button>
		</div>
	</div>

	<!-- Window content -->
	<slot />
</div>

<style>
	.app-icon :global(svg) {
		width: 18px;
		height: 18px;
	}

	button :global(svg) {
		width: 16px;
		height: 16px;
	}
</style>
