import { PizzaService } from '../../../../shared/services/pizza.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Pizza } from '../../../../shared/models/pizza';

@Component({
	selector: 'app-pizzas',
	templateUrl: './pizzas.component.html',
	styleUrls: [ './pizzas.component.scss' ]
})
export class pizzasComponent implements OnInit {
	checkoutpizzas: Pizza[];

	totalPrice = 0;
	constructor(pizzaService: PizzaService) {
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';

		const pizzas = pizzaService.getLocalCartPizzas();

		this.checkoutpizzas = pizzas;

		pizzas.forEach((pizza) => {
			this.totalPrice += pizza.pizzaPrice;
		});
	}

	ngOnInit() {}
}
