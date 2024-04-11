import { Component } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-albums',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './albums.component.html',
  styleUrl: './albums.component.scss'
})
export class AlbumsComponent {

}
