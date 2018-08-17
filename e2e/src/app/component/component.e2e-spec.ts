import {TestSpecs} from '../test.specs';

import {ComponentPage} from './component.e2e-page';

describe('Component', () => {
  let page = new ComponentPage();

  TestSpecs.testFillsPage(page);

  TestSpecs.testStepZero(page);
});
