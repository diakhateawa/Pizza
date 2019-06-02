import { CartPizzasComponent } from './cart-pizzas/cart-pizzas.component';
import { FavouritePizzasComponent } from './favourite-pizzas/favourite-pizzas.component';
import { PizzaListComponent } from './pizza-list/pizza-list.component';
import { Routes } from '@angular/router';
import { IndexComponent } from '../../index/index.component';
import { PizzaDetailComponent } from './pizza-detail/pizza-detail.component';

export const PizzaRoutes: Routes = [
	{
		path: 'pizzas',
		children: [
			{
				path: '',
				component: IndexComponent
			},
			{
				path: 'all-pizzas',
				component: PizzaListComponent
			},
			{
				path: 'favourite-pizzas',
				component: FavouritePizzasComponent
			},
			{
				path: 'cart-items',
				component: CartPizzasComponent
			},
			{
				path: 'checkouts',
				loadChildren: './checkout/checkout.module#CheckoutModule'
			},
			{
				path: 'pizza/:id',
				component: PizzaDetailComponent
			}
		]
	}
];
