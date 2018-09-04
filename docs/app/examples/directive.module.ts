import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {InfiniteScrollModule} from '../../../src/public_api';
import {AppComponent} from '../../examples/directive/app/app.component';
import {CardComponent} from '../../examples/directive/app/card/card.component';

const ROUTES = [{path: '', component: AppComponent, outlet: 'directive'}];

@NgModule({declarations: [AppComponent, CardComponent], imports: [CommonModule, RouterModule.forChild(ROUTES), InfiniteScrollModule]})
export class DirectiveModule {
}
