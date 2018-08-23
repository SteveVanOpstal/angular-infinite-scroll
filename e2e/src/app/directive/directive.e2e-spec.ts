import {TestSpecs} from '../test.specs';

import {DirectivePage} from './directive.e2e-page';

describe('Directive', () => {
  let page = new DirectivePage();

  TestSpecs.testFillsPage(page);
  TestSpecs.testStepZero(page);
  TestSpecs.testInitialPosition(page);
  TestSpecs.testEndOnce(page);
  TestSpecs.testOffset(page);
  TestSpecs.testNegativeOffset(page);
});
