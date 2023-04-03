import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';


const components = [
  SidebarComponent
]

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
