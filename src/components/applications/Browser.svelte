<script lang="ts">
	let currentUrl = 'https://controleur.github.io/booki/';
	let addressInput = currentUrl;
	let isLoading = false;
	import { getIcon } from '$lib/icons';

	const bookmarks = [
		{ name: 'Portfolio ⭐', url: 'https://portfolio.dev' },
		{ name: 'Ivory 🎹', url: 'https://studio.ivory-app.com' },
		{ name: 'Nina Carducci 📸', url: 'https://controleur.github.io/nina-carducci/' },
		{ name: 'Booki 🛏️', url: 'https://controleur.github.io/booki/' },
		{ name: 'Sophie Bluel 🎨', url: 'https://sophie-bluel-five.vercel.app/' },
		{ name: 'Kasa 🏠', url: 'https://kasa-five-ebon.vercel.app/' },
		{ name: 'Mon Vieux Grimoire API Docs 📚', url: 'https://mon-vieux-grimoire-backend-pi.vercel.app/api-docs' }
	];

	function navigateTo(url: string) {
		isLoading = true;
		currentUrl = url;
		addressInput = url;

		setTimeout(() => {
			isLoading = false;
		}, 800);
	}

	function handleAddressSubmit() {
		if (addressInput.trim()) {
			navigateTo(addressInput.trim());
		}
	}

	function goBack() {
		console.log('Navigate back');
	}

	function goForward() {
		console.log('Navigate forward');
	}

	function refresh() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
		}, 500);
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
			class="rounded p-2 w-9 h-9 flex items-center justify-center text-gray-600 transition-colors hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-600"
		>
			{@html getIcon('refresh')}
		</button>

		<!-- Address Bar -->
		<div class="mx-2 flex-1">
			<form on:submit|preventDefault={handleAddressSubmit} class="flex">
				<input
					bind:value={addressInput}
					class="flex-1 rounded-l border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-500 dark:bg-gray-800 dark:text-gray-100"
					placeholder="Enter a URL..."
				/>
				<button
					type="submit"
					class="rounded-r bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
				>
					Go
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
		{#each bookmarks as bookmark}
			<button
				on:click={() => navigateTo(bookmark.url)}
				class="rounded bg-white px-3 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-50 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
			>
				{bookmark.name}
			</button>
		{/each}
	</div>

	<!-- Content Area -->
	<div class="flex-1 overflow-auto">
		{#if isLoading}
			<div class="flex h-full items-center justify-center">
				<div class="text-center">
					<div
						class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
					></div>
					<p class="text-gray-600 dark:text-gray-400">Loading...</p>
				</div>
			</div>
		{:else if currentUrl === 'https://portfolio.dev'}
			<iframe
				src="http://localhost:5173/"
				title="This Portfolio"
				class="h-full w-full border-0"
			></iframe>
				{:else if currentUrl === 'https://studio.ivory-app.com'}
			<iframe
				src="https://studio.ivory-app.com"
				title="Ivory Landing Page"
				class="h-full w-full border-0"
			></iframe>
			{:else if currentUrl === 'https://controleur.github.io/nina-carducci/'}
			<iframe
				src="https://controleur.github.io/nina-carducci/"
				title="Nina Carducci"
				class="h-full w-full border-0"
			></iframe>
			{:else if currentUrl === 'https://controleur.github.io/booki/'}
			<iframe
				src="https://controleur.github.io/booki/"
				title="Booki"
				class="h-full w-full border-0"
			></iframe>
			{:else if currentUrl === 'https://sophie-bluel-five.vercel.app/'}
			<iframe
				src="https://sophie-bluel-five.vercel.app/"
				title="Sophie Bluel's Portfolio"
				class="h-full w-full border-0"
			></iframe>
			{:else if currentUrl === 'https://kasa-five-ebon.vercel.app/'}
			<iframe
				src="https://kasa-five-ebon.vercel.app/"
				title="Kasa"
				class="h-full w-full border-0"
			></iframe>
			{:else if currentUrl === 'https://mon-vieux-grimoire-backend-pi.vercel.app/api-docs'}
			<iframe
				src="https://mon-vieux-grimoire-backend-pi.vercel.app/api-docs"
				title="Mon Vieux Grimoire API Docs"
				class="h-full w-full border-0"
			></iframe>
		{:else}
			<div class="flex h-full items-center justify-center">
				<div class="text-center">
					<h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Page not found</h2>
					<p class="mb-4 text-gray-600 dark:text-gray-400">
						The requested URL does not exist in this simulation.
					</p>
					<button
						on:click={() => navigateTo('https://svelte.dev')}
						class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
					>
						Back to Home
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
