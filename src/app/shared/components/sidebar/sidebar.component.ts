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
  public links: NavItem[] = [
    { icon: "search", text: "Buscar", router: "" },
    { icon: "star_border", text: "Artistas", router: "" },
    { icon: "book", text: "Albums", router: "" }
  ];

  public user: User = this._auth.user;

  public get imgProfileURL (){
    return this._auth.imgProfileURL();
  }

  constructor(
    private _auth: AuthService
  ){};

  logout(){
    this._auth.logout();
  }

}
