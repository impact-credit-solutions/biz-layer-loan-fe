<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import MyCustomTable from '$lib/MyCustomTable.svelte';
</script>

<!-- Responsive Container (recommended) -->
<MyCustomTable {data}></MyCustomTable>
