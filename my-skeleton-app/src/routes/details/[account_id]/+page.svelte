<script>
	/** @type {import('./$types').PageData} */
	export let data;

	import { focusTrap } from '@skeletonlabs/skeleton';
	import { DataHandler, Search, RowsPerPage, RowCount, Pagination, Th } from '@vincjo/datatables';
	import { config } from '$lib/config';
	// console.log('CONFIG: ' + config);
	const handler = new DataHandler(data.balances, { rowsPerPage: config.rowsPerPage });
	const rows = handler.getRows();

	const handler_postings = new DataHandler(data.postings, { rowsPerPage: config.rowsPerPage });
	const rows_postings = handler_postings.getRows();
	const sort_postings = handler_postings.getSort();
	let isFocused = true;
	let searchString;
	let searchStringPosting;

	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	import { myStore, setVal } from '$lib/store';
	import { get } from 'svelte/store';
	let tabSet = get(myStore)['detailsTab'];

	$: tabSet, setVal(tabSet, 'detailsTab');

	// myStore.tabSet = tabSet;
</script>

<TabGroup class="flex flex-col justify-center justify-items-center">
	<Tab bind:group={tabSet} name="Balances" value={0} class="flex-1 mx-auto">
		<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
		<h3 class="h3">Live Balances</h3>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1} class="flex-1 mx-auto"
		><h3 class="h3">Postings</h3></Tab
	>
	<!-- <Tab bind:group={tabSet} name="tab3" value={2}>(label 3)</Tab> -->
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			{#if data.balances.length > 0}
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
						<tfoot>
							<td colspan="2"><RowCount {handler} /> </td>
							<td><RowsPerPage {handler} /></td>
							<td> <Pagination {handler}></Pagination></td>
						</tfoot>
					</table>
				</div>
			{:else}
				<h2>No Balance Information</h2>
			{/if}
		{:else if tabSet === 1}
			{#if data.postings.length > 0}
				<h2 class="h2">Postings</h2>
				<!-- Responsive Container (recommended) -->
				<div class="table-container">
					<header class="flex justify-between gap-4">
						<div use:focusTrap={isFocused}>
							<div class="p-3 m-3 flex flex-col w-full">
								<input
									class="input w-full variant-soft-tertiary"
									type="search"
									placeholder="Search..."
									bind:value={searchStringPosting}
									on:input={() => handler_postings.search(searchStringPosting)}
								/>
							</div>
						</div>
					</header>
					<table class="table table-interactive">
						<thead>
							<tr>
								<Th handler={handler_postings} orderBy="posting_instruction_id" class="w-1/6"
									>Posting ID</Th
								>
								<th>Address</th>
								<th>Amount</th>
								<th>Phase</th>

								<Th handler={handler_postings} orderBy="value_timestamp">Value Ts</Th>

								<Th handler={handler_postings} orderBy="insertion_timestamp">Insert Ts</Th>
							</tr>
						</thead>
						<tbody>
							{#each $rows_postings as rowx}
								<tr>
									<td>{rowx.posting_instruction_id}</td>
									<td>{rowx.account_address}</td>
									<td>{rowx.amount}</td>
									<td>{rowx.phase}</td>

									<td>{rowx.value_timestamp}</td>
									<td>{rowx.insertion_timestamp}</td>
								</tr>
							{/each}
						</tbody>
						<tfoot class=" ">
							<td><RowCount handler={handler_postings} /> </td>
							<td><RowsPerPage handler={handler_postings} /></td>
							<td> <Pagination handler={handler_postings}></Pagination></td>
						</tfoot>
					</table>
				</div>
			{:else}
				<h2>No Postings Information</h2>
			{/if}
		{/if}
	</svelte:fragment>
</TabGroup>
