import {NgForOfContext} from '@angular/common';
import {Directive, Input, IterableDiffers, NgIterable, OnDestroy, OnInit} from '@angular/core';
import {NgZone, TemplateRef, TrackByFunction, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {DEFAULTS} from './defaults';
import {InfiniteScroll} from './infinite-scroll';

@Directive({selector: '[infiniteScroll]'})
export class InfiniteScrollDirective<T> extends InfiniteScroll<T> implements OnInit, OnDestroy {
  private _items: Array<T>;
  private _dummies = 0;
  private _position = DEFAULTS.POSITION;
  private _positionInitial = DEFAULTS.POSITION;

  constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<NgForOfContext<T>>, differs: IterableDiffers, zone: NgZone) {
    super(differs, zone);
    this.createNgFor(viewContainer, templateRef);
  }

  @Input()
  set infiniteScrollOf(infiniteScrollOf: NgIterable<T>) {
    if (infiniteScrollOf) {
      this._items = Array.from(infiniteScrollOf);
    }
    this._position = this._positionInitial;
    this._dummies = 0;
    this.updateItems();
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

  @Input('infiniteScrollPosition')
  set position(position) {
    if(position === undefined || position === null){
      this._position = DEFAULTS.POSITION;
    } else {
      this._position = position; 
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
    }

    if (this._position < this._items.length - this._dummies) {
      this.loading$.next(true);
      this.updateItems();
      this._updateAfterRender$.next();
      this._position += this.step;
    } else if (this._subscriptionEnd) {
      this.loading$.next(true);
      this._end$.next();
      this.addDummies();
      this.updateItems();
      this._position += this.step;
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
    }
  }


  private updateItems() {
    this.zone.run(() => {
      if (this._items) {
        // update ngForOf<T> directive
        this._ngFor.ngForOf = this._items.slice(0, this._position);
      }
    });
  }

  private addDummies() {
    this._items = this._items.concat(Array(this.step).fill(undefined));
    this._dummies += this.step;
  }
}
