import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './modules/material/material.module';

import { ErrorPipe } from './pipes/error.pipe';
import { CounterPipe } from './pipes/counter.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [FooterComponent, CardComponent],
  imports: [CommonModule, MaterialModule, CounterPipe, ErrorPipe],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    CounterPipe,
    ErrorPipe,
    FooterComponent,
    CardComponent,
  ],
})
export class SharedModule {}
