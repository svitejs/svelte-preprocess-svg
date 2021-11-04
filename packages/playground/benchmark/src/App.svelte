<script>
	import * as featherIcons from 'svelte-feather-icons';
	const icons = Object.values(featherIcons);
</script>

<h1>{icons.length} feather icon svgs</h1>
<div class="icons">
	{#each icons as icon}
		<svelte:component this={icon} size="24" />
	{/each}
</div>

<style>
	.icons {
		display: grid;
		gap: 8px;
		grid-template-columns: repeat(auto-fill, 24px);
	}
</style>
