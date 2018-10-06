import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/overlay';
import {ElementRef, NgIterable, NgZone, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, interval, merge, Observable, Subject, Subscription} from 'rxjs';
import {distinctUntilChanged, mergeMap, share, switchMap, take} from 'rxjs/operators';

import {DEFAULTS} from './defaults';

export abstract class InfiniteScroll<T> implements OnInit, OnDestroy {
  private _subscriptionScrolled: Subscription;
  private _subscriptionLoading: Subscription;
  private _subscriptionLoadingEnd: Subscription;
  private _userEnd$ = new Observable<NgIterable<T>>();

  items: Array<T>;

  protected _subscriptionEnd: Subscription;
  protected _subscriptionUpdateAfterRender: Subscription;

  protected _end$ = new Subject<{position: number, step: number}>();
  protected _updateAfterRender$ = new Subject<any>();

  protected _positionInitial = DEFAULTS.POSITION;
  protected _dummies = 0;

  constructor(
      public zone: NgZone, private _elementRef: ElementRef,
      private _scrollDispatcher: ScrollDispatcher) {
    zone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => this._update());
      window.addEventListener('resize', () => this._update());
    });
  }

  position = DEFAULTS.POSITION;
  step = DEFAULTS.STEP;
  offset = DEFAULTS.OFFSET;
  delay = DEFAULTS.DELAY;
  loading$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this._subscriptionLoadingEnd =
        merge(this._userEnd$, this._updateAfterRender$).subscribe(() => this.loading$.next(false));
    this._subscriptionUpdateAfterRender =
        this._updateAfterRender$.pipe(switchMap(() => interval(this.delay).pipe(take(1))))
            .subscribe(() => this._update());

    this._update();
  }

  ngOnDestroy() {
    this.destroy(this._subscriptionScrolled);
    this.destroy(this._subscriptionEnd);
    this.destroy(this._subscriptionLoading);
    this.destroy(this._subscriptionLoadingEnd);
    this.destroy(this._subscriptionUpdateAfterRender);
  }

  protected subscribeLoading(loading: (loading: boolean) => void) {
    this.destroy(this._subscriptionLoading);
    this._subscriptionLoading = this.loading$.subscribe(loading);
  }

  protected subscribeEnd(
      scrollEnd: (position: number, interval: number) => Observable<NgIterable<T>>) {
    this.destroy(this._subscriptionEnd);
    this._userEnd$ = this._end$.pipe(
        distinctUntilChanged((x, y) => x.position === y.position),
        mergeMap(({position, step}) => scrollEnd(position, step)), share());
    this._subscriptionEnd =
        this._userEnd$.subscribe(this._newItems.bind(this), () => this._newItems.bind(this)([]));
  }

  protected destroy(subscription: Subscription) {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }

  protected abstract update();

  protected abstract updateItems();

  protected addDummies() {
    if (!this._dummies) {
      this.items = this.items.concat(Array(this.step).fill(undefined));
      this._dummies += this.step;
    }
    this.updateItems();
  }

  protected removeDummies() {
    while (this._dummies > 0) {
      if (this.items.length) {
        this.items.pop();
      }
      this._dummies--;
    }
  }

  private _update(scrollContainer: CdkScrollable|void|undefined = undefined) {
    const container = this._ancestorScrollContainer();
    if (container && (!scrollContainer || scrollContainer === container)) {
      if (!this._subscriptionScrolled) {
        this._subscriptionScrolled = this._scrollDispatcher.ancestorScrolled(this._elementRef)
                                         .subscribe(this._update.bind(this));
      }
      const element = container.getElementRef().nativeElement;
      const scrollHeight = element.scrollHeight <= element.offsetHeight ? 0 : element.scrollHeight;
      this._updateWhenOffsetExceeded(element.offsetHeight + element.scrollTop, scrollHeight);
    } else {
      this._updateWhenOffsetExceeded(
          window.innerHeight + window.pageYOffset, document.body.offsetHeight);
    }
  }

  private _ancestorScrollContainer() {
    const containers = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);
    return containers ? containers[0] : undefined;
  }

  private _updateWhenOffsetExceeded(scrollPosition: number, offsetHeight: number) {
    if (scrollPosition >= offsetHeight - this.offset) {
      this.zone.runOutsideAngular(() => {
        this.update();
      });
    }
  }

  private _newItems(newItems: NgIterable<T>) {
    this.removeDummies();
    const newItemsArray = Array.from(newItems);
    this.items = this.items.concat(newItemsArray);
    this.updateItems();

    // prevent
    const container = this._ancestorScrollContainer();
    if (container) {
      const element = container.getElementRef().nativeElement;
      const beforeEndPoint = element.scrollHeight - element.offsetHeight - this.offset - 1;
      if (element.scrollTop > beforeEndPoint) {
        element.scrollTop = beforeEndPoint;
      }
    } else {
      const beforeEndPoint = document.body.offsetHeight - window.innerHeight - this.offset - 1;
      if (window.pageYOffset > beforeEndPoint) {
        window.scroll(window.pageXOffset, beforeEndPoint);
      }
    }

    // only continue when newItems arrive
    if (newItemsArray.length) {
      this._updateAfterRender$.next();
    }
  }
}
