import { persisted } from 'svelte-persisted-store'
import { get } from 'svelte/store'
// First param `token` is the local storage key.
// Second param is the initial value.
export const myStore = persisted('token', {
  theme: 'dark',
  pane: '50%',
  detailsTab: 0

})

export function setVal(newVal, key) {

  const oldx = get(myStore);
  oldx[key] = newVal;
  myStore.set(oldx);

}