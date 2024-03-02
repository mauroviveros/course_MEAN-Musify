import { Component, inject, signal } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

import { SharedModule } from '@shared/shared.module';
import { CoreModule } from './core.module';
@Component({
  selector: 'app-core',
  standalone: true,
  imports: [CoreModule, SharedModule],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss',
})
export class CoreComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly mode = signal<MatDrawerMode>('over');

  constructor() {
    this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(
        takeUntilDestroyed(),
        map(result => (result.matches ? 'push' : 'side'))
      )
      .subscribe(mode => this.mode.set(mode));
  }
}
