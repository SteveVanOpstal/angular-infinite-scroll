import {Component} from '@angular/core';
import {version} from '../../package';

@Component({
  selector: 'docs-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <h1>angular-infinite-scroll</h1>
    <p>{{ version }}</p>`
})
export class HeaderComponent {
  version = version;
}
