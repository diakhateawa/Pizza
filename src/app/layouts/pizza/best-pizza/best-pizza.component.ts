import { TranslateService } from 'src/app/shared/services/translate.service';
import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/shared/models/pizza';
import { PizzaService } from 'src/app/shared/services/pizza.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';

@Component({
	selector: 'app-best-pizza',
	templateUrl: './best-pizza.component.html',
	styleUrls: [ './best-pizza.component.scss' ]
})
export class BestPizzaComponent implements OnInit {
	bestPizzas: Pizza[] = [];
	options: any;
	loading = false;
	constructor(
		private pizzaService: PizzaService,
		private toasterService: ToastrService,
		public translate: TranslateService
	) {}

	ngOnInit() {
		this.options = {
			dots: false,
			responsive: {
				'0': { items: 1, margin: 5 },
				'430': { items: 2, margin: 5 },
				'550': { items: 3, margin: 5 },
				'670': { items: 4, margin: 5 }
			},
			autoplay: true,
			loop: true,
			autoplayTimeout: 3000,
			lazyLoad: true
		};
		this.getAllPizzas();
	}

	getAllPizzas() {
		this.loading = true;
		const x = this.pizzaService.getPizzas();
		x.snapshotChanges().subscribe(
			(pizza) => {
				this.loading = false;
				this.bestPizzas = [];
				for (let i = 0; i < 5; i++) {
					const y = pizza[i].payload.toJSON();
					y['$key'] = pizza[i].key;
					this.bestPizzas.push(y as Pizza);
				}
				// pizza.forEach(element => {
				//   const y = element.payload.toJSON();
				//   y["$key"] = element.key;
				//   this.bestpizzas.push(y as pizza);
				// });
			},
			(error) => {
				this.toasterService.error('Error while fetching pizzas', error);
			}
		);
	}
}
