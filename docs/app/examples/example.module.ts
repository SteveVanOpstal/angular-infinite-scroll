import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {ExamplesModule} from 'angular-infinite-scroll-examples';

import {InfiniteScrollModule} from '../../../src/public_api';
import {DocViewerModule} from '../shared/doc-viewer/doc-viewer-module';

import {BlitzComponent} from './blitz/blitz.component';
import {ExampleComponent} from './example.component';
import {SourceComponent} from './source/source.component';

@NgModule({
  declarations: [ExampleComponent, BlitzComponent, SourceComponent],
  imports: [
    CommonModule, InfiniteScrollModule, HttpClientModule,
    PortalModule, MatTabsModule, MatCardModule, MatIconModule, MatButtonToggleModule,
    DocViewerModule, ExamplesModule
  ],
  exports: [ExampleComponent]
})
export class ExampleModule {
}
