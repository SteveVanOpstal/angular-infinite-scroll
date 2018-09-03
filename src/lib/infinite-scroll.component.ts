import {ScrollDispatcher} from '@angular/cdk/scrolling';
import {NgForOfContext} from '@angular/common';
import {AfterContentInit, Component, Input, IterableDiffers, NgIterable, NgZone, ViewChild, ViewContainerRef} from '@angular/core';
import {ContentChild, ContentChildren, Directive, ElementRef, OnDestroy, QueryList, TemplateRef} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

import {DEFAULTS} from './defaults';
import {InfiniteScroll} from './infinite-scroll';

@Directive({selector: '[infiniteStatic]'})
export class InfiniteStaticMarker<T> {
  public enabled = false;
  constructor(public template: TemplateRef<T>) {}
}

@Directive({selector: '[infiniteTemplate]'})
export class InfiniteTemplateMarker<T> {
  constructor(public template: TemplateRef<NgForOfContext<T>>) {}
}

@Component({
  selector: 'infinite-scroll',
  template: `
    <ng-template ngFor let-item [ngForOf]="itemsStatic">
      <ng-template [ngIf]="item.enabled">
        <ng-container *ngTemplateOutlet="item.template"></ng-container>
      </ng-template>
    </ng-template>
    <ng-template [ngIf]="templateMarker">
    <ng-template ngFor let-item [ngForOf]="items">
      <ng-container *ngTemplateOutlet="templateMarker.template; context: {$implicit: item}"></ng-container>
      </ng-template>
    </ng-template>`
})
export class InfiniteScrollComponent<T> extends InfiniteScroll<T> implements AfterContentInit, OnDestroy {
  @ContentChildren(InfiniteStaticMarker) staticMarkers: QueryList<InfiniteStaticMarker<T>>;
  @ContentChild(InfiniteTemplateMarker) templateMarker: InfiniteTemplateMarker<T>;
  @ViewChild('dynamic') dynamicTemplate: ViewContainerRef;

  itemsStatic: Array<InfiniteStaticMarker<T>>;

  private _subscriptionStaticMarkersChanges: Subscription;

  constructor(differs: IterableDiffers, zone: NgZone, elementRef: ElementRef, scrollDispatcher: ScrollDispatcher) {
    super(differs, zone, elementRef, scrollDispatcher);
  }

  @Input('position')
  set infiniteScrollPosition(position) {
    if (position === undefined || position === null) {
      this.position = DEFAULTS.POSITION;
    } else {
      this.position = position;
    }
    this._positionInitial = position;
  }
  @Input() step;
  @Input() offset;
  @Input() delay;
  @Input()
  set loading(loading: (loading: boolean) => void) {
    this.subscribeLoading(loading);
  }
  @Input()
  set end(scrollEnd: (position: number, interval: number) => Observable<NgIterable<T>>) {
    this.subscribeEnd(scrollEnd);
  }

  ngAfterContentInit() {
    this.initItems();
    this._subscriptionStaticMarkersChanges = this.staticMarkers.changes.subscribe(this.initItems.bind(this));
  }

  ngOnDestroy() {
    this.destroy(this._subscriptionStaticMarkersChanges);
  }

  protected update() {
    if (!this.items) {
      this.items = [];
      this._dummies = 0;
    }

    if (this.items && (!this.items.length || this.items.every((item) => item === undefined))) {
      this.items = [];
      this._dummies = 0;
      this.addDummies();
    }

    let staticLength = 0;
    if (this.itemsStatic) {
      staticLength = this.itemsStatic.length
    }

    if (this.position < staticLength) {
      this.loading$.next(true);
      this._updateAfterRender$.next();
      this.updateItems();
      this.position += this.step;
    } else if (staticLength + this.position < this.items.length - this._dummies) {
      this.loading$.next(true);
      this._updateAfterRender$.next();
      this.position += this.step;
    } else if (this._subscriptionEnd) {
      this.loading$.next(true);
      this._end$.next({position: this.position, step: this.step});
      this.addDummies();
      this.position += this.step;
    }
  }

  private initItems() {
    this.itemsStatic = this.staticMarkers.toArray();
    this.position = this._positionInitial;
    this.items = [];
    this._dummies = 0;
    this.updateItems();
    this.update();
  }

  private updateItems() {
    this.zone.run(() => {
      for (const index in this.itemsStatic) {
        this.itemsStatic[index].enabled = this.position > parseInt(index, 10);
      }
    });
  }
}
