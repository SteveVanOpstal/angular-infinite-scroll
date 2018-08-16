import {NgForOfContext} from '@angular/common';
import {Directive, EventEmitter, Input, IterableDiffers, NgIterable, OnDestroy, OnInit, Output} from '@angular/core';
import {NgZone, TemplateRef, TrackByFunction, ViewContainerRef} from '@angular/core';
import {Observable} from 'rxjs';
import {DEFAULTS} from './defaults';
import {InfiniteScroll} from './infinite-scroll';

@Directive({selector: '[infiniteScroll]'})
export class InfiniteScrollDirective<T> extends InfiniteScroll<T> implements OnInit, OnDestroy {
  private _items: Array<T>;
  private _dummies = 0;

  constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<NgForOfContext<T>>, differs: IterableDiffers, zone: NgZone) {
    super(differs, zone);
    this.createNgFor(viewContainer, templateRef);
  }

  @Input()
  set infiniteScrollOf(infiniteScrollOf: NgIterable<T>) {
    if (infiniteScrollOf) {
      this._items = Array.from(infiniteScrollOf);
    }
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

  @Input('infiniteScrollPosition') position = DEFAULTS.POSITION;
  @Input('infiniteScrollStep') step = DEFAULTS.STEP;
  @Input('infiniteScrollOffset') offset = DEFAULTS.OFFSET;
  @Input('infiniteScrollDelay') delay = DEFAULTS.DELAY;
  @Output('infiniteScrollLoading') loading$ = new EventEmitter();
  @Input()
  set infiniteScrollEnd(scrollEnd: (position: number, interval: number) => Observable<NgIterable<T>>) {
    super.subscribeEnd(scrollEnd);
  }

  // ngDoCheck() {
  //   this._ngFor.ngDoCheck();
  // }

  // private update() {
  //   const scrollHeight = window.innerHeight + window.scrollY;
  //   if (scrollHeight >= document.body.offsetHeight - this.offset) {
  //     this.zone.runOutsideAngular(() => {
  //       this.updateDynamic();
  //     });
  //   }
  // }

  protected update() {
    if (!this._items) {
      this._items = [];
    }

    if (this._items && (!this._items.length || this._items.every((item) => item === undefined))) {
      this._items = [];
      this.addDummies();
    }

    if (this.position < this._items.length - this._dummies) {
      this.loading$.emit(true);
      this.updateItems();
      this._updateAfterRender$.next();
      this.position += this.step;
    } else if (this._subscriptionEnd) {
      this.loading$.emit(true);
      this._end$.next();
      this._updateAfterRender$.next();
      this.addDummies();
      this.updateItems();
      this.position += this.step;
    }
  }

  protected newItems(newItems: NgIterable<T>) {
    while (this._dummies > 0) {
      if (this._items.length) {
        this._items.pop();
      }
      this._dummies--;
    }
    this._items = this._items.concat(Array.from(newItems));
    this.updateItems();
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
    this._items = this._items.concat(Array(this.step).fill(undefined));
    this._dummies += this.step;
  }
}
