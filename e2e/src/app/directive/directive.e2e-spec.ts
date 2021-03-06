import {TestSpecs} from '../test.specs';

import {DirectivePage} from './directive.e2e-page';

describe('Directive', () => {
  let testSpecs = new TestSpecs();

  beforeEach(() => {
    testSpecs.page = new DirectivePage();
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
