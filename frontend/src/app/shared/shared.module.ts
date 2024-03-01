import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material/material.module';

import { ErrorPipe } from './pipes/error.pipe';
import { CounterPipe } from './pipes/counter.pipe';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [CounterPipe, ErrorPipe],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FooterComponent,
    CounterPipe,
    ErrorPipe,
  ],
})
export class SharedModule {}
