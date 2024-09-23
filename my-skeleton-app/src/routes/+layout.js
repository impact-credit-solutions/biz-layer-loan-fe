import { get } from 'svelte/store';
import { myStore } from '$lib/store';
import { config } from '$lib/config';

import { redirect } from '@sveltejs/kit';


export const load = ({ url }) => {
	const { pathname } = url;
	// console.log(url)
	// console.log(config.noLoginURL)
	if (config.noLoginURL.indexOf(pathname)) {
		return {
			pathname
		};
	}
	else {

		const localStore = get(myStore);
		// check if active
		if (localStore.access_token) {
			// console.log("TOKEN EXIST")
			return {
				pathname
			};
		}
		else {
			// console.log("REDIRECT TO LOGIN")
			redirect(301, '/login');
		}


	}

};