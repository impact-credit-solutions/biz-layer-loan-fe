/** @type {import('./$types').PageLoad} */

import {config} from "$lib/config"
var baseURL = config.baseQueryURL+'/accounts?size=' + config.size;

export async function load({ fetch, params }) {
	console.log(params.status);
	var status = params.status.toUpperCase();
	var resp = await fetch(baseURL + '&status=' + status);
	return { loans: await resp.json() };
}
