import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * `<ng-template kendoGridFooterTemplate let-column="column" let-aggregates="aggregates">`
 * Template cho footer cell của cột (grid footer + group footer).
 * Context: `$implicit` = aggregate result của field, `column`, `aggregates`.
 */
@Directive({
    selector: '[kendoGridFooterTemplate]',
    standalone: true,
})
export class FooterTemplateDirective {
    public templateRef = inject<TemplateRef<any>>(TemplateRef);
}