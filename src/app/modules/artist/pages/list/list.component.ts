import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ArtistService } from '../../artist.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public get isAdmin(): boolean{
    return this.auth.hasAdminRole();
  }

  constructor(
    private auth: AuthService,
    private artistService: ArtistService
  ){
    this.artistService.getList().subscribe(response => {
      console.log(response);
    })
  }
}
