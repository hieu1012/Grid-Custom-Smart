import { Component, Input } from '@angular/core';
import { ColumnBase } from './column-base';
import { ColumnSortSettings } from '../query/types';

/**
 * Cột command cho row-edit — selector `kendo-grid-command-column`.
 *
 * ```html
 * <kendo-grid-command-column title="Actions" width="120"></kendo-grid-command-column>
 * ```
 */
@Component({
    selector: 'smart-grid-command-column, kendo-grid-command-column',
    standalone: true,
    template: '<ng-content />',
    providers: [{ provide: ColumnBase, useExisting: CommandColumnComponent }],
})
export class CommandColumnComponent extends ColumnBase {
    @Input() public override field: string | undefined = undefined;
    @Input() public override sortable: boolean | ColumnSortSettings = false;
    @Input() public override filterable = false;
    @Input() public override resizable = false;
    @Input() public override width = 180;

    @Input() public edit = true;
    @Input() public remove = true;
    @Input() public save = true;
    @Input() public cancel = true;

    public override isCommandColumn(): boolean {
        return true;
    }
}