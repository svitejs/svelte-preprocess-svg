<script context="module">
	let foo = 'foo';
</script>

<script>
	export let bar = 'bar';
</script>

<div>
	<h1>logo {foo} {bar}</h1>
	<svg viewBox="0 0 24 24" class="logo" xmlns="http://www.w3.org/2000/svg">
		<circle cx="4" cy="4" r="4" fill="green" />
		<circle cx="4" cy="16" r="4" />
		<circle cx="16" cy="4" r="4" />
		<circle cx="16" cy="16" r="4" />
	</svg>
</div>

<style>
	.logo {
		width: 48px;
		height: 48px;
	}
</style>
