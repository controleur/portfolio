<script lang="ts">
	import { onMount } from 'svelte';
	
	export let onClose: () => void = () => {};
	let quickActionsRef: HTMLDivElement;

	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (quickActionsRef && event.target instanceof Node && !quickActionsRef.contains(event.target)) {
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
	class="absolute right-1 bottom-10 shadow-2xl h-111 w-111 rounded-t bg-stone-50/75 dark:bg-gray-800/75 backdrop-blur-lg z-[9998]"
	bind:this={quickActionsRef}
>
	<div id="quick-actions-container" class="grid grid-cols-3 gap-2 p-3">
		<div
			class="flex flex-col gap-3 rounded border border-gray-300 bg-white p-2 hover:border-blue-400 hover:bg-blue-300 active:bg-blue-400 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-blue-400 dark:hover:bg-blue-600 dark:active:bg-blue-700"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8 2C5.12172 2 2.44716 2.81672 0.167969 4.21094L0.798828 4.99805C2.90225 3.73691 5.35909 3 8 3C10.6409 3 13.0978 3.7369 15.2012 4.99805L15.832 4.21094C13.5528 2.81672 10.8783 2 8 2ZM8 5C5.8436 5 3.84257 5.62358 2.14844 6.6875L2.7793 7.47266C4.29843 6.54375 6.08179 6 8 6C9.91821 6 11.7016 6.54375 13.2207 7.47266L13.8516 6.6875C12.1574 5.6236 10.1564 5 8 5ZM8 8C6.56618 8 5.23669 8.42837 4.12891 9.16211L4.75977 9.94922C5.69365 9.35022 6.80349 9 8 9C9.19651 9 10.3064 9.35022 11.2402 9.94922L11.8711 9.16211C10.7633 8.42838 9.43383 8 8 8ZM8 11C7.60218 11 7.22064 11.158 6.93934 11.4393C6.65804 11.7206 6.5 12.1022 6.5 12.5C6.5 12.8978 6.65804 13.2794 6.93934 13.5607C7.22064 13.842 7.60218 14 8 14C8.39782 14 8.77936 13.842 9.06066 13.5607C9.34196 13.2794 9.5 12.8978 9.5 12.5C9.5 12.1022 9.34196 11.7206 9.06066 11.4393C8.77936 11.158 8.39782 11 8 11Z"
					fill="#08293A"
				/>
			</svg>

			<div class="flex flex-col">
				<span>Wi-Fi</span>
				<span class="text-gray-600">SSID_TEST...</span>
			</div>
		</div>
		<div
			class="flex flex-col gap-3 rounded border border-gray-300 bg-white p-2 hover:border-blue-400 hover:bg-blue-300 active:bg-blue-400"
		>
			<svg
				width="17"
				height="16"
				viewBox="0 0 17 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8.75 8C8.19531 8 7.75 8.44531 7.75 9V14H9.75V9C9.75 8.44531 9.30469 8 8.75 8Z"
					fill="#14171A"
				/>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8.75 2C4.87109 2 1.75 5.12109 1.75 9C1.75 10.9375 2.53125 12.6914 3.79688 13.9531L4.50391 13.2461C3.41797 12.1602 2.75 10.6602 2.75 9C2.75 5.67578 5.42578 3 8.75 3C12.0742 3 14.75 5.67578 14.75 9C14.75 10.6602 14.082 12.1602 12.9961 13.2461L13.7031 13.9531C14.9688 12.6914 15.75 10.9375 15.75 9C15.75 5.12109 12.6289 2 8.75 2ZM8.75 5C6.53516 5 4.75 6.78516 4.75 9C4.75 10.1094 5.19531 11.1055 5.92188 11.8281L6.625 11.125C6.08594 10.582 5.75 9.83203 5.75 9C5.75 7.33984 7.08984 6 8.75 6C10.4102 6 11.75 7.33984 11.75 9C11.75 9.83203 11.4141 10.582 10.875 11.125L11.5781 11.8281C12.3047 11.1055 12.75 10.1094 12.75 9C12.75 6.78516 10.9648 5 8.75 5Z"
					fill="#14171A"
				/>
			</svg>

			<div class="flex flex-col">
				<span>Wi-Fi</span>
				<span class="text-gray-600">SSID_TEST...</span>
			</div>
		</div>
		<div
			class="flex flex-col gap-3 rounded border border-gray-300 bg-white p-2 hover:border-blue-400 hover:bg-blue-300 active:bg-blue-400"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M8 2C5.12172 2 2.44716 2.81672 0.167969 4.21094L0.798828 4.99805C2.90225 3.73691 5.35909 3 8 3C10.6409 3 13.0978 3.7369 15.2012 4.99805L15.832 4.21094C13.5528 2.81672 10.8783 2 8 2ZM8 5C5.8436 5 3.84257 5.62358 2.14844 6.6875L2.7793 7.47266C4.29843 6.54375 6.08179 6 8 6C9.91821 6 11.7016 6.54375 13.2207 7.47266L13.8516 6.6875C12.1574 5.6236 10.1564 5 8 5ZM8 8C6.56618 8 5.23669 8.42837 4.12891 9.16211L4.75977 9.94922C5.69365 9.35022 6.80349 9 8 9C9.19651 9 10.3064 9.35022 11.2402 9.94922L11.8711 9.16211C10.7633 8.42838 9.43383 8 8 8ZM8 11C7.60218 11 7.22064 11.158 6.93934 11.4393C6.65804 11.7206 6.5 12.1022 6.5 12.5C6.5 12.8978 6.65804 13.2794 6.93934 13.5607C7.22064 13.842 7.60218 14 8 14C8.39782 14 8.77936 13.842 9.06066 13.5607C9.34196 13.2794 9.5 12.8978 9.5 12.5C9.5 12.1022 9.34196 11.7206 9.06066 11.4393C8.77936 11.158 8.39782 11 8 11Z"
					fill="#08293A"
				/>
			</svg>

			<div class="flex flex-col">
				<span>Wi-Fi</span>
				<span class="text-gray-600">SSID_TEST...</span>
			</div>
		</div>
		<div
			id="quick-action-inactive"
			class="flex flex-col gap-3 rounded border border-gray-200 bg-gray-300 p-2"
		>
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
                    class="fill-gray-400"
					d="M8 2C5.12172 2 2.44716 2.81672 0.167969 4.21094L0.798828 4.99805C2.90225 3.73691 5.35909 3 8 3C10.6409 3 13.0978 3.7369 15.2012 4.99805L15.832 4.21094C13.5528 2.81672 10.8783 2 8 2ZM8 5C5.8436 5 3.84257 5.62358 2.14844 6.6875L2.7793 7.47266C4.29843 6.54375 6.08179 6 8 6C9.91821 6 11.7016 6.54375 13.2207 7.47266L13.8516 6.6875C12.1574 5.6236 10.1564 5 8 5ZM8 8C6.56618 8 5.23669 8.42837 4.12891 9.16211L4.75977 9.94922C5.69365 9.35022 6.80349 9 8 9C9.19651 9 10.3064 9.35022 11.2402 9.94922L11.8711 9.16211C10.7633 8.42838 9.43383 8 8 8ZM8 11C7.60218 11 7.22064 11.158 6.93934 11.4393C6.65804 11.7206 6.5 12.1022 6.5 12.5C6.5 12.8978 6.65804 13.2794 6.93934 13.5607C7.22064 13.842 7.60218 14 8 14C8.39782 14 8.77936 13.842 9.06066 13.5607C9.34196 13.2794 9.5 12.8978 9.5 12.5C9.5 12.1022 9.34196 11.7206 9.06066 11.4393C8.77936 11.158 8.39782 11 8 11Z"
					fill="#08293A"
				/>
			</svg>

			<div class="flex flex-col">
				<span class="text-gray-500">Wi-Fi</span>
				<span class="text-gray-400">SSID_TEST...</span>
			</div>
		</div>
	</div>
</div>
