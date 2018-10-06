import {Component, Input} from '@angular/core';

@Component({
  selector: 'docs-example',
  styleUrls: ['./example.component.scss'],
  template: `
    <div class="header">
      <p class="title">{{ example | titlecase }} example</p>
      <mat-button-toggle-group class="type" value="source" (change)="mode($event)">
        <mat-button-toggle value="source">
          <mat-icon>code</mat-icon>
        </mat-button-toggle>
        <mat-button-toggle value="blitz">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 130" height="16">
            <path fill-opacity=".2" d="M110.8 17.3l-14.6 36h36l-34 37-34 35 9.7-25 10.3-25h-36l15.7-18 36.5-39 14.8-16c1.2 4.7-2.6 10.6-4.4 15z"/>
            <path fill-opacity=".4" d="M60.3 30.3c-1.8 3.2-10.8 11.8-14 15l-12 12.2c-1.5 1.7-3.8 4.3-3.7 6.8.1 3.3 6.3 8.7 8.6 11l11 11 9 8c2.3 2.5 6 6.6 6.7 10 .8 4.8-4.4 15.6-6.7 20l-45-42.8C10.6 78 .2 69.7.3 64.3c0-3.8 10.4-13.6 13.4-17L61.3.3a66 66 0 0 1-1 30zm80-10l26 26c3.1 3.3 13.5 13.7 13.5 18 0 4.2-10.4 14.5-13.7 18l-32.8 32.2c-5 4.6-9.5 9.8-15 13.8 0-7.8-1.8-26.3 2.4-32l20.6-20.7c2.7-2.5 8.7-7.2 8.6-11.3 0-5-10-13-13.7-16.2l-15-14.7c-2.6-2.6-5.9-5.4-6.7-9.2-1.2-5.8 4.4-16.4 7.7-21 6 4.2 12.7 11.7 18 17z"/>
          </svg>
        </mat-button-toggle>
      </mat-button-toggle-group>
    </div>
    <mat-card class="card">
      <docs-source [example]="example" [hidden]="blitz"></docs-source>
      <docs-blitz [example]="example" *ngIf="blitz_initial" [hidden]="!blitz"></docs-blitz>
    </mat-card>`
})
export class ExampleComponent {
  @Input() example = 'basic';
  blitz = false;
  blitz_initial = false;

  mode(event) {
    this.blitz = event.value === 'blitz';
    if (this.blitz) {
      this.blitz_initial = true;
    }
  }
}