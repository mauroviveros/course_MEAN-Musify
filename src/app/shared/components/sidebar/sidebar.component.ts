import { Component } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { User } from '../../../modules/auth/interfaces/user';

interface NavItem{
  icon: string;
  text: string;
  router: string;
}

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public timestamp = new Date().getTime();
  public links: NavItem[] = [
    { icon: "search", text: "Buscar", router: "/search" },
    { icon: "star_border", text: "Artistas", router: "/artist" }
  ];

  public user: User = this._auth.user;

  public get imgProfileURL (){
    return `${this._auth.imgProfileURL()}?${this.timestamp}`;
  }

  constructor(
    private _auth: AuthService
  ){
    this._auth.user$.subscribe((user) => {
      this.user = user;
      this.timestamp = new Date().getTime();
    });
  };

  logout(){
    this._auth.logout();
  }

}
