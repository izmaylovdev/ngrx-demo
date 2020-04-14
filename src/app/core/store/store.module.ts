import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../../environments/environment';
import {BankAccountSelectors} from './selectors';
import {bankAccountReducer} from './reducers';
import {BankAccountEffects} from './effects';
import {EffectsModule} from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({
      account: bankAccountReducer
    }, {}),
    EffectsModule.forRoot([BankAccountEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  exports: [StoreModule, EffectsModule],
  providers: [
    BankAccountSelectors
  ]
})
export class AppStoreModule {
}
