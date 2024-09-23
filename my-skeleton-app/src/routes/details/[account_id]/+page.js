/** @type {import('./$types').PageLoad} */

import { config } from "$lib/config"
import { get } from 'svelte/store';
import { myStore } from '$lib/store'
var baseUrl = config.baseQueryURL + '/v2/accounts/';
export async function load({ fetch, params }) {
	// console.log('PARAMS : ' + params.account_id);
	var resp_bal = await fetch(baseUrl + params.account_id + '/balance/live');
	var resp_postings = await fetch(config.baseQueryURL + '/accounts/' + params.account_id + '/postings?page=0&size=' + config.size)

	var localStore = get(myStore);

	var currentTab = localStore.details ? localStore.details.tab : 0




	return { params, balances: await resp_bal.json(), postings: await resp_postings.json(), currentTab: currentTab };
}
