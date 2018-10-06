import {ComponentPortal} from '@angular/cdk/portal';
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {COMPONENTS} from 'angular-infinite-scroll-examples';

@Component({
  selector: 'docs-source',
  styleUrls: ['source.component.scss'],
  template: `
    <mat-tab-group class="source">
      <ng-template ngFor [ngForOf]="['ts', 'html', 'css']" let-ext>
        <mat-tab [label]="ext">
          <ng-template matTabContent>
            <doc-viewer [documentUrl]="'/examples/' + example + '/app/app.component.' + ext"></doc-viewer>
          </ng-template>
        </mat-tab>
      </ng-template>
    </mat-tab-group>

    <div class="example" infiniteContainer>
      <ng-template [cdkPortalOutlet]="portal"></ng-template>
    </div>`
})
export class SourceComponent implements OnChanges {
  @Input() example = 'basic';

  portal: ComponentPortal<any>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.example) {
      this.portal = new ComponentPortal(COMPONENTS[this.example].component);
    }
  }
}