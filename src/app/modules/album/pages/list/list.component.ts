import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { AlbumService } from '../../album.service';
import { Album, AlbumList } from '../../album.interface';

@Component({
  selector: 'album-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public listData: AlbumList = {} as AlbumList;

  public get pages(): number[]{ return Array(this.listData.totalPages).fill(null).map((x, i) => i + 1); }
  public get isAdmin(): boolean{ return this.auth.hasAdminRole(); }

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService
  ){
    const artist = this.route.snapshot.paramMap.get("_id");
    if(!artist) this.router.navigate(["/artist"]);
    else{
      this.albumService.getList(artist, 1, true).subscribe(listData => {
        this.listData = listData;
      });
    }
  }

  public onDeleted(album: Album){
    this.listData.docs.splice(this.listData.docs.indexOf(album), 1);
    if(this.listData.docs.length || !this.listData.hasPrevPage) return;
    this.router.navigate([], { queryParams: { page: this.listData.prevPage } });
  }
}
