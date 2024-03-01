import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly copyright = {
    link: 'https://github.com/mauroviveros',
    label: 'Mauro Daniel Viveros',
  };
}
