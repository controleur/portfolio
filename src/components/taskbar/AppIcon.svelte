<script lang="ts">
	import { getIcon } from '$lib';
	export let isActive: boolean = false;
	export let appName: string = 'Application';
	export let iconName: keyof typeof ICONS = 'fileManager';
	export let onClick: () => void = () => {};
</script>

<button
	class="flex size-10 rounded p-1 transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 {isActive
		? 'bg-blue-500/20'
		: ''}"
	title={appName}
	aria-label={appName}
	on:click={onClick}
>
	<div
		class="flex h-full w-full items-center justify-center p-0.5 text-gray-700 dark:text-gray-300"
	>
		{@html getIcon(iconName)}
	</div>
</button>
