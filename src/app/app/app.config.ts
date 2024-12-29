import {ApplicationConfig, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideRouterStore} from '@ngrx/router-store';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {mockDataReducer, searchReducer} from './features/search/store';
import {provideHttpClient, withFetch} from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideStore({
      search: searchReducer,
      mockData: mockDataReducer
    }),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode()
    }),
    provideHttpClient(withFetch()),
    provideRouterStore(),
    provideAnimationsAsync()]
};
