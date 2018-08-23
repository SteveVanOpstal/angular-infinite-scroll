import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

import {TestComponent} from '../test.component';

@Component({
  template: `  
    <infinite-scroll [position]="position" [step]="step" [delay]="delay" [offset]="offset" [end]="end" [loading]="loading">
      <div *ngFor="let card of cards">
        <e2e-card [card]="'static ' + card" *infiniteStatic></e2e-card>
      </div>
      <ng-template infiniteTemplate let-card>
        <e2e-card [card]="card ? 'template ' + card : undefined"></e2e-card>
      </ng-template>
    </infinite-scroll>`
})
export class ComponentTestComponent extends TestComponent {
  constructor(snackbar: MatSnackBar, route: ActivatedRoute) {
    super(snackbar, route);
  }
}
