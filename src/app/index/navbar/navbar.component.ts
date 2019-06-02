import {
  Component,
  OnInit,
  VERSION
} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";
import { PizzaService } from "../../shared/services/pizza.service";
import { TranslateService } from "../../shared/services/translate.service";
import { ThemeService } from "src/app/shared/services/theme.service";
declare var $: any;

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  angularVersion = VERSION;

  constructor(
    public authService: AuthService,
    private router: Router,
    public pizzaService: PizzaService,
    public translate: TranslateService,
    private themeService: ThemeService
  ) {
    // console.log(translate.data);
  }

  ngOnInit() { }
  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  setLang(lang: string) {
    // console.log("Language", lang);
    this.translate.use(lang).then(() => { });
  }

  updateTheme(theme: string) {
    this.themeService.updateThemeUrl(theme);
  }
}
