import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDrawerMode } from '@angular/material/sidenav';
import { map } from 'rxjs';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CoreModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);
  readonly router = inject(Router);
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
