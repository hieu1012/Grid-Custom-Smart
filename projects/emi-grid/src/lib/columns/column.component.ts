import { Component, Input } from '@angular/core';
import { ColumnBase } from './column-base';
import { ColumnSortSettings } from '../query/types';

/**
 * Cột chuẩn của grid — selector `kendo-grid-column`.
 *
 * ```html
 * <kendo-grid-column field="ProductName" title="Tên sản phẩm" width="200">
 *   <ng-template kendoGridCellTemplate let-dataItem>{{ dataItem.ProductName }}</ng-template>
 * </kendo-grid-column>
 * ```
 */
@Component({
    selector: 'kendo-grid-column',
    standalone: true,
    template: '<ng-content />',
    providers: [{ provide: ColumnBase, useExisting: ColumnComponent }],
})
export class ColumnComponent extends ColumnBase {
    /**
     * Tên field trong dataItem (hỗ trợ path lồng nhau 'a.b.c').
     */
    @Input() public override field: string | undefined = undefined;

    /**
     * Định dạng giá trị khi hiển thị (số/ngày) — apply v1.1.
     */
    @Input() public format: any | undefined;

    /**
     * Cho phép sort theo cột này + settings riêng.
     */
    @Input() public override sortable: boolean | ColumnSortSettings = true;

    /**
     * Cho phép group theo cột này (v1.1).
     */
    @Input() public groupable = true;

    /**
     * Kiểu editor khi editing (v1.2).
     */
    @Input() public editor: 'text' | 'numeric' | 'date' | 'boolean' | undefined;

    /**
     * Kiểu filter cell hiển thị (v1.1).
     */
    @Input() public filter: 'text' | 'numeric' | 'boolean' | 'date' | undefined;

    /**
     * Cho phép filter theo cột này.
     */
    @Input() public override filterable: boolean = true;

    /**
     * Cho phép edit cột này (v1.2).
     */
    @Input() public editable = true;
}