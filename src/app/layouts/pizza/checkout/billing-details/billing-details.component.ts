import { PizzaService } from '../../../../shared/services/pizza.service';
import { Pizza} from '../../../../shared/models/pizza';
import { BillingService } from '../../../../shared/services/billing.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User, UserDetail } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-billing-details',
	templateUrl: './billing-details.component.html',
	styleUrls: [ './billing-details.component.scss' ]
})
export class BillingDetailsComponent implements OnInit {
	userDetails: User;
	pizzas: Pizza[];
	userDetail: UserDetail;

	constructor(
		authService: AuthService,
		private billingService: BillingService,
		pizzaService: PizzaService,
		private router: Router
	) {
		/* Hiding Shipping Tab Element */
		document.getElementById('pizzasTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'block';
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
		let totalPrice = 0;
		const pizzas = [];
		this.pizzas.forEach((pizza) => {
			delete pizza['$key'];
			totalPrice += pizza.pizzaPrice;
			pizzas.push(pizza);
		});

		data['pizzas'] = pizzas;

		data['totalPrice'] = totalPrice;

		data['billingDate'] = Date.now();

		this.billingService.createBillings(data);

		this.router.navigate([ 'checkouts', { outlets: { checkOutlet: [ 'result' ] } } ]);
	}
}
