import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/scrolling';
import {Directive, ElementRef, NgZone} from '@angular/core';

@Directive({selector: '[infiniteScrollContainer]'})
export class infiniteScrollContainerDirective extends CdkScrollable {
  constructor(_elementRef: ElementRef, _scroll: ScrollDispatcher, _ngZone: NgZone) {
    super(_elementRef, _scroll, _ngZone);
  }
}
