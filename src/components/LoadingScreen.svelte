<script lang="ts">
	import { getIcon } from '$lib';
	import { fade, scale } from 'svelte/transition';
	import { _ } from 'svelte-i18n';
	export let isLoading: boolean = true;
	export let loadingProgress: number = 0;
	export let loadingText: string = $_('loading.default');

	let displayProgress: number = 0;

	$: {
		if (loadingProgress > 0) {
			displayProgress = loadingProgress;
		}
	}
</script>

{#if isLoading}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
		transition:fade={{ duration: 500 }}
	>
		<div
			class="relative z-10 max-w-md text-center text-white"
			transition:scale={{ duration: 600, start: 0.8 }}
		>
			<div class="relative mb-8">
				<div class="relative mx-auto animate-pulse">
					<div class="flex items-center justify-center transition-transform duration-300">
						{@html getIcon('plasmaColor')}
					</div>
				</div>

				<div class="absolute inset-0 flex items-center justify-center">
					<div class="h-24 w-24 animate-ping rounded-full bg-white/10"></div>
				</div>
			</div>

			<h2
				class="mb-2 animate-pulse bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-3xl font-light tracking-wider text-transparent"
			>
				Portfoli.OS
			</h2>
			<p class="mb-8 animate-pulse text-lg text-white/80">
				{loadingText}
			</p>

			<div class="mb-6 h-2 w-full overflow-hidden rounded-full bg-white/10 backdrop-blur-sm">
				<div
					class="h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 shadow-lg shadow-blue-500/30 transition-all duration-300 ease-out"
					style="width: {displayProgress}%"
				></div>
			</div>

			<div class="mb-6 font-mono text-sm text-white/60">
				{Math.round(displayProgress)}%
			</div>
		</div>
	</div>
{/if}
