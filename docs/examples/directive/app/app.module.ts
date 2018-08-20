import {NgModule} from '@angular/core';

import {InfiniteScrollModule} from 'angular-infinite-scroll';

import {AppComponent} from './app.component';
import {CardComponent} from './card/card.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({declarations: [AppComponent, CardComponent], imports: [BrowserModule, CommonModule, InfiniteScrollModule], bootstrap: [AppComponent]})
export class AppModule {
}
