/** @type {import('./$types').PageLoad} */

import {config} from "$lib/config"
var baseUrl = config.baseQueryURL+'/v2/accounts/';
export async function load({ fetch, params }) {
	console.log('PARAMS : ' + params.account_id);
	var resp = await fetch(baseUrl + params.account_id + '/balance/live');
	return { params, data: await resp.json() };
}
