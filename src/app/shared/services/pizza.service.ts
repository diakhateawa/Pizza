import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import {  Pizza } from '../models/pizza';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable()
export class PizzaService {
	pizzas: AngularFireList<Pizza>;
	pizza: AngularFireObject<Pizza>;

	// favouritepizzas
	favouritePizzas: AngularFireList<FavouritePizza>;
	cartPizzas: AngularFireList<FavouritePizza>;

	// NavbarCounts
	navbarCartCount = 0;
	navbarFavPizCount = 0;

	constructor(
		private db: AngularFireDatabase,
		private authService: AuthService,
		private toastrService: ToastrService
	) {
		this.calculateLocalFavPizCounts();
		this.calculateLocalCartPizCounts();
	}

	getPizzas() {
		this.pizzas = this.db.list('pizzas');
		return this.pizzas;
	}

	createPizza(data: Pizza) {
		this.pizzas.push(data);
	}

	getPizzaById(key: string) {
		this.pizza = this.db.object('pizzas/' + key);
		return this.pizza;
	}

	updatePizza(data: Pizza) {
		this.pizzas.update(data.$key, data);
	}

	deletePizza(key: string) {
		this.pizzas.remove(key);
	}

	/*
   ----------  Favourite pizza Function  ----------
  */

	// Get Favourite pizza based on userId
	getUsersFavouritePizza() {
		const user = this.authService.getLoggedInUser();
		this.favouritePizzas = this.db.list('favouritePizzas', (ref) =>
			ref.orderByChild('userId').equalTo(user.$key)
		);
		return this.favouritePizzas;
	}

	// Adding New pizza to favourite if logged else to localStorage
	addFavouritePizza(data: Pizza): void {
		let a: Pizza[];
		a = JSON.parse(localStorage.getItem('avf_item')) || [];
		a.push(data);
		this.toastrService.wait('Adding pizza', 'Adding pizza as Favourite');
		setTimeout(() => {
			localStorage.setItem('avf_item', JSON.stringify(a));
			this.calculateLocalFavPizCounts();
		}, 1500);
	}

	// Fetching unsigned users favourite proucts
	getLocalFavouritePizzas(): Pizza[] {
		const pizzas: Pizza[] = JSON.parse(localStorage.getItem('avf_item')) || [];

		return pizzas;
	}

	// Removing Favourite pizza from Database
	removeFavourite(key: string) {
		this.favouritePizzas.remove(key);
	}

	// Removing Favourite pizza from localStorage
	removeLocalFavourite(pizza: Pizza) {
		const pizzas: Pizza[] = JSON.parse(localStorage.getItem('avf_item'));

		for (let i = 0; i < pizzas.length; i++) {
			if (pizzas[i].pizzaId === pizza.pizzaId) {
				pizzas.splice(i, 1);
				break;
			}
		}
		// ReAdding the pizzas after remove
		localStorage.setItem('avf_item', JSON.stringify(pizzas));

		this.calculateLocalFavPizCounts();
	}

	// Returning Local pizzas Count
	calculateLocalFavPizCounts() {
		this.navbarFavPizCount = this.getLocalFavouritePizzas().length;
	}

	/*
   ----------  Cart pizza Function  ----------
  */

	// Adding new pizza to cart db if logged in else localStorage
	addToCart(data: Pizza): void {
		let a: Pizza[];

		a = JSON.parse(localStorage.getItem('avct_item')) || [];

		a.push(data);
		this.toastrService.wait('Adding Pizza to Cart', 'Pizza Adding to the cart');
		setTimeout(() => {
			localStorage.setItem('avct_item', JSON.stringify(a));
			this.calculateLocalCartPizCounts();
		}, 500);
	}

	// Removing cart from local
	removeLocalCartPizza(pizza: Pizza) {
		const pizzas: Pizza[] = JSON.parse(localStorage.getItem('avct_item'));

		for (let i = 0; i < pizzas.length; i++) {
			if (pizzas[i].pizzaId === pizza.pizzaId) {
				pizzas.splice(i, 1);
				break;
			}
		}
		// ReAdding the pizzas after remove
		localStorage.setItem('avct_item', JSON.stringify(pizzas));

		this.calculateLocalCartPizCounts();
	}

	// Fetching Locat Cartspizzas
	getLocalCartPizzas(): Pizza[] {
		const pizzas: Pizza[] = JSON.parse(localStorage.getItem('avct_item')) || [];

		return pizzas;
	}

	// returning LocalCarts pizza Count
	calculateLocalCartPizCounts() {
		this.navbarCartCount = this.getLocalCartPizzas().length;
	}
}

export class FavouritePizza {
	pizza: Pizza;
	pizzaId: string;
	userId: string;
}
