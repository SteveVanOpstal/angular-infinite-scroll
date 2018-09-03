import {ScrollDispatcher} from '@angular/cdk/scrolling';
import {NgForOfContext} from '@angular/common';
import {Directive, ElementRef, Input, IterableDiffers, NgIterable, OnDestroy, OnInit} from '@angular/core';
import {NgZone, TemplateRef, TrackByFunction, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';

import {DEFAULTS} from './defaults';
import {InfiniteScroll} from './infinite-scroll';

@Directive({selector: '[infiniteScroll]'})
export class InfiniteScrollDirective<T> extends InfiniteScroll<T> implements OnInit, OnDestroy {
  constructor(
      viewContainer: ViewContainerRef, templateRef: TemplateRef<NgForOfContext<T>>, differs: IterableDiffers, zone: NgZone,
      elementRef: ElementRef, scrollDispatcher: ScrollDispatcher) {
    super(differs, zone, elementRef, scrollDispatcher);
    this.createNgFor(viewContainer, templateRef);
  }

  @Input()
  set infiniteScrollOf(infiniteScrollOf: NgIterable<T>) {
    if (infiniteScrollOf) {
      this.items = Array.from(infiniteScrollOf);
    }
    this.position = this._positionInitial;
    this._dummies = 0;
    this.updateItems();
    this.update();
  }
  @Input()
  set infiniteScrollTrackBy(fn: TrackByFunction<T>) {
    this._ngFor.ngForTrackBy = fn;
  }
  get infiniteScrollTrackBy(): TrackByFunction<T> {
    return this._ngFor.ngForTrackBy;
  }

  @Input()
  set infiniteScrollTemplate(value: TemplateRef<NgForOfContext<T>>) {
    this._ngFor.ngForTemplate = value;
  }

  @Input()
  set infiniteScrollPosition(position) {
    if (position === undefined || position === null) {
      this.position = DEFAULTS.POSITION;
    } else {
      this.position = position;
    }
    this._positionInitial = position;
  }
  @Input('infiniteScrollStep') step = DEFAULTS.STEP;
  @Input('infiniteScrollOffset') offset = DEFAULTS.OFFSET;
  @Input('infiniteScrollDelay') delay = DEFAULTS.DELAY;
  @Input()
  set infiniteScrollLoading(loading: (loading: boolean) => void) {
    this.subscribeLoading(loading);
  }
  @Input()
  set infiniteScrollEnd(scrollEnd: (position: number, interval: number) => Observable<NgIterable<T>>) {
    this.subscribeEnd(scrollEnd);
  }

  protected update() {
    if (!this.items) {
      this.items = [];
    }

    if (this.items && (!this.items.length || this.items.every((item) => item === undefined))) {
      this.items = [];
      this.addDummies();
      this.updateItems();
    }

    if (this.position < this.items.length - this._dummies) {
      this.loading$.next(true);
      this.updateItems();
      this._updateAfterRender$.next();
      this.position += this.step;
    } else if (this._subscriptionEnd) {
      this.loading$.next(true);
      this._end$.next({position: this.position, step: this.step});
      this.position += this.step;
      this.addDummies();
      this.updateItems();
    }
  }


  private updateItems() {
    this.zone.run(() => {
      if (this.items) {
        // update ngForOf<T> directive
        this._ngFor.ngForOf = this.items.slice(0, this.position);
      }
    });
  }
}
