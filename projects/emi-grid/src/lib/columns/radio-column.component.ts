import { Component, Input } from '@angular/core';
import { ColumnBase } from './column-base';
import { ColumnSortSettings } from '../query/types';

/**
 * Cột radio cho single selection — selector `kendo-grid-radio-column`.
 *
 * ```html
 * <kendo-grid-radio-column title="Chọn" width="60"></kendo-grid-radio-column>
 * ```
 */
@Component({
    selector: 'kendo-grid-radio-column',
    standalone: true,
    template: '<ng-content />',
    providers: [{ provide: ColumnBase, useExisting: RadioColumnComponent }],
})
export class RadioColumnComponent extends ColumnBase {
    @Input() public override field: string | undefined = undefined;
    @Input() public override sortable: boolean | ColumnSortSettings = false;
    @Input() public override filterable = false;
    @Input() public override resizable = false;
    @Input() public override columnMenu = false;

    public override isRadioColumn(): boolean {
        return true;
    }
}