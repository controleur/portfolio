<script lang="ts">
	import { onMount } from 'svelte';

	export let onClose: () => void = () => {};
	let quickActionsRef: HTMLDivElement;

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				quickActionsRef &&
				event.target instanceof Node &&
				!quickActionsRef.contains(event.target)
			) {
				onClose();
			}
		};

		setTimeout(() => {
			document.addEventListener('click', handleClickOutside);
		}, 100);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div
	id="tray-opened"
	class="absolute right-1.5 bottom-10 z-[9998] max-w-[calc(100vw-2rem)] rounded-t bg-stone-50/75 shadow-2xl backdrop-blur-lg dark:bg-gray-800/75"
	bind:this={quickActionsRef}
>
	<div id="quick-actions-container" class="grid grid-cols-3 gap-2 p-3">
		<a href="https://github.com/controleur" target="_blank" rel="noopener" class="flex flex-col items-center gap-2 rounded border border-gray-300 bg-white p-3 hover:border-blue-400 hover:bg-blue-100 active:bg-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-400 dark:hover:bg-blue-600 dark:active:bg-blue-700 dark:text-white">
			<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
			<span>GitHub</span>
		</a>
		<a href="https://www.linkedin.com/in/mael-h/" target="_blank" rel="noopener" class="flex flex-col items-center gap-2 rounded border border-gray-300 bg-white p-3 hover:border-blue-400 hover:bg-blue-100 active:bg-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-400 dark:hover:bg-blue-600 dark:active:bg-blue-700 dark:text-white">
			<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
			<span>LinkedIn</span>
		</a>
		<a href="https://www.malt.fr/profile/maelheinrich" target="_blank" rel="noopener" class="flex flex-col items-center gap-2 rounded border border-gray-300 bg-white p-3 hover:border-blue-400 hover:bg-blue-100 active:bg-blue-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-400 dark:hover:bg-blue-600 dark:active:bg-blue-700 dark:text-white">
			<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#ff5c5c"/><text x="12" y="16" text-anchor="middle" font-size="10" fill="#fff" font-family="Arial, sans-serif">Malt</text></svg>
			<span>Malt</span>
		</a>
	</div>
</div>
