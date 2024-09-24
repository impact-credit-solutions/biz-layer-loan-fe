/** @type {import('./$types').PageLoad} */
import { get } from 'svelte/store';
import { formStore } from '$lib/store'
export async function load({ params }) {
    return { formStore: get(formStore), formId: params.formId };
};