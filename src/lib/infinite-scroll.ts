import {CdkScrollable, ScrollDispatcher} from '@angular/cdk/overlay';
import {NgForOf, NgForOfContext} from '@angular/common';
import {DoCheck, ElementRef, IterableDiffers, NgIterable, NgZone, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, interval, merge, Observable, Subject, Subscription} from 'rxjs';
import {exhaustMap, switchMap, take} from 'rxjs/operators';

import {DEFAULTS} from './defaults';

export abstract class InfiniteScroll<T> implements OnInit, DoCheck, OnDestroy {
  private _subscriptionScrolled: Subscription;
  private _subscriptionLoading: Subscription;
  private _subscriptionLoadingEnd: Subscription;
  private _userEnd$ = new Observable<NgIterable<T>>();
  private _scrollContainers: CdkScrollable[] = undefined;

  protected _subscriptionEnd: Subscription;
  protected _subscriptionUpdateAfterRender: Subscription;

  protected _end$ = new Subject<NgIterable<T>>();
  protected _updateAfterRender$ = new Subject<any>();

  protected _ngFor;

  constructor(
      private _differs: IterableDiffers, public zone: NgZone, private _elementRef: ElementRef,
      private _scrollDispatcher: ScrollDispatcher) {}

  position = DEFAULTS.POSITION;
  step = DEFAULTS.STEP;
  offset = DEFAULTS.OFFSET;
  delay = DEFAULTS.DELAY;
  loading$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this._scrollContainers = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);
    this._subscriptionScrolled = this._scrollDispatcher.ancestorScrolled(this._elementRef).subscribe(this._update.bind(this));

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
    this.destroy(this._subscriptionScrolled);
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

  private _update(scrollContainer: CdkScrollable|void|undefined = undefined) {
    if (!this._scrollContainers.length) {
      this._updateWhenOffsetExceeded(window.innerHeight + window.scrollY, document.body.offsetHeight);
    } else {
      let container = this._scrollContainers[0];
      if (scrollContainer) {
        container = scrollContainer;
      }
      const element = container.getElementRef().nativeElement;
      const style = window.getComputedStyle(element);
      const preChangeHeight = style.height;
      element.style.height = 'auto';
      const clientHeight = element.clientHeight;
      element.style.height = preChangeHeight;
      this._updateWhenOffsetExceeded(element.offsetHeight + element.scrollTop, clientHeight);
    }
  }

  private _updateWhenOffsetExceeded(scrollPosition: number, offsetHeight: number) {
    if (scrollPosition >= offsetHeight - this.offset) {
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
