import {TestSpecs} from '../test.specs';

import {ContainerPage} from './container.e2e-page';

describe('Container', () => {
  let testSpecs = new TestSpecs();

  beforeEach(() => {
    testSpecs.page = new ContainerPage();
  });

  testSpecs.testFillsPage();
  testSpecs.testStepZero();
  testSpecs.testStepFive();
  testSpecs.testInitialPosition();
  testSpecs.testEndOnce();
  testSpecs.testOffset();
  // testSpecs.testNegativeOffset(); TODO: See #2
  testSpecs.testResetStatic();
  testSpecs.testResetDynamic();
});
