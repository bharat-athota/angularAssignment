// app.store.module.ts

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { HttpClientModule } from '@angular/common/http';
import { TagsService } from '../services/tags.service';
import { appReducer } from './app.reducers';

@NgModule({
  imports: [
    HttpClientModule,
    StoreModule.forRoot({ app: appReducer }),
    EffectsModule.forRoot([AppEffects]),
  ],
  providers: [TagsService],
})
export class AppStoreModule {}