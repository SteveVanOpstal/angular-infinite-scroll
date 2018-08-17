import 'jasmine';

import {browser} from 'protractor';
import {of} from 'rxjs';

import {TestPage} from './test.page';

export class TestSpecs {
  static testFillsPage(page: TestPage) {
    it('should fill the page with items', () => {
      page.navigateTo(0, 1);
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(page.expectedItemCount()));
    });
  }

  static testStepZero(page: TestPage) {
    it('should not show any items when step is zero', () => {
      page.navigateTo(0, 0);
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(of(0).toPromise()));
    });
  }
}