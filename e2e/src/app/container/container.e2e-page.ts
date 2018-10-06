import {Observable, of} from 'rxjs';

import {TestPage} from '../test.page';

export class ContainerPage extends TestPage {
  constructor() {
    super('/container');
  }

  getViewportHeight(): Observable<number> {
    // fixed infiniteContainer height of 300px (ContainerTestComponent -> styles -> div)
    return of(300);
  }
}
