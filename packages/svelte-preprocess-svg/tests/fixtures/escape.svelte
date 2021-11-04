<script>
	const foo = 'foo';
</script>

<div>
	<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<text x="0" y="0">`</text><!-- backtick that would end the @html early -->
		<text x="0" y="8">{foo}</text><!-- curlies could mess with @html -->
		<text x="0" y="16">}</text><!-- another curly -->
	</svg>
</div>
