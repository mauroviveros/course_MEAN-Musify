import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public get isAdmin(): boolean{
    return this._auth.hasAdminRole();
  }

  constructor(
    private _auth: AuthService
  ){}
}
