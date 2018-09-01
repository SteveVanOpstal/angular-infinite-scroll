import {ScrollDispatcher} from '@angular/cdk/scrolling';
import {NgForOfContext} from '@angular/common';
import {Directive, ElementRef, Input, IterableDiffers, NgIterable, OnDestroy, OnInit} from '@angular/core';
import {NgZone, TemplateRef, TrackByFunction, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';

import {DEFAULTS} from './defaults';
import {InfiniteScroll} from './infinite-scroll';

@Directive({selector: '[infiniteScroll]'})
export class InfiniteScrollDirective<T> extends InfiniteScroll<T> implements OnInit, OnDestroy {
  private _items: Array<T>;
  private _positionInitial = DEFAULTS.POSITION;

  private _dummies = 0;
  private _outOfItems = false;

  constructor(
      viewContainer: ViewContainerRef, templateRef: TemplateRef<NgForOfContext<T>>, differs: IterableDiffers, zone: NgZone,
      elementRef: ElementRef, scrollDispatcher: ScrollDispatcher) {
    super(differs, zone, elementRef, scrollDispatcher);
    this.createNgFor(viewContainer, templateRef);
  }

  @Input()
  set infiniteScrollOf(infiniteScrollOf: NgIterable<T>) {
    if (infiniteScrollOf) {
      this._items = Array.from(infiniteScrollOf);
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
    if (!this._items) {
      this._items = [];
    }

    if (this._items && (!this._items.length || this._items.every((item) => item === undefined))) {
      this._items = [];
      this.addDummies();
      this.updateItems();
    }

    if (this.position < this._items.length - this._dummies) {
      this.loading$.next(true);
      this.updateItems();
      this._updateAfterRender$.next();
      this.position += this.step;
    } else if (this._subscriptionEnd) {
      this.loading$.next(true);
      this._end$.next();
      this.position += this.step;
      this.addDummies();
      this.updateItems();
    }
  }

  protected newItems(newItems: NgIterable<T>) {
    while (this._dummies > 0) {
      if (this._items.length) {
        this._items.pop();
      }
      this._dummies--;
    }
    const newItemsArray = Array.from(newItems);
    this._items = this._items.concat(newItemsArray);
    this.updateItems();
    // only continue when newItems arrive
    if (newItemsArray.length) {
      this._updateAfterRender$.next();
    } else {
      this._outOfItems = true;
    }
  }


  private updateItems() {
    this.zone.run(() => {
      if (this._items) {
        // update ngForOf<T> directive
        this._ngFor.ngForOf = this._items.slice(0, this.position);
      }
    });
  }

  private addDummies() {
    if (!this._dummies && !this._outOfItems) {
      this._items = this._items.concat(Array(this.step).fill(undefined));
      this._dummies += this.step;
    }
  }
}
