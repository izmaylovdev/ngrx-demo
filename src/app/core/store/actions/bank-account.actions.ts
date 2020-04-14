import {createAction, props} from '@ngrx/store';

export const deposit = createAction(
  '[Account] Deposit request',
  props<{ amount: number }>()
);

export const depositSuccess = createAction(
  '[Account] Deposit success',
  props<{ amount: number }>()
);


export const depositFail = createAction(
  '[Account] Deposit fail',
  props<{ amount: number }>()
);


export const withdraw = createAction(
  '[Account] Withdraw request',
  props<{ amount: number }>()
);

export const withdrawSuccess = createAction(
  '[Account] Withdraw success',
  props<{ amount: number }>()
);


export const withdrawFail = createAction(
  '[Account] Withdraw fail',
  props<{ amount: number }>()
);


export const setCreditLimit = createAction(
  '[Account] Set credit limit',
  props<{ newLimit: number }>()
);

