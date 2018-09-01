import 'jasmine';

import {browser} from 'protractor';
import {of} from 'rxjs';

import {TestPage} from './test.page';

export class TestSpecs {
  public page = new TestPage('');

  testFillsPage() {
    it('should fill the page/container with items', () => {
      this.page.startCount = 3;
      this.page.step = 1;
      this.page.navigateTo();
      this._expect(this.page.full());
    });
  }

  testStepZero() {
    it('should not show any items when step is zero', () => {
      this.page.step = 0;
      this.page.navigateTo();
      this._expect(0);
    });
  }

  testStepFive() {
    it('should show multitudes of five when step is five', () => {
      this.page.step = 5;
      this.page.navigateTo();
      this._expect(this.page.full());
    });
  }

  testInitialPosition() {
    it('should show initial items at the initial position', () => {
      this.page.startCount = 3;
      this.page.position = 3;
      this.page.step = 0;
      this.page.navigateTo();
      this._expect(3);
    });
  }

  testEndOnce() {
    it('should show one item when `end` runs once', () => {
      this.page.step = 1;
      this.page.endIterations = 1;
      this.page.navigateTo();
      this._expect(1);
    });
  }

  testOffset() {
    it('should be able to handle offset', () => {
      this.page.step = 1;
      this.page.offset = 100;
      this.page.navigateTo();
      this._expect(this.page.full());
    });
  }

  testNegativeOffset() {
    it('should be able to handle negative offset', () => {
      this.page.step = 1;
      this.page.offset = -100;
      this.page.navigateTo();
      this._expect(this.page.full());
    });
  }

  testResetStatic() {
    it('should show the reseted items', () => {
      this.page.step = 0;
      this.page.position = 5;
      this.page.startCount = 5;
      this.page.resetCount = 3;
      this.page.navigateTo();
      this._expect(3);
    });
  }

  testResetDynamic() {
    it('should fill the page/container after a reset', () => {
      this.page.step = 1;
      this.page.startCount = 5;
      this.page.resetCount = 3;
      this.page.navigateTo();
      this._expect(this.page.full());
    });
  }

  private _expect(count: number|Promise<number>) {
    if (typeof count === 'number') {
      count = of(count).toPromise();
    }
    browser.wait(() => this.page.ready().toPromise()).then(() => expect(this.page.getCards().count()).toEqual(count));
  }
}
