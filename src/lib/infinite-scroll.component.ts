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
  public enabled = false;
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
    <ng-template #dynamic>
    </ng-template>`
})
export class InfiniteScrollComponent<T> extends InfiniteScroll<T> implements AfterContentInit {
  @ContentChildren(InfiniteStaticMarker) staticMarkers: QueryList<InfiniteStaticMarker<T>>;
  @ContentChild(InfiniteTemplateMarker) templateMarker: InfiniteTemplateMarker<T>;
  @ViewChild('dynamic') dynamicTemplate: ViewContainerRef;

  _itemsStatic: Array<InfiniteStaticMarker<T>>;
  _items: Array<T>;

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
  set end(_scrollEnd: (position: number, interval: number) => Observable<NgIterable<T>>) {
    // this.subscribeEnd(scrollEnd);
    throw new Error('Method not implemented.');
  }

  ngAfterContentInit() {
    this._itemsStatic = this.staticMarkers.toArray();
    if (this.templateMarker) {
      this.createNgFor(this.dynamicTemplate, this.templateMarker.template);
    }
    this.update();
  }

  protected update() {
    if (!this.step) {
      return;
    }

    if (this._itemsStatic && this.position < this._itemsStatic.length) {
      this.loading$.next(true);
      this._updateAfterRender$.next();
      this.updateItems();
      this.position += this.step;
    }
  }

  protected newItems(_newItems: NgIterable<T>) {
    throw new Error('Method not implemented.');
  }

  private updateItems() {
    this.zone.run(() => {
      for (const index in this._itemsStatic) {
        this._itemsStatic[index].enabled = this.position >= index;
      }

      if (this._items && this._ngFor) {
        // update ngForOf<T> directive
        this._ngFor.ngForOf = this._items.slice(0, this.position);
      }
    });
  }
}
