import {NgModule} from '@angular/core';

import {AppComponent} from '../../../examples/basic/app/app.component';
import {InfiniteScrollModule} from '../../../src/public_api';

@NgModule({declarations: [AppComponent], imports: [InfiniteScrollModule], exports: [AppComponent]})
export class BasicModule {
}
