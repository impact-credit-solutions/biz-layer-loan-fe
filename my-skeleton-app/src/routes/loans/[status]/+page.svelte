<script>
	/** @type {import('./$types').PageData} */
	export let data;


	import { DataHandler } from '@vincjo/datatables';
	
	import { config } from '$lib/config';

	const handler = new DataHandler(data.loans, { rowsPerPage: config.rowsPerPage });
	const rows = handler.getRows();
	let isFocused = true;
	import MyCustomTable from '$lib/MyCustomTable.svelte';
</script>

<MyCustomTable {data}></MyCustomTable>
