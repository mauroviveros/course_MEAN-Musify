import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  imports: [SharedModule, AuthModule],
  declarations: [MenuComponent],
  exports: [MenuComponent],
})
export class CoreModule {}
