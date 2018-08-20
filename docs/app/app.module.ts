import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import { InfiniteScrollModule } from '../../src/public_api';
import { HeaderComponent } from './header/header.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { EmbedComponent } from './embed/embed.component';


// import {AppComponent as DirectiveComponent} from '../examples/directive/app/app.component';

const ROUTES = [{
  path: '', loadChildren: './examples/directive.module#DirectiveModule'//, outlet: 'directive'
}];

@NgModule({declarations: [AppComponent, HeaderComponent, IntroductionComponent, EmbedComponent], 
  imports: [BrowserModule, RouterModule.forRoot(ROUTES), HttpClientModule, InfiniteScrollModule], bootstrap: [AppComponent]})
export class AppModule {
}
