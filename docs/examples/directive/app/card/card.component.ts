import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <img [attr.src]="card?.image" />
    <p>{{ card?.title }}</p>`
})
export class CardComponent {
  @Input() card;
}
