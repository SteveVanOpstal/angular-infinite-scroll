import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Component, ElementRef, EventEmitter, Input, Output} from '@angular/core';
import * as hljs from 'highlight.js';
import {Subscription} from 'rxjs';

@Component({
  selector: 'doc-viewer',
  styleUrls: ['doc-viewer.component.scss'],
  template: '<p class="loading">Loading document..</p>'
})
export class DocViewerComponent {
  private _documentFetchSubscription: Subscription;

  @Input()
  set documentUrl(url: string) {
    this._fetchDocument(url);
  }

  @Output() contentLoaded = new EventEmitter<void>();

  textContent = '';

  constructor(private _elementRef: ElementRef, private _http: HttpClient) {}

  private _fetchDocument(url: string) {
    // Cancel previous pending request
    if (this._documentFetchSubscription) {
      this._documentFetchSubscription.unsubscribe();
    }

    this._documentFetchSubscription = this._http.get(url, {responseType: 'text'})
                                          .subscribe(
                                              document => this.updateDocument(url, document),
                                              error => this.showError(url, error));
  }

  private updateDocument(url: string, document: string) {
    const ext = url.split('.').pop();
    this._elementRef.nativeElement.innerHTML =
        '<pre>' + hljs.highlight(ext, document).value + '</pre>';
    this.textContent = this._elementRef.nativeElement.textContent;
    this.contentLoaded.next();
  }

  private showError(url: string, error: HttpErrorResponse) {
    console.log(error);
    this._elementRef.nativeElement.innerText =
        `Failed to load document: ${url}. Error: ${error.statusText}`;
  }
}
