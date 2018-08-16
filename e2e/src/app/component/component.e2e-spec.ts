import {browser} from 'protractor';

import {TestSpecs} from '../test.specs';

import {ComponentPage} from './component.e2e-page';

describe('Infinite', () => {
  let page: ComponentPage;

  beforeEach(() => {
    page = new ComponentPage();
  });

  TestSpecs.testFillsPage(page);

  TestSpecs.testStepZero(page);
});
