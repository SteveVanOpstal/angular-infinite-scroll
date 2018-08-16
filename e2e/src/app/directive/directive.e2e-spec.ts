import {TestSpecs} from '../test.specs';

import {DirectivePage} from './directive.e2e-page';

describe('Infinite', () => {
  let page: DirectivePage;

  beforeEach(() => {
    page = new DirectivePage();
  });

  TestSpecs.testFillsPage(page);

  TestSpecs.testStepZero(page);
});
