<script>
	export let data;
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { focusTrap } from '@skeletonlabs/skeleton';
	// Import each language module you require

	import { DataHandler, Search, RowsPerPage, RowCount, Pagination } from '@vincjo/datatables';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	import { config } from '$lib/config';
	const handler = new DataHandler(data.loans, { rowsPerPage: config.rowsPerPage });
	const rows = handler.getRows();
	let isFocused = true;
	let searchString;
</script>

<div class="table-container h-full">
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
	<!-- Native Table Element -->
	<table class="table table-interactive">
		<thead>
			<tr>
				<th class="w-1/16">ID</th>
				<th class="w-1/16">Name</th>
				<th class="w-1/16">Params</th>
				<th class="w-1/16">Status</th>
				<th>Product</th>
			</tr>
			<tr> </tr>
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

					<td>{row.status}</td><td>{row.product_id}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td><RowCount {handler} /> </td>
				<td class="flex justify-center items-center">
					<center><div><Pagination {handler} /></div></center></td
				>
				<td><RowsPerPage {handler} /></td>

				<!-- <td>haha</td> -->
			</tr>
		</tfoot>
	</table>
</div>
