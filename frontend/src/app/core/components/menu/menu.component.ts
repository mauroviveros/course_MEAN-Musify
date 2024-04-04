import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'core-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly routes = this.router.config
    .filter(({ data }) => data && data['menu'])
    .map(({ path, title, data }) => {
      return {
        path: path,
        title: title,
        icon: data?.['menu'].icon || 'dashboard',
      };
    });

  logout(): void {
    //TODO add loader on logout
    this.auth.logout();
  }
}
