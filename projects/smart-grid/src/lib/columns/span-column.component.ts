import { Component, ContentChild, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { ColumnBase } from './column-base';
import { ColumnGroupComponent } from './column-group.component';
import { SpanCellTemplateDirective } from '../rendering/span-cell-template.directive';
import { ColumnSortSettings } from '../query/types';

/**
 * Cột span — selector `kendo-grid-span-column`.
 *
 * Gom các cột con thành một cell duy nhất trong body (colspan = số cột con),
 * header hiển thị title của chính span column.
 *
 * ```html
 * <kendo-grid-span-column title="Thông tin">
 *     <kendo-grid-column field="ProductName" title="Tên" />
 *     <kendo-grid-column field="UnitPrice" title="Giá" />
 * </kendo-grid-span-column>
 * ```
 */
@Component({
    selector: 'smart-grid-span-column, kendo-grid-span-column',
    standalone: true,
    template: '<ng-content />',
    providers: [{ provide: ColumnBase, useExisting: SpanColumnComponent }],
})
export class SpanColumnComponent extends ColumnBase {
    @ContentChildren(ColumnBase) public children!: QueryList<ColumnBase>;

    @Input() public override sortable: boolean | ColumnSortSettings = false;
    @Input() public override filterable = false;
    @Input() public override resizable = false;
    @Input() public override columnMenu = false;

    @ContentChild(SpanCellTemplateDirective)
    protected spanCellTemplateDirective: SpanCellTemplateDirective | undefined;

    public override isSpanColumn(): boolean {
        return true;
    }

    /** TemplateRef của `<ng-template kendoGridSpanCellTemplate>` (nếu có). */
    public get spanCellTemplateRef(): TemplateRef<any> | null {
        return this.spanCellTemplateDirective?.templateRef ?? null;
    }

    /** Các cột con không bị hidden. */
    public visibleChildren(): ColumnBase[] {
        return this.children.toArray().filter((c) => !c.hidden);
    }

    /** Flatten tất cả cột lá dưới span column (tính colspan + colgroup). */
    public leafColumns(): ColumnBase[] {
        const leaves: ColumnBase[] = [];
        for (const child of this.visibleChildren()) {
            if (child.isColumnGroup()) {
                leaves.push(...(child as ColumnGroupComponent).leafColumns());
            } else if (child.isSpanColumn()) {
                leaves.push(...(child as SpanColumnComponent).leafColumns());
            } else {
                leaves.push(child);
            }
        }
        return leaves;
    }

    /** Số cột body cell chiếm dụng trong merged cell. */
    public override get colspan(): number {
        return this.leafColumns().length;
    }
}