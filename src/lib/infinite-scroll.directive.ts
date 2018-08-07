import {NgForOf, NgForOfContext} from '@angular/common';
import {Directive, DoCheck, Input, IterableDiffers, NgIterable, OnDestroy, OnInit, TemplateRef, TrackByFunction} from '@angular/core';
import {NgZone, SimpleChange, ViewContainerRef} from '@angular/core';
import {BehaviorSubject, interval, Observable, of, Subject, Subscription} from 'rxjs';
import {exhaustMap, map, switchMap, take} from 'rxjs/operators';

const DEFAULT_INTERVAL = 4;
const DEFAULT_POSITION = 4;

@Directive({selector: '[infiniteScroll][infiniteScrollOf]'})
export class InfiniteScrollDirective<T> implements OnInit, DoCheck, OnDestroy {
  private _ngFor = new NgForOf<T>(this._viewContainer, this._template, this._differs);

  private _items: Array<T>;
  private _subscriptionEnd: Subscription;
  private _subscriptionLoading: Subscription;
  private _end$ = new Subject<NgIterable<T>>();
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _dummies = 0;

  constructor(
      private _viewContainer: ViewContainerRef, private _template: TemplateRef<NgForOfContext<T>>, private _differs: IterableDiffers,
      private zone: NgZone) {
    zone.runOutsideAngular(() => {
      window.addEventListener('scroll', () => this.update(true));
      window.addEventListener('resize', () => this.update(true));
    });
  }

  @Input()
  set infiniteScrollOf(infiniteScrollOf: NgIterable<T>) {
    this._items = Array.from(infiniteScrollOf);
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

  @Input() interval = DEFAULT_INTERVAL;
  @Input() position = DEFAULT_POSITION;
  @Input()
  set infiniteScrollEnd(obs$: Observable<NgIterable<T>>) {
    this.destroySubscriptions();
    this._subscriptionEnd = this._end$.pipe(exhaustMap(() => obs$)).subscribe(this.newItems, () => this.newItems([]));
  }

  ngOnInit() {
    this._subscriptionLoading = this._loading$
                                    .pipe(switchMap((loading: boolean) => {
                                      if (loading) {
                                        return interval(0).pipe(take(1), map(() => true));
                                      }
                                      return of(false);
                                    }))
                                    .subscribe(
                                        (success: boolean) => {
                                          if (success) {
                                            this._loading$.next(false);
                                            this.update(false);
                                          }
                                        },
                                        () => {
                                          this._loading$.next(false);
                                        });
  }

  ngDoCheck() {
    this._ngFor.ngDoCheck();
  }

  ngOnDestroy() {
    this.destroySubscriptions();
  }

  private update(outside: boolean) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this._items) {
      if (this._items && (!this._items.length || this._items.every((item) => item === undefined))) {
        this.addDummies();
      }

      if (outside) {
        this.zone.run(() => {
          this.updateItems();
        });
      } else {
        this.updateItems();
      }

      if (this.position < this._items.length) {
        this.position += this.interval;
      } else if (this._subscriptionEnd) {
        this._end$.next();
        this.addDummies();
      }
    }
  }

  private newItems(newItems: NgIterable<T>) {
    while (this._dummies > 0) {
      if (this._items && this._items.length) {
        this._items.pop();
      }
      this._dummies--;
    }
    this._items = this._items.concat(Array.from(newItems));
    this.updateItems();
  }

  private updateItems() {
    this._loading$.next(true);

    // update ngForOf<T> directive
    this._ngFor.ngForOf = this._items.slice(0, this.position);
  }

  private addDummies() {
    this._items = this._items.concat(Array(this.interval).fill(undefined));
    this._dummies += this.interval;
  }

  private destroySubscriptions() {
    if (this._subscriptionEnd && !this._subscriptionEnd.closed) {
      this._subscriptionEnd.unsubscribe();
    }
    if (this._subscriptionLoading && !this._subscriptionLoading.closed) {
      this._subscriptionLoading.unsubscribe();
    }
  }
}
