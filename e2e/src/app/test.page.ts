import {browser, by, element} from 'protractor';
import {combineLatest, from, interval, Observable, of} from 'rxjs';
import {map, mergeMap, take} from 'rxjs/operators';
import {DEFAULTS} from '../../../src/lib/defaults';

export class TestPage {
  private _offset = DEFAULTS.OFFSET;
  private _step = DEFAULTS.STEP;

  constructor(private _location: string) {
    this.setBrowserHeight(400);
  }

  set startCount(startCount: number) {
    this._location = this.addParam(this._location, 'startCount', startCount);
  }

  set resetCount(resetCount: number) {
    this._location = this.addParam(this._location, 'resetCount', resetCount);
  }

  set position(position: number) {
    this._location = this.addParam(this._location, 'position', position);
  }

  set step(step: number) {
    this._step = step;
    this._location = this.addParam(this._location, 'step', step);
  }

  set offset(offset: number) {
    this._offset = offset;
    this._location = this.addParam(this._location, 'offset', offset);
  }

  set delay(delay: number) {
    this._location = this.addParam(this._location, 'delay', delay);
  }

  set endDelay(endDelay: number) {
    this._location = this.addParam(this._location, 'endDelay', endDelay);
  }

  set endIterations(endIterations: number) {
    this._location = this.addParam(this._location, 'endIterations', endIterations);
  }

  navigateTo() {
    return browser.get(this._location);
  }


  setBrowserHeight(height: number) {
    browser.driver.manage().window().setSize(1200, height);
  }

  getCards() {
    return element.all(by.css('e2e-card'));
  }

  getCardHeight() {
    return from(this.getCards().first().getSize()).pipe(map((size) => size.height));
  }

  getViewportHeight() {
    return from(browser.driver.executeScript('return document.documentElement.clientHeight'))
        .pipe(map((result) => parseInt(<string>result, 10)));
  }

  /**
   * Calculates how many items a full page/container should contain.
   * Takes into account `offset` and `step`.
   */
  full() {
    return combineLatest(this.getViewportHeight(), this.getCardHeight())
        .pipe(map(([viewportHeight, height]) => Math.ceil(((viewportHeight + this._offset + 1) / height) / this._step) * this._step))
        .toPromise();
  }

  ready(count = 0): Observable<boolean> {
    return interval(2000).pipe(
        take(1), mergeMap(() => from(this.getCards().count())),
        mergeMap((currentCount) => count === currentCount ? of(true) : this.ready(currentCount)));
  }

  private addParam(location: string, param: string, value: number) {
    if (value === undefined || value === null) {
      return;
    }
    if (location.indexOf('?') === -1) {
      location += '?';
    } else {
      location += '&';
    }
    return location + param + '=' + value;
  }
}
