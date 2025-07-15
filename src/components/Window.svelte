<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { ICONS } from '../lib/icons';
	
	export let title: string = "Untitled Window";
	type IconKey = keyof typeof ICONS;
	export let appIcon: IconKey = "fileManager"; // Default to fileManager icon
	export let isActive: boolean = true;
	export let isMinimized: boolean = false;
	export let isMaximized: boolean = false;
	export let x: number = 100;
	export let y: number = 100;
	export let width: number = 640;
	export let height: number = 480;
	export let zIndex: number = 10;
	
	const dispatch = createEventDispatcher();
	
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
	
	// Initialize ONLY on component mount
	onMount(() => {
		currentX = x;
		currentY = y;
		currentWidth = width;
		currentHeight = height;
	});
	
	function handleMouseDown(event: MouseEvent): void {
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

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div
	   bind:this={windowRef}
	   class="absolute select-none shadow-2xl rounded-lg overflow-hidden
			  bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50
			  {isActive ? 'ring-2 ring-blue-500/50' : ''} 
			  {isMinimized ? 'hidden' : ''} flex flex-col h-full min-h-0"
	   style="left: {currentX}px; top: {currentY}px; width: {currentWidth}px; height: {currentHeight}px; z-index: {zIndex};"
	   on:mousedown={focus}
	   role="dialog"
	   tabindex="0"
	   aria-label={title}
>
	<!-- Title bar -->
	<div 
		class="window-titlebar h-10 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 
			   grid grid-cols-[auto_1fr_auto] items-center px-3 cursor-move border-b border-gray-200 dark:border-gray-600"
		on:mousedown={handleMouseDown}
		role="button"
		tabindex="0"
	>
		<!-- App icon on the left -->
		<div class="flex items-center gap-2">
			<div class="w-5 h-5 flex-shrink-0 text-gray-700 dark:text-gray-300 flex items-center justify-center overflow-hidden app-icon">
				{@html ICONS[appIcon] || ICONS.fileManager}
			</div>
		</div>
		
		<!-- Window title centered -->
		<div class="flex justify-center">
			<h3 class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate select-none text-center">
				{title}
			</h3>
		</div>
		
		<!-- Window controls on the right -->
		<div class="flex items-center gap-0.5">
			<button 
				class="w-7 h-7 rounded-sm flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
				on:click={minimize}
				aria-label="Minimize"
			>
				<div class="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">
					{@html ICONS.min}
				</div>
			</button>
			<button 
				class="w-7 h-7 rounded-sm flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
				on:click={maximize}
				aria-label={isMaximized ? "Restore" : "Maximize"}
			>
				<div class="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">
					{@html ICONS.max}
				</div>
			</button>
			<button 
				class="w-7 h-7 rounded-sm flex items-center justify-center hover:bg-red-500 transition-colors group"
				on:click={close}
				aria-label="Close"
			>
				<div class="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white">
					{@html ICONS.windowClose}
				</div>
			</button>
		</div>
	</div>
	
	<!-- Window content -->
	<slot />
</div>
