<script lang="ts">
	import '../app.css';
	import Taskbar from '../components/taskbar/Taskbar.svelte';
	import LoadingScreen from '../components/LoadingScreen.svelte';
	import { onMount } from 'svelte';
	
	let isLoading = true;
	let contentLoaded = false;
	let loadingProgress = 0;
	let loadingText = "Initializing...";
	
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
			}, 800); 
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
		<Taskbar />
		<!-- <slot />  -->
	</div>
{/if}

