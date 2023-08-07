import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class CoreModule {}
