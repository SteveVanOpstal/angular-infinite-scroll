import {NgForOfContext} from '@angular/common';
import {AfterContentInit, Component, Input, IterableDiffers, NgIterable, NgZone, ViewChild, ViewContainerRef} from '@angular/core';
import {ContentChild, ContentChildren, Directive, QueryList, TemplateRef} from '@angular/core';
import {Observable} from 'rxjs';

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
    <ng-template ngFor let-item [ngForOf]="_itemsStatic">
      <ng-template [ngIf]="item.enabled">
        <ng-container *ngTemplateOutlet="item.template"></ng-container>
      </ng-template>
    </ng-template>
    <ng-template ngFor let-item [ngForOf]="_items">
      <ng-container *ngTemplateOutlet="templateMarker.template; context: {$implicit: item}"></ng-container>
    </ng-template>`
})
export class InfiniteScrollComponent<T> extends InfiniteScroll<T> implements AfterContentInit {
  @ContentChildren(InfiniteStaticMarker) staticMarkers: QueryList<InfiniteStaticMarker<T>>;
  @ContentChild(InfiniteTemplateMarker) templateMarker: InfiniteTemplateMarker<T>;
  @ViewChild('dynamic') dynamicTemplate: ViewContainerRef;

  _itemsStatic: Array<InfiniteStaticMarker<T>>;
  _items: Array<T>;

  private _dummies = 0;

  constructor(differs: IterableDiffers, zone: NgZone) {
    super(differs, zone);
  }

  @Input() position;
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
    this._itemsStatic = this.staticMarkers.toArray();
    this.update();
  }

  protected update() {
    if (!this._items) {
      this._items = [];
    }

    if (this._items && (!this._items.length || this._items.every((item) => item === undefined))) {
      this._items = [];
      this.addDummies();
    }

    let staticLength = 0;
    if (this._itemsStatic) {
      staticLength = this._itemsStatic.length
    }

    if (this.position < staticLength) {
      this.loading$.next(true);
      this._updateAfterRender$.next();
      this.updateItems();
      this.position += this.step;
    } else if (staticLength + this.position < this._items.length - this._dummies) {
      this.loading$.next(true);
      this._updateAfterRender$.next();
      this.position += this.step;
    } else if (this._subscriptionEnd) {
      this.loading$.next(true);
      this._end$.next();
      this.addDummies();
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
    this.zone.run(() => {
      this._items = this._items.concat(Array.from(newItems));
    });
    // only continue when newItems arrive
    if (this._items.length) {
      this._updateAfterRender$.next();
    }
  }

  private updateItems() {
    this.zone.run(() => {
      for (const index in this._itemsStatic) {
        this._itemsStatic[index].enabled = this.position > index;
      }
    });
  }

  private addDummies() {
    this.zone.run(() => {
      this._items = this._items.concat(Array(this.step).fill(undefined));
      this._dummies += this.step;
    });
  }
}
