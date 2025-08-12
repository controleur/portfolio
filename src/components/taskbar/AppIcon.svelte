<script lang="ts">
	import { getIcon, ICONS } from '$lib';	
	export let isActive: boolean = false;
	export let appName: string = "Application";
	export let iconName: keyof typeof ICONS = "fileManager";
	export let onClick: () => void = () => {};
</script>

<button 
	class="flex size-10 p-1 rounded transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 {isActive ? 'bg-blue-500/20' : ''}"
	title={appName}
	aria-label={appName}
	on:click={onClick}
>
	<div class="w-full h-full flex items-center justify-center text-gray-700 dark:text-gray-300 p-0.5">
		{@html getIcon(iconName)}
	</div>
</button>
