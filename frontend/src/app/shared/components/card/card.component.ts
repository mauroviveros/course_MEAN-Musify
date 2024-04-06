import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() circle = false;
  @Input() name = '';
  @Input() description = '';
}
