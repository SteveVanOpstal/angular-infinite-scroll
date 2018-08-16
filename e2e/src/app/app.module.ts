import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {InfiniteScrollModule} from '../../../src/public_api';

import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';
import {ComponentTestComponent} from './component/component.test-component';
import {DirectiveTemplateTestComponent} from './directive/directive-template.test-component';
import {DirectiveTestComponent} from './directive/directive.test-component';

const ROUTES = [
  {path: 'directive-template', component: DirectiveTemplateTestComponent}, {path: 'directive', component: DirectiveTestComponent},
  {path: 'component', component: ComponentTestComponent}
];

@NgModule({
  declarations: [AppComponent, CardComponent, DirectiveTestComponent, DirectiveTemplateTestComponent, ComponentTestComponent],
  imports: [
    BrowserModule, InfiniteScrollModule, RouterModule.forRoot(ROUTES), MatSnackBarModule, BrowserAnimationsModule, MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
