import { Component, inject } from '@angular/core';
import { Route, Router } from '@angular/router';
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
    .reduce((routes: Route[], route) => {
      routes.push(route);
      if(route.children){
        routes.push(...route.children.map(origin => {
          const children = { ...origin };
          children.path = [route.path, children.path].join("/");
          return children;
        }));
      }

      return routes;
    }, [])
    .filter(({ data }) => data && data['menu'])
    .map(({ path, title, data }) => {
      return {
        path: `/${path}`,
        title: title,
        icon: data?.['menu'].icon || 'dashboard',
      };
    });
    // }).forEach(route => console.log(route));

  logout(): void {
    //TODO add loader on logout
    this.auth.logout();
  }
}
