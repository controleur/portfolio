<script lang="ts">
	import '../app.css';
	import Taskbar from '../components/Taskbar.svelte';
	import TrayOpened from '../components/TrayOpened.svelte';
</script>
<div class="bg-[url(wallpapers/images/5120x2880.png)] min-h-screen bg-center">
	<Taskbar />
	<TrayOpened />
	<!-- <slot /> calls childs -->
</div>

