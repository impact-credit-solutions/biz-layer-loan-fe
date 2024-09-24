/** @type {import('./$types').PageLoad} */
import { config } from "$lib/config"
var baseURL = config.baseQueryURL + '/accounts?size=' + config.size;;


export async function load({ fetch, params }) {
    var resp = await fetch(baseURL);
    return { loans: await resp.json() };
}
