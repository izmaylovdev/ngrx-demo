import { Injectable } from '@angular/core';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  constructor() { }

  /** emulate call to server */
  withdraw(amount: number) {
    return of(amount).pipe(
      delay(3000)
    );
  }

  deposit(amount: number) {
    return of(amount).pipe(
      delay(3000)
    );
  }
}
