<script lang="ts">
	import {
		isDarkMode,
		isSoundMuted,
		currentLanguage,
		toggleTheme,
		toggleSound,
		toggleLanguage
	} from '$lib/stores';
	import { getIcon } from '$lib';
	import { _ } from 'svelte-i18n';
</script>

<div class="flex h-full flex-col bg-white p-6 dark:bg-gray-800">
	<h1 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">System Settings</h1>

	<div class="space-y-6">
		<!-- Appearance Settings -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Appearance</h2>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="text-gray-600 dark:text-gray-300">
						{@html getIcon($isDarkMode ? 'darkMode' : 'lightMode')}
					</div>
					<div>
						<p class="font-medium text-gray-900 dark:text-gray-100">Theme</p>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							{$isDarkMode ? 'Dark mode' : 'Light mode'}
						</p>
					</div>
				</div>
				<button
					on:click={toggleTheme}
					class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
				>
					Toggle
				</button>
			</div>
		</div>

		<!-- Audio Settings -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Audio</h2>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div class="text-gray-600 dark:text-gray-300">
						{@html getIcon($isSoundMuted ? 'soundMuted' : 'sound')}
					</div>
					<div>
						<p class="font-medium text-gray-900 dark:text-gray-100">Sound</p>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							{$isSoundMuted ? 'Muted' : 'Enabled'}
						</p>
					</div>
				</div>
				<button
					on:click={toggleSound}
					class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
				>
					Toggle
				</button>
			</div>
		</div>

		<!-- Language Settings -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Language</h2>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-3">
					<div
						class="flex h-8 w-8 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
					>
						<span class="text-sm font-semibold">{$currentLanguage.toUpperCase()}</span>
					</div>
					<div>
						<p class="font-medium text-gray-900 dark:text-gray-100">Current Language</p>
						<p class="text-sm text-gray-600 dark:text-gray-400">
							{$currentLanguage === 'en' ? 'English' : 'Français'}
						</p>
					</div>
				</div>
				<button
					on:click={toggleLanguage}
					class="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
				>
					Switch
				</button>
			</div>
		</div>

		<!-- System Info -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
				System Information
			</h2>
			<div class="space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="text-gray-600 dark:text-gray-400">OS:</span>
					<span class="text-gray-900 dark:text-gray-100">Portfoli.OS</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600 dark:text-gray-400">Version:</span>
					<span class="text-gray-900 dark:text-gray-100">1.0.0</span>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600 dark:text-gray-400">Framework:</span>
					<span class="text-gray-900 dark:text-gray-100">SvelteKit</span>
				</div>
			</div>
		</div>
	</div>
</div>
