import {ScrollDispatcher} from '@angular/cdk/scrolling';
import {NgForOfContext} from '@angular/common';
import {NgForOf} from '@angular/common';
import {Directive, DoCheck, ElementRef, Input, IterableDiffers, NgIterable, OnDestroy, OnInit} from '@angular/core';
import {NgZone, TemplateRef, TrackByFunction, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';

import {DEFAULTS} from './defaults';
import {InfiniteScroll} from './infinite-scroll';

@Directive({selector: '[infiniteFor]'})
export class InfiniteScrollDirective<T> extends InfiniteScroll<T> implements OnInit, DoCheck,
                                                                             OnDestroy {
  private _ngFor;

  constructor(
      viewContainer: ViewContainerRef, templateRef: TemplateRef<NgForOfContext<T>>,
      differs: IterableDiffers, zone: NgZone, elementRef: ElementRef,
      scrollDispatcher: ScrollDispatcher) {
    super(zone, elementRef, scrollDispatcher);
    this._ngFor = new NgForOf<T>(viewContainer, templateRef, differs);
  }

  @Input()
  set infiniteForOf(infiniteForOf: NgIterable<T>) {
    if (infiniteForOf) {
      this.items = Array.from(infiniteForOf);
    }
    this.position = this._positionInitial;
    this._dummies = 0;
    this.updateItems();
    this.update();
  }
  @Input()
  set infiniteForTrackBy(fn: TrackByFunction<T>) {
    this._ngFor.ngForTrackBy = fn;
  }
  get infiniteForTrackBy(): TrackByFunction<T> {
    return this._ngFor.ngForTrackBy;
  }

  @Input()
  set infiniteForTemplate(value: TemplateRef<NgForOfContext<T>>) {
    this._ngFor.ngForTemplate = value;
  }

  @Input()
  set infiniteForPosition(position) {
    if (position === undefined || position === null) {
      this.position = DEFAULTS.POSITION;
    } else {
      this.position = position;
    }
    this._positionInitial = position;
  }
  @Input('infiniteForStep') step = DEFAULTS.STEP;
  @Input('infiniteForOffset') offset = DEFAULTS.OFFSET;
  @Input('infiniteForDelay') delay = DEFAULTS.DELAY;
  @Input()
  set infiniteForLoading(loading: (loading: boolean) => void) {
    this.subscribeLoading(loading);
  }
  @Input()
  set infiniteForEnd(scrollEnd: (position: number, interval: number) => Observable<NgIterable<T>>) {
    this.subscribeEnd(scrollEnd);
  }

  ngDoCheck() {
    if (this._ngFor) {
      this._ngFor.ngDoCheck();
    }
  }

  protected update() {
    if (!this.items) {
      this.items = [];
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
    }
  }

  protected updateItems() {
    this.zone.run(() => {
      if (this.items) {
        // update ngForOf<T> directive
        this._ngFor.ngForOf = this.items.slice(0, this.position);
      }
    });
  }
}
