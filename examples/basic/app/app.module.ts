import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InfiniteScrollModule} from 'angular-infinite-scroll';

import {AppComponent} from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, InfiniteScrollModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
