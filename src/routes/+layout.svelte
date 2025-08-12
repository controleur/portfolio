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
	let language = 'en';

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
		const imageUrls = ['/wallpapers/images/5120x2880.png', '/wallpapers/images_dark/5120x2880.png'];

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
		language = lang;
		locale.set(lang);

		// Wait for locale to be ready, then start loading
		const startLoading = () => {
			loadingText = $_('loading.initializing');
			preloadImages();
		};

		if (typeof window !== 'undefined' && typeof (window as any).waitLocale === 'function') {
			(window as any).waitLocale().then(startLoading);
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
		class="min-h-screen bg-[url(/wallpapers/images/5120x2880.png)] bg-center transition-opacity duration-500 dark:bg-[url(/wallpapers/images_dark/5120x2880.png)]"
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
