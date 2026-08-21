import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * `<ng-template kendoGridDetailTemplate let-dataItem let-index="index">`
 * Template cho detail row của master detail. Context: `$implicit` = dataItem, `index`.
 */
@Directive({
    selector: '[smartGridDetailTemplate], [kendoGridDetailTemplate]',
    standalone: true,
})
export class DetailTemplateDirective {
    public templateRef = inject<TemplateRef<any>>(TemplateRef);
}
