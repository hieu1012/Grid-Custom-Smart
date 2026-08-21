import { Component, ContentChildren, QueryList } from '@angular/core';
import { ColumnBase } from './column-base';

/**
 * Nhóm cột cho header multi-level — selector `kendo-grid-column-group`.
 *
 * ```html
 * <kendo-grid-column-group title="Info">
 *     <kendo-grid-column field="ProductName" title="Tên" />
 *     <kendo-grid-column field="UnitPrice" title="Giá" />
 * </kendo-grid-column-group>
 * ```
 */
@Component({
    selector: 'smart-grid-column-group, kendo-grid-column-group',
    standalone: true,
    template: '<ng-content />',
    providers: [{ provide: ColumnBase, useExisting: ColumnGroupComponent }],
})
export class ColumnGroupComponent extends ColumnBase {
    @ContentChildren(ColumnBase) public children!: QueryList<ColumnBase>;

    public override isColumnGroup(): boolean {
        return true;
    }

    /** Các cột con không bị hidden. */
    public visibleChildren(): ColumnBase[] {
        return this.children.toArray().filter((c) => !c.hidden);
    }

    /** Flatten tất cả cột lá (không bị hidden) dưới group này. */
    public leafColumns(): ColumnBase[] {
        const leaves: ColumnBase[] = [];
        for (const child of this.visibleChildren()) {
            if (child.isColumnGroup()) {
                leaves.push(...(child as ColumnGroupComponent).leafColumns());
            } else {
                leaves.push(child);
            }
        }
        return leaves;
    }

    /** Số cell header chiếm dụng (số cột lá visible). */
    public override get colspan(): number {
        return this.leafColumns().length;
    }
}