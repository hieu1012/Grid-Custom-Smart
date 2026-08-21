import { Component, Input } from '@angular/core';
import { ColumnBase } from './column-base';
import { ColumnSortSettings } from '../query/types';

/**
 * Cột checkbox cho row selection — selector `kendo-grid-checkbox-column`.
 *
 * ```html
 * <kendo-grid-checkbox-column title="Chọn" width="60"></kendo-grid-checkbox-column>
 * ```
 */
@Component({
    selector: 'smart-grid-checkbox-column, kendo-grid-checkbox-column',
    standalone: true,
    template: '<ng-content />',
    providers: [{ provide: ColumnBase, useExisting: CheckboxColumnComponent }],
})
export class CheckboxColumnComponent extends ColumnBase {
    @Input() public override field: string | undefined = undefined;
    @Input() public override sortable: boolean | ColumnSortSettings = false;
    @Input() public override filterable = false;
    @Input() public override resizable = false;
    @Input() public override columnMenu = false;

    /** Hiển thị checkbox select-all ở header cell. */
    @Input() public showSelectAll = true;

    public override isCheckboxColumn(): boolean {
        return true;
    }
}