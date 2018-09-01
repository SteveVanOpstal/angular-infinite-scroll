import {TestSpecs} from '../test.specs';

import {ComponentPage} from './component.e2e-page';

describe('Component', () => {
  let testSpecs = new TestSpecs();

  beforeEach(() => {
    testSpecs.page = new ComponentPage();
  });

  testSpecs.testFillsPage();
  testSpecs.testStepZero();
  testSpecs.testStepFive();
  testSpecs.testInitialPosition();
  testSpecs.testEndOnce();
  testSpecs.testOffset();
  testSpecs.testNegativeOffset();
  testSpecs.testResetStatic();
  testSpecs.testResetDynamic();
});
