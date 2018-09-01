import {NgModule} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserModule} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';

import {InfiniteScrollModule} from '../../../src/public_api';

import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';
import {ComponentTestComponent} from './component/component.test-component';
import {ContainerTestComponent} from './container/container.test-component';
import {DirectiveTemplateTestComponent} from './directive-template/directive-template.test-component';
import {DirectiveTestComponent} from './directive/directive.test-component';
import {StatusComponent} from './status.component';

const ROUTES = [
  {path: 'directive-template', component: DirectiveTemplateTestComponent}, {path: 'directive', component: DirectiveTestComponent},
  {path: 'component', component: ComponentTestComponent}, {path: 'container', component: ContainerTestComponent}
];

@NgModule({
  declarations: [
    AppComponent, CardComponent, StatusComponent, DirectiveTestComponent, DirectiveTemplateTestComponent, ComponentTestComponent,
    ContainerTestComponent
  ],
  imports: [
    BrowserModule, InfiniteScrollModule, RouterModule.forRoot(ROUTES), MatSnackBarModule, NoopAnimationsModule, MatProgressSpinnerModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [StatusComponent]
})
export class AppModule {
}
