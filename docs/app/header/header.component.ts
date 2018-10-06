import {Component} from '@angular/core';
import {version} from '../../package';

@Component({
  selector: 'docs-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="title">
      <h1>
        <a href="https://github.com/SteveVanOpstal/angular-infinite-scroll">
          angular-infinite-scroll
        </a>
      </h1>
      <p class="version">
        <a href="https://github.com/SteveVanOpstal/angular-infinite-scroll/blob/master/CHANGELOG.md">
          {{ version }}
        </a>
      </p>
    </div>
    <a class="github" href="https://github.com/SteveVanOpstal/angular-infinite-scroll">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024">
        <path fill="#1B1F23" fill-rule="evenodd" d="M512 0A511.9 511.9 0 0 0 0 512c0 226.6 146.6 418 350 485.8 25.7 4.4 35.3-11 35.3-24.4 0-12.1-.7-52.4-.7-95.3-128.6 23.7-161.9-31.4-172.1-60.2-5.8-14.7-30.7-60.1-52.5-72.3-18-9.6-43.5-33.3-.6-34 40.3-.6 69 37.2 78.7 52.6 46 77.4 119.7 55.6 149.1 42.2 4.5-33.3 18-55.7 32.6-68.5-113.9-12.8-233-57-233-252.8 0-55.7 20-101.7 52.6-137.6-5.2-12.8-23-65.3 5-135.7 0 0 43-13.4 140.9 52.5a475 475 0 0 1 128-17.3c43.5 0 87 5.8 128 17.3 97.9-66.5 140.8-52.5 140.8-52.5 28.1 70.4 10.2 123 5.1 135.7a198.1 198.1 0 0 1 52.5 137.6c0 196.5-119.7 240-233.6 252.8 18.5 16 34.5 46.7 34.5 94.7 0 68.5-.6 123.6-.6 140.8 0 13.5 9.6 29.5 35.2 24.4A512.8 512.8 0 0 0 1024 512C1024 229.1 794.9 0 512 0z" clip-rule="evenodd"/>
      </svg>
    </a>`
})
export class HeaderComponent {
  version = version;
}
