import {Component} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

import {TestComponent} from '../test.component';

@Component({
  template: `  
    <infinite-scroll [position]="position" [step]="step" [offset]="offset" [delay]="delay" [loading]="loading">
      <div *ngFor="let number of [1,2,3,4,5,6,7,8,9,10]">
        <e2e-card [card]="number" *infiniteStatic></e2e-card>
      </div>
      <e2e-card card="card-no-marker"></e2e-card>
      <ng-template infiniteStatic>
        <e2e-card card="template-marker|card-no-marker"></e2e-card>
        <e2e-card card="template-marker|card-no-marker"></e2e-card>
        <ng-template>
          <e2e-card card="template-marker|template-no-marker|card-no-marker"></e2e-card>
        </ng-template>
      </ng-template>
      <ng-template>
        <e2e-card card="template-no-marker|card-no-marker"></e2e-card>
        <e2e-card card="template-no-marker|card-marker" *infiniteStatic></e2e-card>
        <ng-template infiniteStatic>
          <e2e-card card="template-no-marker|template-marker|card-no-marker"></e2e-card>
        </ng-template>
      </ng-template>

      <p *infiniteTemplate>test</p>
    </infinite-scroll>`
})
export class ComponentTestComponent extends TestComponent {
  constructor(snackbar: MatSnackBar, route: ActivatedRoute) {
    super(snackbar, route);
  }
}
