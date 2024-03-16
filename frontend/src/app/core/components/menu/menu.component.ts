import { Component, inject } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'core-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  private readonly auth = inject(AuthService);

  logout(): void {
    //TODO add loader on logout
    this.auth.logout();
  }
}
