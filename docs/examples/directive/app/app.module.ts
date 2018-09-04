import {NgModule} from '@angular/core';

import {InfiniteScrollModule} from 'angular-infinite-scroll';

import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({declarations: [AppComponent, CardComponent], imports: [BrowserModule, CommonModule, HttpClientModule, InfiniteScrollModule], bootstrap: [AppComponent]})
export class AppModule {
}
