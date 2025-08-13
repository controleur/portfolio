<script lang="ts">
	export let content = '';
	import { getIcon } from '$lib';
	import { bookmarks } from '$lib/stores';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';
	let currentUrl = '';
	let addressInput = '';
	let isLoading = false;
	$: currentBookmark = $bookmarks.find(b => b.url === currentUrl);

	onMount(() => {
		currentUrl = content || 'https://controleur.github.io/booki/';
		addressInput = currentUrl;
	});

	function navigateTo(url: string) {
		isLoading = true;
		currentUrl = addressInput = url;
		setTimeout(() => (isLoading = false), 800);
	}

	function handleAddressSubmit() {
		if (addressInput.trim()) navigateTo(addressInput.trim());
	}

	function goBack() {}
	function goForward() {}
	function refresh() {
		isLoading = true;
		setTimeout(() => (isLoading = false), 500);
	}
</script>

<div class="flex h-full flex-col bg-white dark:bg-gray-800">
	<!-- Navigation Bar -->
	<div
		class="flex items-center gap-2 border-b border-gray-200 bg-gray-50 p-3 dark:border-gray-600 dark:bg-gray-700"
	>
		<button
			on:click={goBack}
			class="rounded p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
		>
			←
		</button>
		<button
			on:click={goForward}
			class="rounded p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
		>
			→
		</button>
		<button
			on:click={refresh}
			class="flex h-9 w-9 items-center justify-center rounded p-2 text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
		>
			{@html getIcon('refresh')}
		</button>

		<!-- Address Bar -->
		<div class="mx-2 flex-1">
			<form on:submit|preventDefault={handleAddressSubmit} class="flex">
				<input
					bind:value={addressInput}
					class="flex-1 rounded-l border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100"
					placeholder={$_('browser.urlPlaceholder')}
				/>
				<button
					type="submit"
					class="rounded-r bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
				>
					{$_('browser.goButton')}
				</button>
			</form>
		</div>

		<!-- Loading indicator -->
		{#if isLoading}
			<div
				class="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"
			></div>
		{/if}
	</div>

	<!-- Bookmarks Bar -->
	<div
		class="flex gap-2 border-b border-gray-200 bg-gray-100 p-2 dark:border-gray-600 dark:bg-gray-700"
	>
		{#each $bookmarks as bookmark (bookmark.name)}
			<button
				on:click={() => navigateTo(bookmark.url)}
				class="rounded bg-white px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
			>
				{bookmark.name}
			</button>
		{/each}
	</div>

	{#if isLoading}
		<div class="flex h-full items-center justify-center">
			<div class="text-center">
				<div
					class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
				></div>
				<p class="text-gray-600 dark:text-gray-400">{$_('browser.loading')}</p>
			</div>
		</div>
	{:else}
		{#if currentBookmark}
			<iframe src={currentBookmark.url} title={currentBookmark.name} class="h-full w-full border-0"></iframe>
		{:else}
			<div class="flex h-full items-center justify-center">
				<div class="text-center">
					<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
						{$_('browser.pageNotFound')}
					</h2>
					<p class="mb-4 text-gray-600 dark:text-gray-400">
						{$_('browser.pageNotFoundDescription')}
					</p>
					<button
						on:click={() => navigateTo('https://controleur.github.io/booki/')}
						class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
					>
						{$_('browser.backToHome')}
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>