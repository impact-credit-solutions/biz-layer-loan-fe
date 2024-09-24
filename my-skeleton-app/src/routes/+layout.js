import { get } from 'svelte/store';
import { myStore } from '$lib/store';
import { config } from '$lib/config';

import { redirect } from '@sveltejs/kit';


function createBreadcrumbList(pathname) {
	// Handle root path
	if (pathname === '/') {
		return [{ title: 'Home', href: '/' }];
	}

	// Extract path segments
	const pathSegments = pathname.split('/').filter(Boolean);

	// Create breadcrumb list
	const breadcrumbList = [];
	let currentPath = '';

	pathSegments.forEach((segment, index) => {
		currentPath += `/${segment}`;
		const title = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize first letter
		breadcrumbList.push({
			title,
			href: currentPath,
			isCurrent: index === pathSegments.length - 1
		});
	});

	// Add "Home" as the first item if not already present
	if (breadcrumbList[0].href !== '/') {
		breadcrumbList.unshift({ title: 'Home', href: '/' });
	}

	return breadcrumbList;
}

export const load = ({ url }) => {
	const { pathname } = url;
	var returnData = {
		breadcrumbList: createBreadcrumbList(pathname)
	}

	if (config.noLoginURL.indexOf(pathname) >= 0) {
		return {
			...returnData, pathname
		};
	}
	else {

		const localStore = get(myStore);

		// check if active
		if (localStore['token'] !== null) {
			// console.log("TOKEN EXIST")
			return {
				...returnData, pathname
			};
		}
		else {
			// console.log("REDIRECT TO LOGIN")
			redirect(301, '/login');
		}


	}

};