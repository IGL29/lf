import {
  Directive,
  DoCheck,
  Input,
  KeyValueChanges,
  KeyValueDiffer,
  KeyValueDiffers,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appForEntries]'
})
export class ForEntriesDirective implements DoCheck {
  @Input() appForEntriesOf: { [key: string]: unknown } = {};

  objectDiffer: KeyValueDiffer<string, unknown>;

  constructor(
    private templateRef: TemplateRef<unknown>,
    private viewContainerRef: ViewContainerRef,
    private keyValueDiffers: KeyValueDiffers
  ) {
    this.objectDiffer = this.keyValueDiffers.find(this.appForEntriesOf).create();
  }

  ngDoCheck(): void {
    const objectChanges: KeyValueChanges<string, unknown> | null = this.objectDiffer.diff(
      this.appForEntriesOf
    );
    if (objectChanges) {
      this.viewContainerRef.clear();
      objectChanges.forEachAddedItem((record) => {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: {
            name: record.key,
            value: record.currentValue
          }
        });
      });
    }
  }
}
