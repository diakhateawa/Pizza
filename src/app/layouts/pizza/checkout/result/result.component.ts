import { Pizza} from '../../../../shared/models/pizza';
import { PizzaService } from '../../../../shared/services/pizza.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare var $: any;
@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
	pizzas: Pizza[];
	date: number;
	totalPrice = 0;
	tax = 6.4;

	constructor(private pizzaService: PizzaService) {
		/* Hiding Billing Tab Element */
		document.getElementById('pizzasTab').style.display = 'none';
		document.getElementById('shippingTab').style.display = 'none';
		document.getElementById('billingTab').style.display = 'none';
		document.getElementById('resultTab').style.display = 'block';

		this.pizzas = pizzaService.getLocalCartPizzas();

		this.pizzas.forEach((pizza) => {
			this.totalPrice += pizza.pizzaPrice;
		});

		this.date = Date.now();
	}

	ngOnInit() { }

	downloadReceipt() {
		const data = document.getElementById('receipt');
		// console.log(data);

		html2canvas(data).then((canvas) => {
			// Few necessary setting options
			const imgWidth = 208;
			const pageHeight = 295;
			const imgHeight = canvas.height * imgWidth / canvas.width;
			const heightLeft = imgHeight;

			const contentDataURL = canvas.toDataURL('image/png');
			const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
			const position = 0;
			pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
			pdf.save('ikismail.pdf'); // Generated PDF
		});
	}
}
