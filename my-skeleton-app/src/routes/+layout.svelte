<script>
	import '../app.postcss';
	import { AppShell, AppBar, TreeView, TreeViewItem } from '@skeletonlabs/skeleton';

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
		event: 'hover',
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
</script>

<!-- App Shell -->

<div class="h-full">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<AppShell>
		<svelte:fragment slot="header">
			<!-- App Bar -->
			<AppBar>
				<svelte:fragment slot="lead">
					<strong class="text-xl uppercase">Meongg</strong>
					<img
						width="50"
						class="ml-3"
						alt="cat meow"
						src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTBzajB3YzdpNzBtZWJqYXhoYzV0aGFydmF3djZzbjZvNzhmMGphciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/I9XrL9Tc1jpe/200.webp"
					/>
				</svelte:fragment>
				<svelte:fragment slot="trail">
					<LightSwitch />
				</svelte:fragment>
			</AppBar>
		</svelte:fragment>
		<!-- Page Route Content -->
		<svelte:fragment slot="sidebarLeft"
			><AppRail width={sideBarOpen ? 'w-35' : 'w-30'} class=" lg:block variant-ghost">
				<svelte:fragment slot="lead">
					<AppRailAnchor
						><button class="btn variant-filled" on:click={() => (sideBarOpen = !sideBarOpen)}
							>{sideBarOpen ? 'Expand' : 'Mini'}</button
						></AppRailAnchor
					>
				</svelte:fragment>
				<!-- --- -->
				<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
					<!-- <svelte:fragment slot="lead">H</svelte:fragment> -->
					<div
						class="flex flex-col container"
						on:mouseenter={() => (sideBarOpen = true)}
						on:mouseleave={() => (sideBarOpen = false)}
					>
						<TreeView bind:open={sideBarOpen} padding="p-0">
							{#if sideBarOpen}
								<div transition:fade>
									<TreeViewItem bind:open={sideBarOpen}>
										Loan
										<svelte:fragment slot="children">
											<TreeViewItem><a href="/loans/open" target="_self">Open</a></TreeViewItem>

											<TreeViewItem
												><a href="/loans/pending" target="_self">Pending</a></TreeViewItem
											>
										</svelte:fragment>
									</TreeViewItem>
								</div>
							{:else}
								<TreeViewItem bind:open={sideBarOpen} class="mx-auto">Loan</TreeViewItem>
							{/if}
						</TreeView>
					</div>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
					<svelte:fragment slot="lead">(icon)</svelte:fragment>
					<span>Tile 2</span>
				</AppRailTile>
				<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
					<svelte:fragment slot="lead">(icon)</svelte:fragment>
					<span>Tile 3</span>
				</AppRailTile>
				<!-- --- -->
				<svelte:fragment slot="trail">
					<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
				</svelte:fragment>
			</AppRail></svelte:fragment
		>

		{#if isLoading}
			<ProgressBar value={undefined} />
			<!-- <div transition:slide={{ delay: 0, duration: 2200, axis: 'x' }} class="h-full"> -->
				<slot />
			<!-- </div> -->
		{:else}
			<div transition:fade={{ delay: 100, duration: 1000, axis: 'x' }} class="h-full">
				<slot />
			</div>
		{/if}
		<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment></AppShell
	>
</div>
