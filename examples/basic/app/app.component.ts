import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Observable} from 'rxjs';

@Component(
    {selector: 'app-root', styleUrls: ['app.component.css'], templateUrl: 'app.component.html'})
export class AppComponent {
  cards;

  constructor(private http: HttpClient) {}

  end = (): Observable<any> => {
    return this.http.get(`/backend/card`);
  }
}
