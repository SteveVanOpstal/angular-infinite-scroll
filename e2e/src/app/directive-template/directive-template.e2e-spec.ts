import {TestSpecs} from '../test.specs';

import {DirectiveTemplatePage} from './directive-template.e2e-page';

describe('Directive template', () => {
  let testSpecs = new TestSpecs();

  beforeEach(() => {
    testSpecs.page = new DirectiveTemplatePage();
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
