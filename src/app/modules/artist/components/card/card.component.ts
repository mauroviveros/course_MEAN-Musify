import { Component, Input } from '@angular/core';
import { Artist } from '../../artist.interface';
import { ArtistService } from '../../artist.service';

@Component({
  selector: 'artist-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() artist?: Artist;

  public get img(){
     return (this.artist?._id ? this.artistService.getImg(this.artist._id) : null)
  }

  constructor(
    private artistService: ArtistService
  ){}

  public remove(){
    if(!this.artist) return;
    // this.artistService.delete(this.artist._id).subscribe(_ => {

    // })
  }
}
