import {Component, Input} from '@angular/core';

@Component({
  selector: 'docs-example',
  styleUrls: ['./example.component.scss'],
  template: `
    <div infiniteScrollContainer>
      <ng-content></ng-content>
    </div>`
})
export class ExampleComponent {
  @Input() example;
}