import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InfiniteScrollModule} from 'angular-infinite-scroll';

import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';

@NgModule({
  declarations: [AppComponent, CardComponent],
  imports: [BrowserModule, CommonModule, HttpClientModule, InfiniteScrollModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
