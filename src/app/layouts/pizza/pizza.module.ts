// Core Dependencies
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

// configuration and services
import { PizzaRoutes } from "./pizza.routing";

// Components
import { CheckoutModule } from "./checkout/checkout.module";

import { PizzaComponent } from "./pizza.component";
import { BestPizzaComponent } from "./best-pizza/best-pizza.component";
import { PizzaListComponent } from "./pizza-list/pizza-list.component";
import { AddPizzaComponent } from "./add-pizza/add-pizza.component";
import { PizzaDetailComponent } from "./pizza-detail/pizza-detail.component";
import { SharedModule } from "../../shared/shared.module";
import { FavouritePizzasComponent } from "./favourite-pizzas/favourite-pizzas.component";
import { CartPizzasComponent } from "./cart-pizzas/cart-pizzas.component";
import { CartCalculatorComponent } from "./cart-calculator/cart-calculator.component";

@NgModule({
	imports: [CommonModule, RouterModule.forChild(PizzaRoutes), SharedModule, CheckoutModule],
	declarations: [
		PizzaComponent,
		BestPizzaComponent,
		PizzaListComponent,
		AddPizzaComponent,
		PizzaDetailComponent,
		FavouritePizzasComponent,
		CartPizzasComponent,
		CartCalculatorComponent
	],
	exports: [BestPizzaComponent]
})
export class PizzaModule { }
