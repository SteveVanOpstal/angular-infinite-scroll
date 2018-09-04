import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-card *infiniteScroll="let card of cards; end: end" [card]="card"></app-card>`
})
export class AppComponent {
  cards;

  constructor(private http: HttpClient) {}

  end = (position: number, step: number): Observable<any> => {
    return this.http.get(`https://localhost:4200/backend/card?begin=${position}&end=${position + step - 1}`);
  }
}
