/** @type {import('./$types').PageLoad} */
import { get } from 'svelte/store'
import { myStore } from '$lib/store'
export async function load() {
    return { 'token': get(myStore) };
};