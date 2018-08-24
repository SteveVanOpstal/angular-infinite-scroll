import 'jasmine';

import {browser} from 'protractor';
import {of} from 'rxjs';

import {TestPage} from './test.page';

export class TestSpecs {
  static testFillsPage(page: TestPage) {
    it('should fill the page with items', () => {
      page.startCount = 3;
      page.step = 1;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(page.expectedItemCount()));
    });
  }

  static testStepZero(page: TestPage) {
    it('should not show any items when step is zero', () => {
      page.step = 0;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(of(0).toPromise()));
    });
  }

  static testStepFive(page: TestPage) {
    it('should show multitudes of five when step is five', () => {
      page.step = 5;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(page.expectedItemCount(5)));
    });
  }

  static testInitialPosition(page: TestPage) {
    it('should show initial items at the initial position', () => {
      page.startCount = 3;
      page.position = 3;
      page.step = 0;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(of(3).toPromise()));
    });
  }

  static testEndOnce(page: TestPage) {
    it('should show one item when `end` runs once', () => {
      page.step = 1;
      page.endIterations = 1;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(of(1).toPromise()));
    });
  }

  static testOffset(page: TestPage) {
    it('should be able to handle offset', () => {
      page.step = 1;
      page.offset = 100;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(page.expectedItemCount()));
    });
  }

  static testNegativeOffset(page: TestPage) {
    it('should be able to handle negative offset', () => {
      page.step = 1;
      page.offset = -100;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(page.expectedItemCount()));
    });
  }

  static testResetStatic(page: TestPage) {
    it('should show the reseted items', () => {
      page.step = 0;
      page.position = 5;
      page.startCount = 5;
      page.resetCount = 3;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(of(3).toPromise()));
    });
  }

  static testResetDynamic(page: TestPage) {
    it('should fill page after a reset', () => {
      page.step = 1;
      page.startCount = 5;
      page.resetCount = 3;
      page.navigateTo();
      browser.wait(() => page.ready().toPromise()).then(() => expect(page.getCards().count()).toEqual(page.expectedItemCount()));
    });
  }
}
