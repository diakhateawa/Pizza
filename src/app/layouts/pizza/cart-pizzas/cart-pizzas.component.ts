import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../../shared/models/pizza';
import {PizzaService } from '../../../shared/services/pizza.service';
@Component({
	selector: 'app-cart-pizzas',
	templateUrl: './cart-pizzas.component.html',
	styleUrls: [ './cart-pizzas.component.scss' ]
})
export class CartPizzasComponent implements OnInit {
	cartPizzas: Pizza [];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No pizzas Found in Cart';
	messageDescription = 'Please, Add pizzas to Cart';

	constructor(private pizzaService: PizzaService) {}

	ngOnInit() {
		this.getCartPizza();
	}

	removeCartPizza(pizza: Pizza) {
		this.pizzaService.removeLocalCartPizza(pizza);

		// Recalling
		this.getCartPizza ();
	}

	getCartPizza() {
		this.cartPizzas = this.pizzaService.getLocalCartPizzas();
	}
}
