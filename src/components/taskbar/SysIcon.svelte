<script>
	export let icon = '';
	export let value = '';
	export let tooltip = '';
	export let clickable = false;
	export let onclick = () => {};
	
	function handleClick() {
		if (clickable) {
			onclick();
		}
	}
</script>

{#if clickable}
	<button 
		class="flex items-center gap-1 px-1 py-0.5 rounded transition-colors border-none bg-transparent font-inherit hover:bg-black/10 dark:hover:bg-white/10 focus:outline-2 focus:outline-blue-500 focus:outline-offset-2 text-gray-900 dark:text-gray-100" 
		title={tooltip}
		on:click={handleClick}
	>
		{@html icon}
		{#if value}
			<span class="text-gray-900 dark:text-gray-100">{value}</span>
		{/if}
	</button>
{:else}
	<div 
		class="flex items-center gap-1 px-1 py-0.5 rounded transition-colors text-gray-900 dark:text-gray-100" 
		title={tooltip}
	>
		{@html icon}
		{#if value}
			<span class="text-gray-900 dark:text-gray-100">{value}</span>
		{/if}
	</div>
{/if}


