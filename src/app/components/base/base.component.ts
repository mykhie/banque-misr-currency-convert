import {Component, Injector, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {CurrencyService} from "@app/http-services/currency.service";

@Component({
  selector: 'app-base',
  template: `
    <p>
      base works!
    </p>
  `,
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  public formGroupBuilder = new FormBuilder();
  private router: Router;
  protected activatedRoute: ActivatedRoute;
  public isLoading = false;
  public errorMessage: undefined | string;
  protected currencyService: CurrencyService;

  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.activatedRoute = injector.get(ActivatedRoute);
    this.currencyService = injector.get(CurrencyService);
  }

  ngOnInit(): void {
    this.updateCurrentPageTitle();
  }

  updateCurrentPageTitle(title = 'Currency Converter') {
    document.title = title;
  }

  isLoadingTrue() {
    this.isLoading = true;
  }

  isLoadingFalse() {
    this.isLoading = false;
  }

  showError(message = 'An error occured') {
    this.errorMessage = message
  }
}
