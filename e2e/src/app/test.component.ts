import {DoCheck, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {interval, Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

export class TestComponent implements OnInit, DoCheck {
  cards;
  doChecks = 0;
  position = 0;
  step = 1;
  offset = 100;
  delay = 0;
  endDelay = 200;

  constructor(private _snackbar: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if (params['startCount']) {
      const startCount = parseInt(params['startCount'], 10);
      this.cards = new Array(startCount).fill(1).map((pos, index) => 'start' + (pos + index));
      this.position = startCount;
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
  }

  ngDoCheck() {
    this.doChecks++;
    // this._snackbar.open(this.doChecks.toString());
  }

  loading =
      (loading: boolean) => {
        if (loading) {
          this._snackbar.open('loading');
        } else {
          this._snackbar.dismiss();
        }
      }

  end = (position: number, step: number): Observable<Array<any>> => {
    return interval(this.endDelay).pipe(take(1), map(() => new Array(step).fill(position).map((pos, index) => pos + index + 1)));
  }
}
