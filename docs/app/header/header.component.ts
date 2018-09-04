import {Component} from '@angular/core';
import {version} from '../../package';

@Component({
  selector: 'docs-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <h1>
      <a href="https://github.com/SteveVanOpstal/angular-infinite-scroll">
        angular-infinite-scroll
      </a>
    </h1>
    <p>
      <a href="https://github.com/SteveVanOpstal/angular-infinite-scroll/blob/master/CHANGELOG.md">
        {{ version }}
      </a>
    </p>`
})
export class HeaderComponent {
  version = version;
}
