import {Component} from '@angular/core';

@Component({
  selector: 'docs-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <infinite-scroll [step]="1" [delay]="200" [offset]="20">
      <docs-header *infiniteStatic></docs-header>
      <docs-intro *infiniteStatic></docs-intro>
      <docs-embed *infiniteStatic></docs-embed>
      <router-outlet *infiniteStatic></router-outlet>
    </infinite-scroll>`
})
export class AppComponent {
}
