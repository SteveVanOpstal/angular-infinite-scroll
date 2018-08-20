import {NgModule} from '@angular/core';


import {AppComponent} from '../../examples/directive/app/app.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../examples/directive/app/card/card.component';
import { InfiniteScrollModule } from '../../../src/public_api';
import { RouterModule } from '@angular/router';

const ROUTES = [{
  path: '', component: AppComponent//, outlet: 'directive'
}];

@NgModule({declarations: [AppComponent, CardComponent], imports: [CommonModule, RouterModule.forChild(ROUTES), InfiniteScrollModule]})
export class DirectiveModule {
}
