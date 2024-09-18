<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { focusTrap } from '@skeletonlabs/skeleton';
	import { DataHandler, Search, RowsPerPage, RowCount, Pagination } from '@vincjo/datatables';
	import { config } from '$lib/config';
	console.log('CONFIG: ' + config);
	const handler = new DataHandler(data.loans, { rowsPerPage: config.rowsPerPage });
	const rows = handler.getRows();
	let isFocused = true;
	let searchString;
</script>

<h2>Fetching Balances for {data.params.account_id}</h2>

<!-- Responsive Container (recommended) -->
<div class="table-container">
	<header class="flex justify-between gap-4">
		<div use:focusTrap={isFocused}>
			<div class="p-3 m-3">
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
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Address</th>
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
				<tr>
					<td>{row.account_address}</td>
					<td>{row.amount}</td>
					<td>{row.phase}</td>
					<td>{row.total_credit}</td>
					<td>{row.total_debit}</td>
					<td>{row.time_value}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot class="flex justify-evenly justify-items-evenly">
			<center>
				<td><RowCount {handler} /> </td>
				<td><RowsPerPage {handler} /></td>
				<td> <Pagination {handler}></Pagination></td></center
			>
			<!-- <td>haha</td> -->
		</tfoot>
	</table>
</div>
