import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistService } from '../../artist.service';
import { Artist, ArtistRequest } from '../../artist.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  public artist?: Artist;

  constructor(
    private route: ActivatedRoute,
    private artistService: ArtistService
  ){

    this.artistService.get(this.route.snapshot.paramMap.get("_id") as string).subscribe(response => {
      this.artist = response;
    });
  }

  public submitData(data: ArtistRequest){
    console.log(data);
  }
}
