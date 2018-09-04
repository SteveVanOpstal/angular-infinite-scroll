import {HttpClient} from '@angular/common/http';
import {Component, ElementRef} from '@angular/core';
import sdk from '@stackblitz/sdk';
import {combineLatest, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {project} from './project';

const options = {
  openFile: 'main.ts',
  view: 'preview',
  height: 320,
  // width: 320,
  hideExplorer: true,
  hideNavigation: true,
  // forceEmbedLayout: true
};

@Component({selector: 'docs-embed', template: ``})
export class EmbedComponent {
  constructor(private element: ElementRef, private http: HttpClient) {
    const requests$ = [];
    for (const file of Object.keys(project.files)) {
      requests$.push(
          this.http.get('/examples/directive/' + file, {responseType: 'text'}).pipe(catchError(() => of(false)), map((content) => {
                                                                                      return {file: file, content: content};
                                                                                    })));
    }

    combineLatest(requests$).subscribe((requests: Array<{file: string, content: string}>) => {
      for (const request of requests) {
        if (request.file) {
          project.files[request.file] = request.content;
        }
      }

      sdk.embedProject(this.element.nativeElement, project, options);
    });
  }
}
