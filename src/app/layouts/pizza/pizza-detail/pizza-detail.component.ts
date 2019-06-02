import { Pizza} from '../../../shared/models/pizza';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PizzaService } from '../../../shared/services/pizza.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
	selector: 'app-pizza-detail',
	templateUrl: './pizza-detail.component.html',
	styleUrls: [ './pizza-detail.component.scss' ]
})
export class PizzaDetailComponent implements OnInit, OnDestroy {
	private sub: any;
	pizza: Pizza;

	constructor(
		private route: ActivatedRoute,
		private pizzaService: PizzaService,
		private toastrService: ToastrService
	) {
		this.pizza = new Pizza();
	}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params) => {
			const id = params['id']; // (+) converts string 'id' to a number
			this.getPizzaDetail(id);
		});
	}

	getPizzaDetail(id: string) {
		// this.spinnerService.show();
		const x = this.pizzaService.getPizzaById(id);
		x.snapshotChanges().subscribe(
			(pizza) => {
				// this.spinnerService.hide();
				const y = pizza.payload.toJSON() as Pizza;

				y['$key'] = id;
				this.pizza = y;
			},
			(error) => {
				this.toastrService.error('Error while fetching Pizza Detail', error);
			}
		);
	}

	addToCart(pizza: Pizza) {
		this.pizzaService.addToCart(pizza);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
