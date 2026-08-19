import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * `<ng-template kendoGridSpanCellTemplate let-dataItem>` — template cho merged cell
 * của span column. Context: `$implicit` = dataItem.
 */
@Directive({
    selector: '[kendoGridSpanCellTemplate]',
    standalone: true,
})
export class SpanCellTemplateDirective {
    public templateRef = inject<TemplateRef<any>>(TemplateRef);
}