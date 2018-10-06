import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';
import {Directive, ElementRef, NgZone} from '@angular/core';

@Directive({selector: '[infiniteContainer]'})
export class InfiniteScrollContainerDirective extends CdkScrollable {
  constructor(elementRef: ElementRef, scroll: ScrollDispatcher, ngZone: NgZone) {
    super(elementRef, scroll, ngZone);
  }
}
