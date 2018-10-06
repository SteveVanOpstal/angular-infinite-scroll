import {Component} from '@angular/core';

@Component({
  selector: 'docs-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <infinite-scroll [step]="1" [delay]="200" [offset]="200">
      <!--<docs-header *infiniteStatic></docs-header>
      <docs-intro *infiniteStatic></docs-intro>-->
      <docs-example *infiniteStatic example="basic"></docs-example>
      <docs-example *infiniteStatic example="advanced"></docs-example>
    </infinite-scroll>`
})
export class AppComponent {
}
