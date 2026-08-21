import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * `<ng-template kendoGridNoRecordsTemplate>` — nội dung hiển thị khi không có
 * records (empty state của grid).
 */
@Directive({
    selector: '[smartGridNoRecordsTemplate], [kendoGridNoRecordsTemplate]',
    standalone: true,
})
export class NoRecordsTemplateDirective {
    public templateRef = inject<TemplateRef<any>>(TemplateRef);
}