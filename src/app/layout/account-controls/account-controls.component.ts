import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {deposit, setCreditLimit, withdraw, BankAccountSelectors} from '../../core/store';

@Component({
  selector: 'app-account-controls',
  templateUrl: './account-controls.component.html',
  styleUrls: ['./account-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountControlsComponent {
  public funds$ = this._accountSelectors.funds$;
  public creditLimit$ = this._accountSelectors.creditLimit$;
  public allowedLimit$ = this._accountSelectors.allowedLimit$;
  public history$ = this._accountSelectors.history$;
  public loading$ = this._accountSelectors.loading$;

  public transactionAmount: number;

  constructor(
    private _accountSelectors: BankAccountSelectors,
    private _store: Store
  ) { }

  deposit() {
    if (this.transactionAmount) {
      this._store.dispatch(deposit({ amount: this.transactionAmount }));
      this.transactionAmount = null;
    }
  }

  withdraw() {
    if (this.transactionAmount) {
      this._store.dispatch(withdraw({amount: this.transactionAmount}));
      this.transactionAmount = null;
    }
  }

  changeCreditLimit() {
    const newLimit = +prompt('New limit');
    this._store.dispatch(setCreditLimit({ newLimit }));
  }

}
