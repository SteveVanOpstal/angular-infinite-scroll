import {NgModule} from '@angular/core';

import {AppComponent as AdvancedAppComponent} from './advanced/app/app.component';
import {AppModule as AdvancedAppModule} from './advanced/app/app.module';
import {AppComponent as BasicAppComponent} from './basic/app/app.component';
import {AppModule as BasicAppModule} from './basic/app/app.module';

export const COMPONENTS = {
  basic: {component: BasicAppComponent},
  advanced: {component: AdvancedAppComponent}
};

@NgModule({
  entryComponents: [BasicAppComponent, AdvancedAppComponent],
  imports: [BasicAppModule, AdvancedAppModule]
})
export class ExamplesModule {
}
