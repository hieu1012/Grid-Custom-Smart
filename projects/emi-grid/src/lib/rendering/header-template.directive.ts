import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * `<ng-template kendoGridHeaderTemplate let-column>` — template cho header cell
 * của cột. Context: `$implicit` = column.
 */
@Directive({
    selector: '[kendoGridHeaderTemplate]',
    standalone: true,
})
export class HeaderTemplateDirective {
    public templateRef = inject<TemplateRef<any>>(TemplateRef);
}