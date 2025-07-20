<script lang="ts">
	import '../app.css';
	import Taskbar from '../components/taskbar/Taskbar.svelte';
	import LoadingScreen from '../components/LoadingScreen.svelte';
	import Window from '../components/Window.svelte';
	import ApplicationContainer from '../components/applications/ApplicationContainer.svelte';
	import { windowManager, type WindowData } from '../lib/windowManager';
	import { onMount } from 'svelte';
	
	let isLoading = true;
	let contentLoaded = false;
	let loadingProgress = 0;
	let loadingText = "Initializing...";
	let windows: WindowData[] = [];
	
	// Subscribe to window manager
	windowManager.subscribe(value => {
		windows = value;
	});
	
	onMount(() => {
		let imagesLoaded = 0;
		let resourcesLoaded = 0;
		const totalImages = 2;
		const totalResources = 3; // Images + DOM
		
		const updateProgress = () => {
			const progress = (resourcesLoaded / totalResources) * 100;
			loadingProgress = Math.min(progress, 100);
		};
		
		const handleLoad = () => {
			setTimeout(() => {
				isLoading = false;
				contentLoaded = true;
				// Open terminal at startup
					windowManager.openWindow("Terminal", "Terminal", "terminal", "");
				}, 1000);
		};
		
		// Preload images
		const preloadImages = () => {
			loadingText = "Loading wallpapers...";
			const imageUrls = [
				'/wallpapers/images/5120x2880.png',
				'/wallpapers/images_dark/5120x2880.png'
			];
			
			imageUrls.forEach((url, index) => {
				const img = new Image();
				img.onload = () => {
					imagesLoaded++;
					resourcesLoaded++;
					updateProgress();
					
					if (index === 0) {
						loadingText = "Clear wallpaper loaded...";
					} else {
						loadingText = "Dark wallpaper loaded...";
					}
					
					if (imagesLoaded === totalImages) {
						loadingText = "Finalizing...";
						resourcesLoaded++; // DOM ready
						updateProgress();
						
						// All images loaded, check if DOM is ready
						if (document.readyState === 'complete') {
							handleLoad();
						} else {
							window.addEventListener('load', handleLoad);
						}
					}
				};
				img.onerror = () => {
					imagesLoaded++;
					resourcesLoaded++;
					updateProgress();
					loadingText = `Error loading ${url}`;
					
					if (imagesLoaded === totalImages) {
						resourcesLoaded++; // DOM ready
						updateProgress();
						if (document.readyState === 'complete') {
							handleLoad();
						} else {
							window.addEventListener('load', handleLoad);
						}
					}
				};
				img.src = url;
			});
		};
		
		preloadImages();
		
		return () => {
			window.removeEventListener('load', handleLoad);
		};
	});
</script>

<LoadingScreen {isLoading} {loadingProgress} {loadingText} />

{#if contentLoaded}
	<div class="bg-[url(/wallpapers/images/5120x2880.png)] min-h-screen bg-center dark:bg-[url(/wallpapers/images_dark/5120x2880.png)] transition-opacity duration-500"
		 class:opacity-100={!isLoading} 
		 class:opacity-0={isLoading}>
		
		<!-- Windows -->
		{#each windows as window (window.id)}
			<Window
				title={window.title}
				appIcon={window.appIcon}
				isActive={window.isActive}
				isMinimized={window.isMinimized}
				isMaximized={window.isMaximized}
				x={window.x}
				y={window.y}
				width={window.width}
				height={window.height}
				zIndex={window.zIndex}
				on:close={() => windowManager.closeWindow(window.id)}
				on:minimize={() => windowManager.minimizeWindow(window.id)}
				on:maximize={() => windowManager.maximizeWindow(window.id)}
				on:focus={() => windowManager.focusWindow(window.id)}
			>
				<ApplicationContainer appName={window.appName} />
			</Window>
		{/each}
		
		<Taskbar />
		<slot /> 
	</div>
{/if}

