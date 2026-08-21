import { Directive, inject, TemplateRef } from '@angular/core';

/**
 * `<ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex" let-column="column">`
 * Được chiếu vào 1 cột (`kendo-grid-column`). Context: `$implicit` = dataItem,
 * `rowIndex`, `column`.
 */
@Directive({
    selector: '[smartGridCellTemplate], [kendoGridCellTemplate]',
    standalone: true,
})
export class CellTemplateDirective {
    public templateRef = inject<TemplateRef<any>>(TemplateRef);
}