import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

import {TestComponent} from '../test.component';

@Component({
  styles: ['div { overflow-y: scroll; height: 300px }'],
  template: `
    <div infiniteContainer>
      <e2e-card *infiniteFor="let card of cards; position: position; step: step; delay: delay; offset: offset; end: end; loading: loading"
                [card]="card">
      </e2e-card>
    </div>`
})
export class ContainerTestComponent extends TestComponent {
  constructor(snackbar: MatSnackBar, route: ActivatedRoute) {
    super(snackbar, route);
  }
}
