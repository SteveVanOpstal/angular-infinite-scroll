import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {InfiniteScrollComponent, InfiniteStaticMarker, InfiniteTemplateMarker} from './infinite-scroll.component';
import {InfiniteScrollDirective} from './infinite-scroll.directive';

@NgModule({
  declarations: [InfiniteScrollDirective, InfiniteScrollComponent, InfiniteStaticMarker, InfiniteTemplateMarker],
  imports: [CommonModule],
  exports: [InfiniteScrollDirective, InfiniteScrollComponent, InfiniteStaticMarker, InfiniteTemplateMarker]
})
export class InfiniteScrollModule {
}
