import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { ArtistService } from '../../artist.service';
import { Artist, ArtistList } from '../../artist.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'artist-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public listData: ArtistList = {} as ArtistList;

  public get pages(): number[]{ return Array(this.listData.totalPages).fill(null).map((x, i) => i + 1); }
  public get isAdmin(): boolean{ return this.auth.hasAdminRole(); }

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService
  ){
    this.route.queryParamMap.pipe(
      map(query => parseInt(query.get("page") || "1")),
      switchMap(page => this.artistService.getList(page))
    ).subscribe(listData => {
      this.listData = listData;
    });
  }

  public onDeleted(artist: Artist){
    this.listData.docs.splice(this.listData.docs.indexOf(artist), 1);
    if(this.listData.docs.length || !this.listData.hasPrevPage) return;
    this.router.navigate([], { queryParams: { page: this.listData.prevPage } });
  }
}
