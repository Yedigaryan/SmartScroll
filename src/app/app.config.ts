import {ApplicationConfig, isDevMode} from '@angular/core';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch} from '@angular/common/http';

import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';

import {SearchEffects, searchReducer} from './features/search/store';


export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      search: searchReducer,
    }),
    provideEffects(SearchEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    }),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ]
};
