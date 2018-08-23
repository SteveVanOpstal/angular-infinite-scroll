import {NgForOf, NgForOfContext} from '@angular/common';
import {DoCheck, IterableDiffers, NgIterable, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, interval, merge, Observable, Subject, Subscription} from 'rxjs';
import {exhaustMap, switchMap, take} from 'rxjs/operators';

import {DEFAULTS} from './defaults';

export abstract class InfiniteScroll<T> implements OnInit, DoCheck, OnDestroy {
  private _subscriptionLoading: Subscription;
  private _subscriptionLoadingEnd: Subscription;
  private _userEnd$ = new Observable<NgIterable<T>>();

  protected _subscriptionEnd: Subscription;
  protected _subscriptionUpdateAfterRender: Subscription;

  protected _end$ = new Subject<NgIterable<T>>();
  protected _updateAfterRender$ = new Subject<any>();

  protected _ngFor;

  constructor(private _differs: IterableDiffers, public zone: NgZone) {
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
    this._subscriptionLoadingEnd = merge(this._userEnd$, this._updateAfterRender$).subscribe(() => this.loading$.next(false));
    this._subscriptionUpdateAfterRender =
        this._updateAfterRender$.pipe(switchMap(() => interval(this.delay).pipe(take(1)))).subscribe(() => this._update());

    this._update();
  }

  ngDoCheck() {
    if (this._ngFor) {
      this._ngFor.ngDoCheck();
    }
  }

  ngOnDestroy() {
    this.destroy(this._subscriptionEnd);
    this.destroy(this._subscriptionLoading);
    this.destroy(this._subscriptionLoadingEnd);
    this.destroy(this._subscriptionUpdateAfterRender);
  }

  protected createNgFor(viewContainer: ViewContainerRef, template: TemplateRef<NgForOfContext<T>>) {
    this._ngFor = new NgForOf<T>(viewContainer, template, this._differs);
  }

  protected subscribeLoading(loading: (loading: boolean) => void) {
    this.destroy(this._subscriptionLoading);
    this._subscriptionLoading = this.loading$.subscribe(loading);
  }

  protected subscribeEnd(scrollEnd: (position: number, interval: number) => Observable<NgIterable<T>>) {
    this.destroy(this._subscriptionEnd);
    this._userEnd$ = this._end$.pipe(exhaustMap(() => scrollEnd(this.position, this.step)));
    this._subscriptionEnd = this._userEnd$.subscribe(this.newItems.bind(this), () => this.newItems.bind(this)([]));
  }

  private _update() {
    const scrollHeight = window.innerHeight + window.scrollY;
    if (scrollHeight >= document.body.offsetHeight - this.offset) {
      this.zone.runOutsideAngular(() => {
        this.update();
      });
    }
  }

  private destroy(subscription: Subscription) {
    if (subscription && !subscription.closed) {
      subscription.unsubscribe();
    }
  }

  protected abstract update();

  protected abstract newItems(newItems: NgIterable<T>);
}
