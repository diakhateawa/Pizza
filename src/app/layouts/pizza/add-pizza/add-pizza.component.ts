import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import { Pizza } from 'src/app/shared/models/pizza';

declare var $: any;
declare var require: any;
declare var toastr: any;
const shortId = require('shortid');
const moment = require('moment');

@Component({
	selector: 'app-add-pizza',
	templateUrl: './add-pizza.component.html',
	styleUrls: [ './add-pizza.component.scss' ]
})
export class AddPizzaComponent implements OnInit {
	pizza: Pizza = new Pizza();
	constructor(private pizzaService: PizzaService) {}

	ngOnInit() {}

	createPizza(pizzaForm: NgForm) {
		pizzaForm.value['pizzaId'] = 'PROD_' + shortId.generate();
		pizzaForm.value['pizzaAdded'] = moment().unix();
		pizzaForm.value['ratings'] = Math.floor(Math.random() * 5 + 1);
		if (pizzaForm.value['pizzaImageUrl'] === undefined) {
			pizzaForm.value['pizzaImageUrl'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
		}

		pizzaForm.value['favourite'] = false;

		const date = pizzaForm.value['pizzaAdded'];

		this.pizzaService.createPizza(pizzaForm.value);

		this.pizza = new Pizza();

		$('#exampleModalLong').modal('hide');

		toastr.success('pizza ' + pizzaForm.value['pizzaName'] + 'is added successfully', 'Pizza Creation');
	}
}
