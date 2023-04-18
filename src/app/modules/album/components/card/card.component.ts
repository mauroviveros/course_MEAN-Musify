import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from '../../album.interface';
import { AlbumService } from '../../album.service';

@Component({
  selector: 'album-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() album?: Album;
  @Output() onDeleted = new EventEmitter<Album>();

  public get img(){
     return (this.album?._id ? this.albumService.getImg(this.album._id) : null)
  }

  constructor(
    private albumService: AlbumService
  ){}

  public remove(){
    if(!this.album) return;
    this.albumService.remove(this.album).subscribe(_ => {
      this.onDeleted.emit(this.album);
    })
  }
}
