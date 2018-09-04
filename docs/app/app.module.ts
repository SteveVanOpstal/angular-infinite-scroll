import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {InfiniteScrollModule} from '../../src/public_api';

import {AppComponent} from './app.component';
import {EmbedComponent} from './embed/embed.component';
import {ExampleComponent} from './examples/example.component';
import {HeaderComponent} from './header/header.component';
import {IntroductionComponent} from './introduction/introduction.component';


// import {AppComponent as DirectiveComponent} from '../examples/directive/app/app.component';

const ROUTES = [{
  path: '',
  loadChildren: './examples/directive.module#DirectiveModule'  //, outlet: 'directive'
}];

@NgModule({
  declarations: [AppComponent, HeaderComponent, IntroductionComponent, EmbedComponent, ExampleComponent],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), HttpClientModule, InfiniteScrollModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
