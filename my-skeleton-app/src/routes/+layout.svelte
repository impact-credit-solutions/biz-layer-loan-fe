<script>
	import '../app.postcss';
	import { AppShell, AppBar, TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import { copy } from 'svelte-copy';
	import ContentCopy from 'svelte-material-icons/ContentCopy.svelte';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';
	import json from 'highlight.js/lib/languages/json';
	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	hljs.registerLanguage('json', json);
	storeHighlightJs.set(hljs);
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	let currentTile = 0;
	const popupClick = {
		event: 'click',
		target: 'popupClick',
		placement: 'right'
	};
	import { slide, fade, scale, fly } from 'svelte/transition';

	let sideBarOpen = true;
	/** @type {import('./$types').PageData} */
	export let data;
	export let pathname;
	$: pathname = data.pathname;
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let isLoading = false;
	import { ProgressBar } from '@skeletonlabs/skeleton';
	beforeNavigate(() => (isLoading = true));
	afterNavigate(() => (isLoading = false));
	import { initializeStores, Toast } from '@skeletonlabs/skeleton';

	initializeStores();
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();
</script>

<!-- App Shell -->

<div class="h-full w-full">
	<Toast />
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<AppShell class="h-full">
		<svelte:fragment slot="header">
			<!-- App Bar -->

			<AppBar>
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase">
						<ol class="breadcrumb">
							{#each data.breadcrumbList as x, i}
								<li class="crumb">
									<a href={x.href} target="_self">{x.title}</a>
									{#if i === data.breadcrumbList.length - 1 && data.pathname
											.split('/')
											.indexOf('details') > 0}
										<!-- Only show when loan ID is visible (on details page) -->
										<button
											class=" variant-ghost sm"
											use:copy={x.href.split('/')[2]}
											on:click={() => {
												toastStore.trigger({ message: 'COPIED', timeout: 1000 });
											}}><ContentCopy /></button
										>
									{/if}
								</li>
								{#if i < data.breadcrumbList.length - 1}
									<!-- only till n-1 we display the seperator -->
									<li class="crumb-separator" aria-hidden="true">&rsaquo;</li>{/if}
							{/each}
						</ol>
					</strong>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<LightSwitch />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<!-- Page Route Content -->
		<svelte:fragment slot="sidebarLeft"
			><AppRail width={sideBarOpen ? 'w-35' : 'w-30'} class="lg:block">
				<svelte:fragment slot="lead">
					<AppRailAnchor
						><button class="btn mx-1" on:click={() => (sideBarOpen = !sideBarOpen)}
							>{sideBarOpen ? 'Expand' : 'Mini'}</button
						></AppRailAnchor
					>
				</svelte:fragment>
				<!-- --- -->
				<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
					<!-- <svelte:fragment slot="lead">H</svelte:fragment> -->

					<TreeView bind:open={sideBarOpen} padding="p-0">
						{#if sideBarOpen}
							<div transition:fade={{ duration: 500, delay: 0 }}>
								<TreeViewItem bind:open={sideBarOpen}>
									Loan
									<svelte:fragment slot="children">
										<TreeViewItem><a href="/loans/open" target="_self">Open</a></TreeViewItem>

										<TreeViewItem><a href="/loans/pending" target="_self">Pending</a></TreeViewItem>
									</svelte:fragment>
								</TreeViewItem>
							</div>
						{:else}
							<TreeViewItem bind:open={sideBarOpen} class="mx-auto">Loan</TreeViewItem>
						{/if}
					</TreeView>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
					<svelte:fragment slot="lead">(icon)</svelte:fragment>
					<span>Tile 2</span>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
					<svelte:fragment slot="lead">(icon)</svelte:fragment>
					<span>Tile 3</span>
				</AppRailTile>

				<svelte:fragment slot="trail">
					<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
				</svelte:fragment>
			</AppRail></svelte:fragment
		>

		{#if isLoading}
			<ProgressBar value={undefined} />
			<slot />
			<!-- <div transition:slide={{ delay: 0, duration: 2200, axis: 'x' }} class="h-full"> -->
			<!-- <slot /> -->
			<!-- </div> -->
		{:else}
			{#key data.pathname}
				<div class="px-3" transition:fade>
					<slot />
				</div>{/key}
		{/if}
		<svelte:fragment slot="pageFooter"
			><footer class=" py-1 px-3 h-full">
				<table class="w-full">
					<thead>
						<tr>
							<td><h5 class="h5">Evotianus Benedicto</h5></td>
							<td><h5>Contact</h5></td>
							<td><h5>Navigation</h5></td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="p-1">
								<p>Your tagline or short bio</p>
							</td>
							<td class="p-1">
								<ul class="">
									<li>
										<a href="mailto:youremail@example.com" class="hover:underline"
											>youremail@example.com</a
										>
									</li>
									<li>
										<a
											href="https://www.linkedin.com/in/yourlinkedinprofile"
											class="hover:underline">LinkedIn</a
										>
									</li>
								</ul>
							</td>
							<td class="flex flex-col md:flex-row justify-evenly">
								<div class="mr-4 md:mr-0">
									<ul class="mt-2">
										<li><a href="/" class="hover:underline">Home</a></li>
										<li><a href="/about" class="hover:underline">About</a></li>
									</ul>
								</div>
								<div>
									<ul class="mt-2">
										<li><a href="/projects" class="hover:underline">Projects</a></li>
										<li><a href="/contact" class="hover:underline">Contact</a></li>
									</ul>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<div class="mt-4 text-center md:text-right">
					<p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
				</div>
			</footer></svelte:fragment
		></AppShell
	>
</div>
