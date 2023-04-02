import { Component } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/auth/interfaces/user';

@Component({
  selector: 'musify-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public user: User = this._auth.user;
  constructor(
    private _auth: AuthService
  ){}

  logout(){
    this._auth.logout();
  }
}
