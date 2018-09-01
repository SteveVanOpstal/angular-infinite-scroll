import {TestSpecs} from '../test.specs';

import {ComponentPage} from './component.e2e-page';

describe('Component', () => {
  let page = new ComponentPage();

  TestSpecs.testFillsPage(page);
  TestSpecs.testStepZero(page);
  TestSpecs.testStepFive(page);
  TestSpecs.testInitialPosition(page);
  TestSpecs.testEndOnce(page);
  TestSpecs.testOffset(page);
  TestSpecs.testNegativeOffset(page);
  TestSpecs.testResetStatic(page);
  TestSpecs.testResetDynamic(page);
});
