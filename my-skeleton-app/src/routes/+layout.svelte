<script>
	import '../app.postcss';
	import { AppShell, AppBar, TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
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

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	const popupClick = {
		event: 'click',
		target: 'popupClick',
		placement: 'top'
	};
</script>

<!-- App Shell -->
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
				<button class="btn [&>*]:pointer-events-none variant-soft-primary" use:popup={popupClick}>
					<span>📓</span>
				</button>
				<div class="card p-2 variant-soft-primary" data-popup="popupClick">
					<TreeView class="variant-filled-primary">
						<TreeViewItem>
							Status
							<svelte:fragment slot="children">
								<TreeViewItem
									><svelte:fragment slot="lead">❤️</svelte:fragment>
									<a href="/loans/" target="_self" rel="noreferrer"> All</a>
								</TreeViewItem>
								<TreeViewItem
									><svelte:fragment slot="lead">🟢</svelte:fragment>
									<a href="/loans/open" target="_self" rel="noreferrer"> Open</a>
								</TreeViewItem>
								<TreeViewItem
									><svelte:fragment slot="lead">🟡</svelte:fragment>
									<a href="/loans/pending" target="_self" rel="noreferrer"> Pending</a>
								</TreeViewItem>
								<TreeViewItem
									><svelte:fragment slot="lead">🔴</svelte:fragment>
									<a href="/loans/close"> Close</a>
								</TreeViewItem>
							</svelte:fragment>
						</TreeViewItem>
					</TreeView>
				</div>
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<div class="variant-ghost-surface h-full"><slot /></div>
</AppShell>
