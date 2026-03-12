import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../pages/users/users.page').then((m) => m.UsersPage),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../pages/products/products.page').then((m) => m.ProductsPage),
      },
      {
        path: 'tab4',
        loadComponent: () =>
          import('../pages/blank/blank.page').then((m) => m.BlankPage),
      },
      {
        path: 'tab5',
        loadComponent: () =>
          import('../pages/contacts/contacts.page').then((m) => m.ContactsPage),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
