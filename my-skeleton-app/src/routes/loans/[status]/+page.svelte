<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import MyCustomTable from '$lib/MyCustomTable.svelte';
</script>

<MyCustomTable {data}></MyCustomTable>
