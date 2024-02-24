import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material/material.module';

import { ErrorPipe } from './pipes/error.pipe';

@NgModule({
  imports: [ErrorPipe],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule, ErrorPipe],
})
export class SharedModule {}
