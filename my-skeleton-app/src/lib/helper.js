export class APIFetcher {
	constructor(baseURL) {
		this.baseURL = baseURL;
	}

	async fetch(endpoint, options = {}) {
		try {
			const response = await fetch(`${this.baseURL}${endpoint}`, {
				mode: 'cors',
				...options,
				headers: {
					...options.headers,
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`API request failed: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			throw error;
		}
	}

	async get(endpoint, params = {}) {
		const urlSearchParams = new URLSearchParams(params);
		const url = `${endpoint}?${urlSearchParams.toString()}`;
		return this.fetch(url, { method: 'GET' });
	}

	async post(endpoint, data) {
		return this.fetch(endpoint, { method: 'POST', body: JSON.stringify(data) });
	}

	async put(endpoint, data) {
		return this.fetch(endpoint, { method: 'PUT', body: JSON.stringify(data) });
	}

	async delete(endpoint) {
		return this.fetch(endpoint, { method: 'DELETE' });
	}
}
