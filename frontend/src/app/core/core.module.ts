import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  imports: [SharedModule, AuthModule],
})
export class CoreModule {}
