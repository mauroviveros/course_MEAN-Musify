import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Artist } from 'src/app/modules/artist/artist.interface';
import { ArtistService } from 'src/app/modules/artist/artist.service';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'shared-update-img',
  templateUrl: './update-img.component.html',
  styleUrls: ['./update-img.component.scss']
})
export class UpdateImgComponent {
  @ViewChild("inputFile") inputFile: ElementRef = {} as ElementRef;
  @Input() public text?: string;
  @Input() public artist?: Artist;
  @Output() submitted = new EventEmitter<File>();
  public file?: File;
  public imageSrc?: string;

  public get imgProfileURL (){
    return this.imageSrc || (this.artist?._id ? this.artistService.getImg(this.artist._id) : null);
  }

  constructor(
    // private _formBuilder: FormBuilder,
    private artistService: ArtistService
  ){};


  openFile(){
    this.inputFile.nativeElement.click();
  };

  onFileSelected(event:any){
    this.file = event.target?.files[0];
    if(!this.file) return;
    const reader = new FileReader();

    reader.onload = (e: any) => { this.imageSrc = e.target.result; };
    reader.readAsDataURL(this.file);
  };

  updateIMG(){
    if(!this.file) return;
    this.submitted.emit(this.file);
  };

}
