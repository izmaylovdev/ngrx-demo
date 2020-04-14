
import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {combineLatest, of} from 'rxjs';
import {mapTo, exhaustMap, withLatestFrom} from 'rxjs/operators';
import {deposit, depositSuccess, withdraw, withdrawFail, withdrawSuccess} from '../actions/bank-account.actions';
import {BankAccountSelectors} from '../selectors';
import {AccountDataService} from "../../account-data.service";

@Injectable()
export class BankAccountEffects {

  withdraw$ = createEffect(() => this.actions$.pipe(
    ofType(withdraw.type),
    withLatestFrom(combineLatest([
      this._accountSelectors.creditLimit$,
      this._accountSelectors.funds$
    ])),
    exhaustMap(([{ amount }, [ creditLimit, fundsAmount ]]) =>
      (creditLimit + fundsAmount) > amount ?
        this._accountData.withdraw(amount).pipe(
          mapTo(withdrawSuccess({ amount }))
        ) :
        of(withdrawFail({ amount }))
    )
  ));

  deposit$ = createEffect(() => this.actions$.pipe(
    ofType(deposit.type),
    exhaustMap(({ amount }) =>
      this._accountData.deposit(amount).pipe(
        mapTo(depositSuccess({ amount }))
      )
    )
  ));


  constructor(
    private actions$: Actions,
    private _accountSelectors: BankAccountSelectors,
    private _accountData: AccountDataService
  ) {
    this.actions$.subscribe(console.log);
  }
}
