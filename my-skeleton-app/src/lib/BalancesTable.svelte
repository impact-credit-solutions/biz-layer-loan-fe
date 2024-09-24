<script>
	import { DataHandler, Search, RowsPerPage, RowCount, Pagination, Th } from '@vincjo/datatables';
	import { config } from '$lib/config';
	import { focusTrap } from '@skeletonlabs/skeleton';
	export let data;
	let isFocused = true;
	const handler = new DataHandler(data.balances, { rowsPerPage: config.rowsPerPage });
	const rows = handler.getRows();
	let searchString;
</script>

<h2 class="h2">Live Balances</h2>
<!-- Responsive Container (recommended) -->
<div class="table-container w-full">
	<header class="flex justify-between gap-4">
		<div use:focusTrap={isFocused}>
			<div class="p-3 m-3 flex flex-col w-full">
				<input
					class="input w-full variant-soft-tertiary"
					type="search"
					placeholder="Search..."
					bind:value={searchString}
					on:input={() => handler.search(searchString)}
				/>
			</div>
		</div>
	</header>
	<!-- Native Table Element -->
	<table class="table table-interactive">
		<thead>
			<tr>
				<th class="w-1/12">Address</th>
				<th>Amount</th>
				<th>Phase</th>
				<th>Credit</th>
				<th>Debit</th>
				<th>Timestamp</th>
				<!-- <th>Params</th>
        <th>Status</th><th>Product</th> -->
			</tr>
			<tr> </tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr class:bg-error-700={row.account_address === 'DEFAULT' && row.amount >= 0}>
					<td>{row.account_address}</td>

					<td>{row.amount}</td>
					<td>{row.phase}</td>
					<td>{row.total_credit}</td>
					<td>{row.total_debit}</td>
					<td>{row.time_value}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<td colspan="2"><RowCount {handler} /> </td>
			<td><RowsPerPage {handler} /></td>
			<td> <Pagination {handler}></Pagination></td>
		</tfoot>
	</table>
</div>
