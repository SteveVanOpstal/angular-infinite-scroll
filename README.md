# angular-infinite-scroll

## Basic Usage

``` typescript
@Component({
  template: `
    <p *infiniteScroll="let item of items; end: end">
      {{ item }}
    </p>`
})
export class TestComponent {
  items = [];

  constructor(private http: HttpClient) {}

  end = (position: number, step: number): Observable<Array<any>> => {
    return this.http.get(`/backend?begin=${position}&end=${position + step}`);
  }
}
```

## Advanced usage

### Scroll Container

By default the window is used as scroll container.
When a parent element has the `infiniteScrollContainer` directive, that element is used as scroll container.

``` typescript
@Component({
  styles: ['div { overflow-y: scroll; height: 300px }'],
  template: `
    <div infiniteScrollContainer>
      <p *infiniteScroll="let item of items; end: end">
        {{ item }}
      </p>
    </div>`
})
export class TestComponent {
  items = [];

  constructor(private http: HttpClient) {}

  end(position: number, step: number): Observable<Array<any>> {
    return this.http.get(`/backend?begin=${position}&end=${position + step}`);
  }
}
```

### Options

``` html
  <p *infiniteScroll="let item of items; position: position; step: step; delay: delay; offset: offset; end: end; loading: loading">
    {{ item }}
  </p>
```

 * **position**   (default `0`              ): The current position, when set to a fixed initial value the initial position will be set to that fixed value.
 * **step**       (default `1`              ): The step size.
 * **delay**      (default `0`  , unit `ms` ): The amount of delay between steps.
 * **offset**     (default `100`, unit `px` ): `container height` - `offset` = `end event triggerpoint`.
 * **end**        event callback: `(position: number, step: number) => Observable<NgIterable<T>>`
 * **loading**    event callback: `(loading: boolean) => void`

**important:** `step` is optional, you can for example set it to `1` and the `end` event's observable can still return more or less than 1 item.
