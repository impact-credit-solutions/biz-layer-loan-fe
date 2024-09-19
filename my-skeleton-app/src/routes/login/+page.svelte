<script>
	/** @type {import('./$types').PageData} */
	export let data;
	import { popup } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { myStore } from '$lib/store';
	const popupFeatured = {
		// Represents the type of event that opens/closed the popup
		event: 'click',
		// Matches the data-popup value on your popup element
		target: 'popupFeatured',
		// Defines which side of your trigger the popup will appear
		placement: 'right'
	};

	let username = 'ics-admin';
	let password = 'abcde12345-';
	let errMsg = '';
	async function login() {
		var resp = await fetch(
			'https://ics-portal.pprod01.icsapi.com/partners/api/partners/portal/token',
			{
				headers: {
					accept: 'application/json, text/plain, */*',
					'accept-language': 'en-US,en;q=0.9',
					'access-control-allow-origin': '*',
					apikey: 'ics@12345',
					'content-type': 'application/json',
					priority: 'u=1, i',
					'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
					'sec-ch-ua-mobile': '?0',
					'sec-ch-ua-platform': '"Windows"',
					'sec-fetch-dest': 'empty',
					'sec-fetch-mode': 'cors',
					'sec-fetch-site': 'same-origin',
					'x-tenant-id': 'ICS',
					cookie: 'GCP_IAP_UID=100341728464011578551',
					Referer: 'https://ics-portal.pprod01.icsapi.com/login',
					'Referrer-Policy': 'strict-origin-when-cross-origin'
				},
				body: JSON.stringify({ username, password }),
				method: 'POST'
			}
		);
		var respJson = await resp.json();
		if (respJson.access_token) {
			errMsg = 'SUCCESS ' + respJson.access_token.slice(0, 20);
			// myStore.update({ ...get(myStore), token: respJson.access_token });
			var sto = get(myStore);
			sto['token'] = respJson.access_token;
			myStore.set(sto);
			goto('/main');
		} else {
			errMsg = 'WRONG PASS';
		}
	}
</script>

<center
	><div class="flex justify-center h-full my-auto">
		<div class="card variant-primary m-3 p-3 flex flex-col gap-4 justify-center">
			<div class="p-4">
				<label class="label">
					<span>Username</span>
					<input class="input" type="text" placeholder="ics-admin" bind:value={username} />
				</label>
			</div>
			<div class="p-4">
				<label class="label variant-primary">
					<span>Password</span>
					<input class="input" type="password" placeholder="abcde12345-" bind:value={password} />
				</label>
			</div>
			<div class="p-4">
				<button class="btn variant-filled" on:click={login} use:popup={popupFeatured}>Submit</button
				>
			</div>

			<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
				<div><p>{errMsg}</p></div>
				<div class="arrow bg-surface-100-800-token" />
			</div>
		</div>
	</div>
</center>
