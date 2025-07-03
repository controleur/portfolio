<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>
<div class="bg-[url(wallpapers/images/5120x2880.png)] min-h-screen bg-center">
	{@render children()}
</div>

