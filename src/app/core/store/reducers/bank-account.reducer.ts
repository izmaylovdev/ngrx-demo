import {Action, createReducer, on} from '@ngrx/store';
import * as BankAccountActions from '../actions/bank-account.actions';
import {AppState} from "../app-state";

export interface BankAccountState {
  funds: number;
  creditLimit: number;
  loading: boolean;
}

const initialState: BankAccountState = {
  funds: 0,
  creditLimit: 0,
  loading: false,
};

const reducer = createReducer<BankAccountState>(
  initialState,
  on(BankAccountActions.deposit,
    (state) => ({ ...state, loading: true })
  ),
  on(BankAccountActions.depositSuccess,
    (state, { amount }) => ({ ...state, funds: state.funds + amount, loading: false })
  ),
  on(BankAccountActions.depositFail,
    (state, { amount }) => ({ ...state, loading: false })
  ),
  on(BankAccountActions.withdraw,
    (state) => ({ ...state, loading: true })
  ),
  on(BankAccountActions.withdrawSuccess,
    (state, { amount }) => ({ ...state, funds: state.funds - amount, loading: false })
  ),
  on(BankAccountActions.withdrawFail,
    (state, { amount }) => ({ ...state, loading: false })
  ),
  on(BankAccountActions.setCreditLimit,
    (state, { newLimit }) => ({ ...state, creditLimit: newLimit })
  )
);

/** function expression does not supported in AOT */
export function bankAccountReducer(state: BankAccountState | undefined, action: Action) {
  return reducer(state, action);
}
