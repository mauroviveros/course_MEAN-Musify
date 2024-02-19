import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  exports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
