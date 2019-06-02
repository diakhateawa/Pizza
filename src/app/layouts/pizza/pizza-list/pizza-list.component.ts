import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../../shared/models/pizza';
import { AuthService } from '../../../shared/services/auth.service';
import { PizzaService } from '../../../shared/services/pizza.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
	selector: 'app-pizza-list',
	templateUrl: './pizza-list.component.html',
	styleUrls: ['./pizza-list.component.scss']
})
export class PizzaListComponent implements OnInit {
	pizzaList: Pizza[];
	loading = false;
	brands = ['All', 'Google', 'Apple', 'Realme', 'Nokia', 'Motorolla'];

	selectedBrand: 'All';

	page = 1;
	constructor(
		public authService: AuthService,
		private pizzaService: PizzaService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.getAllPizzas();
	}

	getAllPizzas() {
		// this.spinnerService.show();
		this.loading = true;
		const x = this.pizzaService.getPizzas();
		x.snapshotChanges().subscribe(
			(pizza) => {
				this.loading = false;
				// this.spinnerService.hide();
				this.pizzaList = [];
				pizza.forEach((element) => {
					const y = element.payload.toJSON();
					y['$key'] = element.key;
					this.pizzaList.push(y as Pizza);
				});
			},
			(err) => {
				this.toastrService.error('Error while fetching Pizzas', err);
			}
		);
	}

	removePizza(key: string) {
		this.pizzaService.deletePizza(key);
	}

	addFavourite(pizza: Pizza) {
		this.pizzaService.addFavouritePizza(pizza);
	}

	addToCart(pizza: Pizza) {
		this.pizzaService.addToCart(pizza);
	}
}
