import {Component, Input} from '@angular/core';
import {Chance} from 'chance';

const chance = new Chance();

@Component({
  selector: 'app-card',
  template: `
    <img src="https://picsum.photos/40/40/?random" />
    <p>{{ title }}</p>
    <p>{{ subTitle }}</p>`
})
export class CardComponent {
  @Input() card;
  title = chance.sentence({words: 2});
  subTitle = chance.sentence({words: 2});
}