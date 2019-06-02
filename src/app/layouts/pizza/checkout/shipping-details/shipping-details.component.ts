import { Pizza} from '../../../../shared/models/pizza';
import { ShippingService } from '../../../../shared/services/shipping.service';
import { UserDetail, User } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PizzaService } from '../../../../shared/services/pizza.service';
@Component({
	selector: 'app-shipping-details',
	templateUrl: './shipping-details.component.html',
	styleUrls: [ './shipping-details.component.scss' ]
})
export class ShippingDetailsComponent implements OnInit {
	userDetails: User;

	userDetail: UserDetail;

	pizzas: Pizza[];

	constructor(
		authService: AuthService,
		private shippingService: ShippingService,
		pizzaService: PizzaService,
		private router: Router
	) {
		/* Hiding pizzas Element */
		document.getElementById('pizzasTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'block';
		document.getElementById('pizzasTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'none';

		this.userDetail = new UserDetail();
		this.pizzas = pizzaService.getLocalCartPizzas();
		this.userDetails = authService.getLoggedInUser();
	}

	ngOnInit() {}

	updateUserDetails(form: NgForm) {
		const data = form.value;

		data['emailId'] = this.userDetails.emailId;
		data['userId'] = this.userDetails.$key;
		const pizzas = [];

		let totalPrice = 0;

		this.pizzas.forEach((pizza) => {
			delete pizza['$key'];
			totalPrice += pizza.pizzaPrice;
			pizzas.push(pizza);
		});

		data['pizzas'] = pizzas;

		data['totalPrice'] = totalPrice;

		data['shippingDate'] = Date.now();

		this.shippingService.createshippings(data);

		this.router.navigate([ 'checkouts', { outlets: { checkOutlet: [ 'billing-details' ] } } ]);
	}
}
