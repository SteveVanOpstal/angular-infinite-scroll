import {Component, Input} from '@angular/core';

@Component({
  selector: 'e2e-card',
  styleUrls: ['./card.component.scss'],
  template: `
    <p *ngIf="card">{{ card }}</p>
    <mat-progress-spinner mode="indeterminate" diameter="26" *ngIf="!card"></mat-progress-spinner>`
})
export class CardComponent {
  @Input() card;
}
