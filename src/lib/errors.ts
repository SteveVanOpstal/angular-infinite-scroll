const ErrorExamples = {
  static: `
    <ng-template infiniteScroll>
      <static-content-1></static-content-1>
      <static-content-2></static-content-2>
    </ng-template>`,
  dynamic: `
    <ng-template infiniteScroll let-item [infiniteScrollOf]="data" [infiniteScrollEnd]="end">
      <dynamic-content [item]="item"></dynamic-content>
    </ng-template>`
};

export class Errors {
  static combineStaticEndTemplateException(): void {
    console.warn(`    It looks like you're combining static content with the 'end' event.
    The 'end' event will not be used in this situation.

    To fix this, remove the 'end' event:
    ${ErrorExamples.static}

    Or, use dynamic content:
    ${ErrorExamples.dynamic}
    `);
  }
}