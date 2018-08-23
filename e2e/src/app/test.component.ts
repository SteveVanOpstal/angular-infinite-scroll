import {DoCheck, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {interval, Observable, of} from 'rxjs';
import {map, take} from 'rxjs/operators';

import {DEFAULTS} from '../../../src/lib/defaults';

import {StatusComponent} from './status.component';

export class TestComponent implements OnInit, DoCheck {
  cards;
  position = DEFAULTS.POSITION;
  step = DEFAULTS.STEP;
  offset = DEFAULTS.OFFSET;
  delay = DEFAULTS.DELAY;
  endDelay = 0;
  endIterationCount = 0;
  endIterations;


  doChecks = 0;
  loadingState = false;
  loadingCycles = 0;

  constructor(private _snackbar: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if (params['startCount']) {
      const startCount = parseInt(params['startCount'], 10);
      this.cards = new Array(startCount).fill(1).map((pos, index) => 'start' + (pos + index));
    }
    if (params['position']) {
      this.position = parseInt(params['position'], 10);
    }
    if (params['step']) {
      this.step = parseInt(params['step'], 10);
    }
    if (params['offset']) {
      this.offset = parseInt(params['offset'], 10);
    }
    if (params['delay']) {
      this.delay = parseInt(params['delay'], 10);
    }
    if (params['endDelay']) {
      this.endDelay = parseInt(params['endDelay'], 10);
    }
    if (params['endIterations']) {
      this.endIterations = parseInt(params['endIterations'], 10);
    }
    if (params['status']) {
      interval(500).subscribe(() => this.updateStatus());
    }
  }

  ngDoCheck() {
    this.doChecks++;
  }

  loading =
      (loading: boolean) => {
        this.loadingState = loading;
        if (!loading) {
          this.loadingCycles++;
        }
      }


  end = (position: number, step: number):
      Observable<Array<any>> => {
        if (this.endIterations !== undefined && this.endIterationCount >= this.endIterations) {
          return of([]);
        }
        this.endIterationCount++;
        return interval(this.endDelay).pipe(take(1), map(() => new Array(step).fill(position).map((pos, index) => pos + index + 1)));
      }

  private updateStatus() {
    this._snackbar.dismiss();
    this._snackbar.openFromComponent(StatusComponent, {data: this.status});
  }

  private get status() {
    return {loading: this.loadingState, loadingCycles: this.loadingCycles, doChecks: this.doChecks.toString()};
  }
}
