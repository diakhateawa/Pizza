import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-no-pizzas-found",
  templateUrl: "./no-pizzas-found.component.html",
  styleUrls: ["./no-pizzas-found.component.scss"]
})
export class NoPizzasFoundComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input("title") title: String;
  // tslint:disable-next-line:no-input-rename
  @Input("description") description: String;
  constructor() {}

  ngOnInit() {}
}
