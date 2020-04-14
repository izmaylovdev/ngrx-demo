import { Component } from '@angular/core';
import {BankAccountSelectors} from '../../core/store';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss']
})
export class BaseLayoutComponent {
  public loading$ = this._accountSelectors.loading$;

  constructor(
    private _accountSelectors: BankAccountSelectors
  ) { }
}
