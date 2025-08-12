<script lang="ts">
	import { getIcon } from '$lib';
	import { bookmarks } from '$lib/stores';
</script>

<div class="flex h-full flex-col bg-white p-6 dark:bg-gray-800">
	<div class="mb-6 text-center">
		<div class="mx-auto mb-4 w-16">
			{@html getIcon('plasmaColor')}
		</div>
		<h1 class="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">Portfoli.OS</h1>
		<p class="text-gray-600 dark:text-gray-400">A modern desktop portfolio experience</p>
	</div>

	<div class="space-y-6">
		<!-- About Section -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">About</h2>
			<p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
				Welcome to Portfoli.OS, a modern web-based desktop environment showcasing my portfolio and
				projects. Built with SvelteKit and styled with Tailwind CSS, this interactive experience
				provides a familiar desktop interface in your browser.
			</p>
		</div>

		<!-- Features Section -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Features</h2>
			<ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
					Responsive desktop environment
				</li>
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
					Dark/Light theme support
				</li>
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
					Multilingual interface (EN/FR)
				</li>
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
					Virtual browser for portfolio viewing
				</li>
				<li class="flex items-center gap-2">
					<div class="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
					File explorer and terminal emulation
				</li>
			</ul>
		</div>

		<!-- Portfolio Projects -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Projects</h2>
			<div class="grid gap-2">
				{#each $bookmarks as project}
					<div class="flex items-center justify-between rounded bg-white p-2 dark:bg-gray-600">
						<div>
							<p class="text-sm font-medium text-gray-900 dark:text-gray-100">{project.name}</p>
							{#if project.description}
								<p class="text-xs text-gray-600 dark:text-gray-400">{project.description}</p>
							{/if}
						</div>
						{#if project.github}
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								class="text-xs text-blue-500 hover:text-blue-600"
							>
								GitHub
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Technology Stack -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Built With</h2>
			<div class="flex flex-wrap gap-2">
				{#each ['SvelteKit', 'TypeScript', 'Tailwind CSS', 'Vite'] as tech}
					<span
						class="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
					>
						{tech}
					</span>
				{/each}
			</div>
		</div>

		<!-- Contact -->
		<div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
			<h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">Contact</h2>
			<p class="text-sm text-gray-600 dark:text-gray-400">
				Interested in working together? Feel free to explore my projects and reach out!
			</p>
		</div>
	</div>
</div>
