<script lang="ts">
	import { onMount } from 'svelte';
	import { getIcon } from '$lib';
	import { apps, openWindow } from '$lib/stores';
	import type { App } from '$lib';
	import { _ } from 'svelte-i18n';
	export let onLaunch: (appId: number) => void;
	export let onClose: () => void;

	let search = '';
	let availableApps: App[] = [];
	$: availableApps = $apps;
	let filteredApps: App[] = availableApps;
	let searchInput: HTMLInputElement;
	let starMenuRef: HTMLDivElement;

	// Update filtered apps on search
	$: filteredApps = search
		? availableApps.filter((app) => app.name.toLowerCase().includes(search.toLowerCase()))
		: availableApps;

	function handleLaunch(appId: number) {
		const app = availableApps.find((a) => a.id === appId);
		if (app) {
			openWindow(app.internalName, app.name, app.icon, '');
			onLaunch?.(appId);
			onClose?.();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose();
	}

	// Focus input and handle outside click/escape
	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		searchInput?.focus();
		const handleClickOutside = (event: MouseEvent) => {
			if (starMenuRef && event.target instanceof Node && !starMenuRef.contains(event.target)) {
				onClose();
			}
		};
		setTimeout(() => {
			document.addEventListener('click', handleClickOutside);
		}, 100);
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div
	class="animate-fade-in fixed bottom-14 left-2 z-[10000] flex w-80 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white/90 shadow-2xl dark:border-gray-700 dark:bg-gray-800/95"
	bind:this={starMenuRef}
>
	<div
		class="flex flex-col gap-2 border-b border-gray-200 bg-gray-50 px-4 pt-4 pb-3 dark:border-gray-700 dark:bg-gray-900"
	>
		<h1
			class="mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-center text-3xl font-extrabold tracking-wide text-transparent select-none"
		>
			Portfoli.OS
		</h1>
	</div>
	<div class="flex-1 overflow-y-auto bg-white p-2 dark:bg-gray-800">
		{#if filteredApps.length === 0}
			<div class="py-8 text-center text-gray-400">{$_('startmenu.noResults')}</div>
		{:else}
			<ul class="space-y-1">
				{#each filteredApps as app}
					<li>
						<button
							class="group flex w-full items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-blue-100 dark:hover:bg-blue-900"
							on:click={() => handleLaunch(app.id)}
						>
							<span class="text-xl dark:text-gray-300">{@html getIcon(app.icon)}</span>
							<div class="flex flex-col items-start text-left">
								<span
									class="font-medium text-gray-900 group-hover:text-blue-700 dark:text-gray-300 dark:group-hover:text-blue-300"
									>{app.name}</span
								>
								<span class="text-xs text-gray-500 dark:text-gray-400">{app.description}</span>
							</div>
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
	<div
		class="flex gap-2 border-t border-gray-200 bg-gray-50 px-4 pt-4 pb-3 dark:border-gray-700 dark:bg-gray-900"
	>
		<span class="text-2xl dark:text-gray-300">{@html getIcon('startMenu')}</span>
		<input
			class="ml-2 flex-1 rounded bg-gray-100 px-2 py-1 text-gray-900 focus:outline-none dark:bg-gray-700 dark:text-gray-100"
			type="text"
			placeholder={$_('startmenu.search')}
			bind:value={search}
			bind:this={searchInput}
			aria-label="Search applications"
		/>
	</div>
</div>

<style>
	.animate-fade-in {
		animation: fadeIn 0.18s cubic-bezier(0.4, 0, 0.2, 1);
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
