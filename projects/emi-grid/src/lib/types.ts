import { SortDescriptor, GroupDescriptor, CompositeFilterDescriptor, GroupResult } from './query/types';
import { ColumnBase } from './columns/column-base';

/** Item trong grid view (data row / group / detail) — dùng cho trackBy. */
export interface GridItem {
    type: 'data' | 'detail' | 'group' | 'groupFooter' | 'no-data' | 'inactive';
    dataItem?: any;
    dataRowIndex?: number;
    index?: string;
    group?: GroupResult;
    level?: number;
    colspan?: number;
}

/** Context cho `rowClass` */
export interface RowClassArgs {
    dataItem: any;
    index: number;
}

export type RowClassFn = (context: RowClassArgs) => string;

/** Context cho `rowSelected` */
export interface RowSelectedArgs extends RowClassArgs {
    dataRowIndex?: number;
}

export type RowSelectedFn = (context: RowSelectedArgs) => boolean;

/** Context cho `cellSelected` */
export interface CellSelectedArgs {
    dataItem: any;
    rowIndex: number;
    column: any;
}

export type CellSelectedFn = (context: CellSelectedArgs) => boolean;

/**
 * Column menu settings — full API bổ sung khi implement column menu (v1.2).
 * Selector `kendo-grid-column-menu` tương ứng.
 */
export interface ColumnMenuSettings {
    [key: string]: any;
}

/** Arguments cho `selectionChange` (SPEC §5.2) */
export interface SelectionEvent {
    selectedRows?: Array<GridItem>;
    deselectedRows?: Array<GridItem>;
    selectedCells?: Array<CellSelectedArgs>;
    deselectedCells?: Array<CellSelectedArgs>;
    ctrlKey?: boolean;
    shiftKey?: boolean;
}

/** Arguments cho `detailExpand` / `detailCollapse` */
export interface DetailExpandEvent {
    dataItem: any;
    index: number;
    expand: boolean;
}

/** Arguments cho `groupExpand` / `groupCollapse` */
export interface GroupExpandCollapseEvent {
    group: GroupResult;
    groupIndex: string;
}

/** Arguments cho `columnReorder` (khi user drag header để đổi thứ tự cột). */
export interface ColumnReorderEvent {
    column: ColumnBase;
    oldIndex: number;
    newIndex: number;
    columns: ColumnBase[];
}

/** Arguments cho `edit` / `save` / `cancel` / `remove` (row-edit mode). */
export interface EditEvent {
    dataItem: any;
    isNew: boolean;
    rowIndex?: number;
}

/** Trạng thái nội bộ grid — phục vụ dữ liệu binding khi cần. */
export interface GridState {
    skip: number;
    take: number;
    sort: SortDescriptor[];
    group: GroupDescriptor[];
    filter: CompositeFilterDescriptor | null;
}