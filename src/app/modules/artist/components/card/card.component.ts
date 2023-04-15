import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Artist } from '../../artist.interface';
import { ArtistService } from '../../artist.service';

@Component({
  selector: 'artist-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() artist?: Artist;
  @Output() onDeleted = new EventEmitter<Artist>();

  public get img(){
     return (this.artist?._id ? this.artistService.getImg(this.artist._id) : null)
  }

  constructor(
    private artistService: ArtistService
  ){}

  public remove(){
    if(!this.artist) return;
    this.artistService.remove(this.artist).subscribe(_ => {
      this.onDeleted.emit(this.artist);
    })
  }
}
