import { persisted } from 'svelte-persisted-store'

// First param `token` is the local storage key.
// Second param is the initial value.
export const myStore = persisted('token', {
  theme: 'dark',
  pane: '50%',

})