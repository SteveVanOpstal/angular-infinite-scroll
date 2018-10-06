import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {InfiniteScrollContainerDirective} from './infinite-scroll-container.directive';

import {InfiniteScrollComponent, InfiniteStaticMarker, InfiniteTemplateMarker} from './infinite-scroll.component';
import {InfiniteScrollDirective} from './infinite-scroll.directive';

@NgModule({
  declarations: [
    InfiniteScrollDirective, InfiniteScrollComponent, InfiniteScrollContainerDirective,
    InfiniteStaticMarker, InfiniteTemplateMarker
  ],
  imports: [CommonModule, ScrollDispatchModule],
  exports: [
    InfiniteScrollDirective, InfiniteScrollComponent, InfiniteScrollContainerDirective,
    InfiniteStaticMarker, InfiniteTemplateMarker
  ]
})
export class InfiniteScrollModule {
}
