import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

import {TestComponent} from '../test.component';

@Component({
  template: `
    <ng-template infiniteFor let-card [infiniteForOf]="cards"
                [infiniteForPosition]="position"
                [infiniteForStep]="step"
                [infiniteForOffset]="offset"
                [infiniteForEnd]="end"
                [infiniteForLoading]="loading">
      <e2e-card [card]="card"></e2e-card>
    </ng-template>`,
})
export class DirectiveTemplateTestComponent extends TestComponent {
  constructor(snackbar: MatSnackBar, route: ActivatedRoute) {
    super(snackbar, route);
  }
}
