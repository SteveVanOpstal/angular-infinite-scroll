import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {infiniteScrollContainerDirective} from 'angular-infinite-scroll/infinite-scroll-container.directive';

import {InfiniteScrollComponent, InfiniteStaticMarker, InfiniteTemplateMarker} from './infinite-scroll.component';
import {InfiniteScrollDirective} from './infinite-scroll.directive';

@NgModule({
  declarations:
      [InfiniteScrollDirective, InfiniteScrollComponent, infiniteScrollContainerDirective, InfiniteStaticMarker, InfiniteTemplateMarker],
  imports: [CommonModule, ScrollDispatchModule],
  exports:
      [InfiniteScrollDirective, InfiniteScrollComponent, infiniteScrollContainerDirective, InfiniteStaticMarker, InfiniteTemplateMarker]
})
export class InfiniteScrollModule {
}
