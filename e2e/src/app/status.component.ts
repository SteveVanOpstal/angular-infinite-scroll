import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  template: `
    <p>loading: <span id="loading">{{ data.loading }}</span></p>
    <p>loadingCycles: <span id="loadingCycles">{{ data.loadingCycles }}</span></p>
    <p>doChecks: <span id="doChecks">{{ data.doChecks }}</span></p>
  `,
})
export class StatusComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}