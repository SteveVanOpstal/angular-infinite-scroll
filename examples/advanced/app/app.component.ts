import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';

@Component(
    {selector: 'app-root', styleUrls: ['app.component.css'], templateUrl: 'app.component.html'})
export class AppComponent {
  cards = [
    {image: 'https://picsum.photos/200/300/?image=1', title: 'card 1'},
    {image: 'https://picsum.photos/200/300/?image=2', title: 'card 2'},
    {image: 'https://picsum.photos/200/300/?image=3', title: 'card 3'}
  ];
  position = 3;
  step = 10;
  delay = 0;
  offset: 200;

  constructor(private http: HttpClient) {}

  end = (position: number, step: number): Observable<any> => {
    return this.http.get(`/backend/card?begin=${position}&end=${position + step - 1}`);
  }
}
