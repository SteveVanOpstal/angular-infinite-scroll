import {browser, by, element} from 'protractor';
import {combineLatest, from, interval, Observable, of} from 'rxjs';
import {map, mergeMap, take} from 'rxjs/operators';

export class TestPage {
  constructor(private _location: string) {
    this.setBrowserHeight(400);
  }

  navigateTo(startCount = 0, step = 1, offset = 0, delay = 0, endDelay = 0) {
    let location = this.addParam(this._location, 'startCount', startCount);
    location = this.addParam(location, 'step', step);
    location = this.addParam(location, 'offset', offset);
    location = this.addParam(location, 'delay', delay);
    location = this.addParam(location, 'endDelay', endDelay);
    return browser.get(location);
  }

  setBrowserHeight(height: number) {
    browser.driver.manage().window().setSize(400, height);
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

  expectedItemCount(offset: number) {
    return combineLatest(this.getViewportHeight(), this.getCardHeight())
        .pipe(map(([viewportHeight, height]) => Math.ceil((viewportHeight + offset) / height)))
        .toPromise();
  }

  ready(count = 0): Observable<boolean> {
    return interval(2000).pipe(take(1), mergeMap(() => from(this.getCards().count())), mergeMap((currentCount) => {
                                 if (count === currentCount) {
                                   return of(true);
                                 } else {
                                   return this.ready(currentCount);
                                 }
                               }));
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
