import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {InfiniteScrollModule} from 'angular-infinite-scroll';

import {AppComponent} from './app.component';
import {ExampleModule} from './examples/example.module';
import {HeaderComponent} from './header/header.component';
import {IntroductionComponent} from './introduction/introduction.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, IntroductionComponent],
  imports:
      [BrowserModule, BrowserAnimationsModule, CommonModule, InfiniteScrollModule, ExampleModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
