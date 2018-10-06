import {TitleCasePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import sdk from '@stackblitz/sdk';
import {combineLatest, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {EXAMPLES} from '../../../../examples/examples';

const PROJECT = {
  files: {},
  title: 'Example',
  description: 'angular-infinite-scroll example',
  template: 'angular-cli',
  tags: ['angular', 'infinite', 'scroll'],
  dependencies: {'angular-infinite-scroll': '*', 'chance': '*', '@types/chance': '*'},
  settings: {compile: {clearConsole: false}}
}

const OPTIONS = {
  openFile: 'app/app.component.ts',
  view: 'preview',
  height: 320
};

@Component({
  selector: 'docs-blitz',
  styleUrls: ['blitz.component.scss'],
  template: `
    <div #embed></div>
    <div class="overlay" *ngIf="loading || error">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 130" height="16">
        <path fill-opacity=".2" d="M110.8 17.3l-14.6 36h36l-34 37-34 35 9.7-25 10.3-25h-36l15.7-18 36.5-39 14.8-16c1.2 4.7-2.6 10.6-4.4 15z"/>
        <path fill-opacity=".4" d="M60.3 30.3c-1.8 3.2-10.8 11.8-14 15l-12 12.2c-1.5 1.7-3.8 4.3-3.7 6.8.1 3.3 6.3 8.7 8.6 11l11 11 9 8c2.3 2.5 6 6.6 6.7 10 .8 4.8-4.4 15.6-6.7 20l-45-42.8C10.6 78 .2 69.7.3 64.3c0-3.8 10.4-13.6 13.4-17L61.3.3a66 66 0 0 1-1 30zm80-10l26 26c3.1 3.3 13.5 13.7 13.5 18 0 4.2-10.4 14.5-13.7 18l-32.8 32.2c-5 4.6-9.5 9.8-15 13.8 0-7.8-1.8-26.3 2.4-32l20.6-20.7c2.7-2.5 8.7-7.2 8.6-11.3 0-5-10-13-13.7-16.2l-15-14.7c-2.6-2.6-5.9-5.4-6.7-9.2-1.2-5.8 4.4-16.4 7.7-21 6 4.2 12.7 11.7 18 17z"/>
      </svg>
      <p *ngIf="loading">Loading StackBlitz..</p>
      <p *ngIf="error">Unable to load StackBlitz</p>
    <div>`
})
export class BlitzComponent {
  @Input() example = 'basic';
  @ViewChild('embed') embed: ElementRef;

  error = false;
  loading = true;

  constructor(private http: HttpClient) {
    const project = Object.assign({}, PROJECT, {files: EXAMPLES[this.example]});
    project.title = new TitleCasePipe().transform(this.example) + ' example';

    const requests$ = [];
    for (const file of Object.keys(project.files)) {
      requests$.push(this.http.get(`/examples/${this.example}/${file}`, {responseType: 'text'})
                         .pipe(catchError(() => of('')), map((content) => {
                                 return {file: file, content: content};
                               })));
    }

    combineLatest(requests$).subscribe((requests: Array<{file: string, content: string}>) => {
      for (const request of requests) {
        if (request.file) {
          project.files[request.file] = request.content;
        }
      }

      sdk.embedProject(this.embed.nativeElement, project, OPTIONS)
          .then(() => {
            this.loading = false;
            this.error = false
          })
          .catch(() => {
            this.loading = false;
            this.error = true
          });
    });
  }
}
