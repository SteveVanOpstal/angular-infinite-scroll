import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {DocViewerComponent} from './doc-viewer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DocViewerComponent],
  exports: [DocViewerComponent],
})
export class DocViewerModule {
}
