<script lang="ts">
	import '../i18n.js';
	import '../app.css';
	import Taskbar from '../components/taskbar/Taskbar.svelte';
	import LoadingScreen from '../components/LoadingScreen.svelte';
	import Window from '../components/Window.svelte';
	import ApplicationContainer from '../components/applications/ApplicationContainer.svelte';
	import {
		windows,
		openWindow,
		closeWindow,
		minimizeWindow,
		maximizeWindow,
		focusWindow
	} from '$lib/stores';
	import { onMount } from 'svelte';
	import { locale, _ } from 'svelte-i18n';

	let isLoading = true;
	let contentLoaded = false;
	let loadingProgress = 0;
	let loadingText = 'Initializing...';
	let resourcesLoaded = 0;
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
			openWindow('Terminal', 'Terminal', 'terminal', '');
		}, 1000);
	};

	// Preload images (optimized)
	const preloadImages = () => {
		loadingText = $_('loading.wallpaper');
		const imageUrls = ['/wallpapers/light.webp', '/wallpapers/dark.webp'];

		Promise.all(
			imageUrls.map((url) => {
				return new Promise<{ url: string; success: boolean }>((resolve) => {
					const img = new Image();
					img.onload = () => resolve({ url, success: true });
					img.onerror = () => resolve({ url, success: false });
					img.src = url;
				});
			})
		).then((results: { url: string; success: boolean }[]) => {
			resourcesLoaded += imageUrls.length;
			updateProgress();
			const failed = results.filter((r) => !r.success);
			if (failed.length > 0) {
				loadingText = $_('loading.error') + ' ' + failed.map((f) => f.url).join(', ');
			} else {
				loadingText = $_('loading.wallpaperloaded');
			}
			loadingText = $_('loading.finalizing');
			resourcesLoaded++; // DOM ready
			updateProgress();
			if (document.readyState === 'complete') {
				handleLoad();
			} else {
				window.addEventListener('load', handleLoad);
			}
		});
	};

	onMount(() => {
		// Set language from localStorage or default to 'en'
		const lang = typeof window !== 'undefined' ? localStorage.getItem('language') || 'en' : 'en';
		locale.set(lang);

		// Wait for locale to be ready, then start loading
		const startLoading = () => {
			loadingText = $_('loading.initializing');
			preloadImages();
		};

		if (
			typeof window !== 'undefined' &&
			'waitLocale' in window &&
			typeof (window as { waitLocale?: () => Promise<void> }).waitLocale === 'function'
		) {
			(window as { waitLocale: () => Promise<void> }).waitLocale().then(startLoading);
		} else {
			let unsubscribe: (() => void) | undefined;
			unsubscribe = locale.subscribe(function handler(loc) {
				if (loc) {
					startLoading();
					if (typeof unsubscribe === 'function') unsubscribe();
				}
			});
		}
		return () => {
			window.removeEventListener('load', handleLoad);
		};
	});
</script>

<LoadingScreen {isLoading} {loadingProgress} {loadingText} />

{#if contentLoaded}
	<div
		class="min-h-screen bg-[url(/wallpapers/light.webp)] bg-center transition-opacity duration-500 dark:bg-[url(/wallpapers/dark.webp)]"
		class:opacity-100={!isLoading}
		class:opacity-0={isLoading}
	>
		<!-- Windows -->
		{#each $windows as window (`${window.id}-${window.content}`)}
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
				on:close={() => closeWindow(window.id)}
				on:minimize={() => minimizeWindow(window.id)}
				on:maximize={() => maximizeWindow(window.id)}
				on:focus={() => focusWindow(window.id)}
			>
				<ApplicationContainer appName={window.appName} content={window.content} />
			</Window>
		{/each}

		<Taskbar />
		<slot />
	</div>
{/if}
