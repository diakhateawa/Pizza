import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NoPizzasFoundComponent } from "./components/no-pizzas-found/no-pizzas-found.component";
import { MDBBootstrapModule } from "angular-bootstrap-md";
import { FormsModule, FormBuilder } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { OwlModule } from "ngx-owl-carousel";
import { NgxPaginationModule } from "ngx-pagination";
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from "@agm/core";
import { NoAccessComponent } from "./components/no-access/no-access.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { FilterByBrandPipe } from "./pipes/filterByBrand.pipe";
import { PizzaService } from "./services/pizza.service";
import { AdminGaurd } from "./services/admin-gaurd";
import { AuthGuard } from "./services/auth_gaurd";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { TranslatePipe } from "./pipes/translate.pipe";
import { NgxContentLoadingModule } from "ngx-content-loading";
import { CardLoaderComponent } from "./components/card-loader/card-loader.component";
import { MomentTimeAgoPipe } from "./pipes/moment-time-ago.pipe";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { CdkTableModule } from "@angular/cdk/table";
import { CdkTreeModule } from "@angular/cdk/tree";
@NgModule({
	imports: [
		CommonModule,
		MDBBootstrapModule.forRoot(),
		FormsModule,
		HttpClientModule,
		RouterModule,
		OwlModule,
		NgxPaginationModule,
		AgmCoreModule.forRoot({
			apiKey: "AIzaSyDMbxW3MlwUP2vrAZVJyu7pYqZa1LthvTE"
		}),
		NgxContentLoadingModule
	],
	declarations: [
		NoPizzasFoundComponent,
		FilterByBrandPipe,
		NoAccessComponent,
		PageNotFoundComponent,
		TranslatePipe,
		CardLoaderComponent,
		MomentTimeAgoPipe
	],
	exports: [
		NoPizzasFoundComponent,
		FormsModule,
		MDBBootstrapModule,
		FormsModule,
		RouterModule,
		OwlModule,
		NgxPaginationModule,
		FilterByBrandPipe,
		AgmCoreModule,
		NoAccessComponent,
		PageNotFoundComponent,
		TranslatePipe,
		MomentTimeAgoPipe,
		NgxContentLoadingModule,
		CardLoaderComponent,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule, ScrollingModule
	],
	providers: [AuthService, AuthGuard, AdminGaurd, PizzaService, UserService, FormBuilder]
})
export class SharedModule { }
