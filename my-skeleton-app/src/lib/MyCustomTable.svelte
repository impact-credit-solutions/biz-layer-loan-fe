<script>
	export let data;
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { focusTrap } from '@skeletonlabs/skeleton';
	// Import each language module you require

	import {
		DataHandler,
		Search,
		RowsPerPage,
		RowCount,
		Pagination,
		Th,
		ThFilter
	} from '@vincjo/datatables';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { config } from '$lib/config';
	const handler = new DataHandler(data.loans, { rowsPerPage: config.rowsPerPage });
	const rows = handler.getRows();
	const sort = handler.getSort();
	let isFocused = true;
	let searchString;
	// console.log(data.loans[3]);
</script>

<div class="table-container w-full">
	<div use:focusTrap={isFocused}>
		<div class="p-3 ">
			<input
				class="input w-full variant-soft-tertiary py-3 px-6"
				type="search"
				placeholder="Search..."
				bind:value={searchString}
				on:input={() => handler.search(searchString)}
			/>
		</div>
	</div>
	<!-- Native Table Element -->
	<table class="table table-interactive">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Params</th>
				<th>Status</th>

				<Th {handler} orderBy="product_id">Product</Th>

				<Th {handler} orderBy="opening_timestamp">Opening Ts</Th>
			</tr>
			<tr>
				<th colspan="4" class="bg-tertiary-300 text-center">HAHA GA ADA FILTER</th>
				<ThFilter {handler} filterBy="product_id" />
			</tr>
		</thead>
		<tbody>
			{#each $rows as row}
				<tr>
					<td><a href="/details/{row.id}">{row.id}</a></td>
					<td>{row.name}</td>
					<td
						><Accordion>
							<AccordionItem>
								<svelte:fragment slot="lead">Instance</svelte:fragment>
								<svelte:fragment slot="summary">Expand</svelte:fragment>
								<svelte:fragment slot="content"
									><CodeBlock
										language="json"
										code={JSON.stringify(row.instance_param_vals, null, 4)}
									></CodeBlock></svelte:fragment
								>
							</AccordionItem>
						</Accordion></td
					>

					<td class = 'text-center'>{row.status ? '✅' : '❌'}</td>
					<td>{row.product_id}</td>
					<td>{new Date(row.opening_timestamp * 1000).toDateString()}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td><RowCount {handler} /> </td>
				<td class="" colspan="4"> <Pagination {handler} class="justify-center" /></td>
				<td><RowsPerPage {handler} /></td>

				<!-- <td>haha</td> -->
			</tr>
		</tfoot>
	</table>
</div>
