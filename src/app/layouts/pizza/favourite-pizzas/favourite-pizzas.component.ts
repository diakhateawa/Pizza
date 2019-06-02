import { Component, OnInit } from '@angular/core';
import { Pizza} from '../../../shared/models/pizza';
import { PizzaService } from '../../../shared/services/pizza.service';
@Component({
	selector: 'app-favourite-pizzas',
	templateUrl: './favourite-pizzas.component.html',
	styleUrls: [ './favourite-pizzas.component.scss' ]
})
export class FavouritePizzasComponent implements OnInit {
	favoruitePizzas: Pizza[];
	showDataNotFound = true;

	// Not Found Message
	messageTitle = 'No Favourite Pizzas Found';
	messageDescription = 'Please, choose your favourite pizzas';

	constructor(private pizzaService: PizzaService) {}

	ngOnInit() {
		this.getFavouritePizza();
	}
	removeFavourite(pizza: Pizza) {
		this.pizzaService.removeLocalFavourite(pizza);

		this.getFavouritePizza();
	}

	getFavouritePizza() {
		this.favoruitePizzas = this.pizzaService.getLocalFavouritePizzas();
	}
}
