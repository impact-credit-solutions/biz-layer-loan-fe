import { Routes } from '@angular/router';

import { GetAccountsComponent } from './get-accounts/get-accounts.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

export const routes: Routes = [

    { path: 'accounts', redirectTo: 'accounts/all' },

    { path: 'accounts/:status', component: GetAccountsComponent, title: "Accounts" },

    { path: 'details/:accountId', component: AccountDetailsComponent },
];

