import {createSelector, Store} from '@ngrx/store';
import {AppState} from '../app-state';
import {BankAccountState} from '../reducers';
import {Injectable} from '@angular/core';
import {scan} from 'rxjs/operators';

export const selectBankAccount = (state: AppState) => state.account;

export const selectFoundsAmount = createSelector(
  selectBankAccount,
  (state: BankAccountState) => state.funds
);

export const selectCreditLimit = createSelector(
  selectBankAccount,
  (state: BankAccountState) => state.creditLimit
);

export const selectAllowedLimit = createSelector(
  selectFoundsAmount,
  selectCreditLimit,
  (funds, creditLimit) => funds > 0 ? creditLimit : creditLimit + funds
);

export const selectLoading = createSelector(
  selectBankAccount,
  (state: BankAccountState) => state.loading,
);

@Injectable()
export class BankAccountSelectors {
  funds$ = this._store.select(selectFoundsAmount);
  creditLimit$ = this._store.select(selectCreditLimit);
  allowedLimit$ = this._store.select(selectAllowedLimit);
  loading$ = this._store.select(selectLoading);

  history$ = this.funds$.pipe(
    scan((acc, curr) => {
      return [ curr, ...acc ];
    }, [])
  );

   constructor(
     private _store: Store<AppState>,
   ) {}
}
