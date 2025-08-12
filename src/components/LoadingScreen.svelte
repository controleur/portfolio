<script lang="ts">
	import { ICONS, getIcon } from '$lib/icons';
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
		class="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50 overflow-hidden"
		transition:fade={{ duration: 500 }}
	>

		
		<div 
			class="text-center text-white max-w-md relative z-10"
			transition:scale={{ duration: 600, start: 0.8 }}
		>

			<div class="relative mb-8">
                <div class="relative mx-auto animate-pulse">
					<div class="flex justify-center items-center transition-transform duration-300">
						{@html getIcon('plasmaColor')}
					</div>
				</div>
				

				<div class="absolute inset-0 flex items-center justify-center">
					<div class="w-24 h-24 bg-white/10 rounded-full animate-ping"></div>
				</div>
			</div>
			

			<h2 class="text-3xl font-light mb-2 tracking-wider bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
				Portfoli.OS
			</h2>
			<p class="text-lg text-white/80 mb-8 animate-pulse">
				{loadingText}
			</p>
			

			<div class="w-full bg-white/10 rounded-full h-2 mb-6 overflow-hidden backdrop-blur-sm">
				<div 
					class="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-300 ease-out shadow-lg shadow-blue-500/30"
					style="width: {displayProgress}%"
				></div>
			</div>
			
			<div class="text-sm text-white/60 mb-6 font-mono">
				{Math.round(displayProgress)}%
			</div>
			

		</div>
	</div>
{/if}
