import {Component} from '@angular/core';
import {interval, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <app-card *infiniteScroll="let card of cards; end: end" [card]="card"></app-card>`
})
export class AppComponent {
  cards;

  end = (position: number, step: number): Observable<Array<any>> => {
    return interval(200).pipe(take(1), map(() => new Array(step).fill(position).map((pos, index) => pos + index + 1)));
  }
}
