import {Component} from '@angular/core';

@Component({
  selector: 'docs-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <infinite-scroll [step]="1" [delay]="200" [offset]="20">
      <docs-header *infiniteStatic></docs-header>
      <docs-intro *infiniteStatic></docs-intro>
      <!--<docs-embed *infiniteStatic></docs-embed>-->
      <docs-example *infiniteStatic example="directive">
        <router-outlet name="directive"></router-outlet>
      </docs-example>
    </infinite-scroll>`
})
export class AppComponent {
}
