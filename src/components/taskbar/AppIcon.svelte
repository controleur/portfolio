<script lang="ts">
	import { ICONS } from '../../lib/icons';
	
	export let isActive: boolean = false;
	export let appName: string = "Application";
	export let iconName: keyof typeof ICONS = "fileManager";
	export let onClick: () => void = () => {};
</script>

<button 
	class="flex size-10 p-1 rounded transition-all duration-200 hover:bg-black/10 dark:hover:bg-white/10 {isActive ? 'bg-blue-300 bg-opacity-10' : ''}"
	title={appName}
	aria-label={appName}
	on:click={onClick}
>
	<div class="w-full h-full flex items-center justify-center text-gray-700 p-0.5 dark:text-gray-300">
		{@html ICONS[iconName]}
	</div>
</button>
