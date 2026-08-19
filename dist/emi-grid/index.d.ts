import * as emi_grid from 'emi-grid';
import * as _angular_core from '@angular/core';
import { TemplateRef, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { SVGIcon } from '@progress/kendo-svg-icons';
import { Observable } from 'rxjs';

/**
 * `<ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex" let-column="column">`
 * Được chiếu vào 1 cột (`kendo-grid-column`). Context: `$implicit` = dataItem,
 * `rowIndex`, `column`.
 */
declare class CellTemplateDirective {
    templateRef: TemplateRef<any>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CellTemplateDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<CellTemplateDirective, "[kendoGridCellTemplate]", never, {}, {}, never, never, true, never>;
}

/**
 * `<ng-template kendoGridHeaderTemplate let-column>` — template cho header cell
 * của cột. Context: `$implicit` = column.
 */
declare class HeaderTemplateDirective {
    templateRef: TemplateRef<any>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<HeaderTemplateDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<HeaderTemplateDirective, "[kendoGridHeaderTemplate]", never, {}, {}, never, never, true, never>;
}

/**
 * `<ng-template kendoGridFooterTemplate let-column="column" let-aggregates="aggregates">`
 * Template cho footer cell của cột (grid footer + group footer).
 * Context: `$implicit` = aggregate result của field, `column`, `aggregates`.
 */
declare class FooterTemplateDirective {
    templateRef: TemplateRef<any>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<FooterTemplateDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<FooterTemplateDirective, "[kendoGridFooterTemplate]", never, {}, {}, never, never, true, never>;
}

/**
 * Types tương đương API của `@progress/kendo-data-query` (clean-room).
 * Contract chốt từ SPEC.md §6 (đã verify chéo 3 agents vs .d.ts).
 */
type SortOrder = 'asc' | 'desc';
interface SortDescriptor {
    field: string;
    dir?: SortOrder;
}
/** 16 string values khớp enum Kendo (SPEC §5.3) */
declare enum FilterOperator {
    Contains = "contains",
    DoesNotContain = "doesnotcontain",
    DoesNotEndWith = "doesnotendwith",
    DoesNotStartWith = "doesnotstartwith",
    EndsWith = "endswith",
    EqualTo = "eq",
    GreaterThan = "gt",
    GreaterThanOrEqual = "gte",
    IsEmpty = "isempty",
    IsNotEmpty = "isnotempty",
    IsNotNull = "isnotnull",
    IsNull = "isnull",
    LessThan = "lt",
    LessThanOrEqual = "lte",
    NotEqualTo = "neq",
    StartsWith = "startswith"
}
type FilterOperatorType = FilterOperator | string | Function;
interface FilterDescriptor {
    field?: string | Function;
    operator: FilterOperatorType;
    value?: any;
    ignoreCase?: boolean;
}
interface CompositeFilterDescriptor {
    logic: 'or' | 'and';
    filters: Array<FilterDescriptor | CompositeFilterDescriptor>;
}
type Filter = CompositeFilterDescriptor;
interface AggregateDescriptor {
    field: string;
    aggregate: 'count' | 'sum' | 'average' | 'min' | 'max';
}
interface GroupDescriptor {
    field: string;
    dir?: SortOrder;
    aggregates?: AggregateDescriptor[];
}
interface AggregateResultValue {
    count?: number;
    sum?: number;
    average?: number;
    min?: number;
    max?: number;
}
interface AggregateResult {
    [fieldName: string]: AggregateResultValue;
}
interface GroupResult {
    items: Object[];
    aggregates: AggregateResult;
    field: string;
    value: any;
}
interface DataResult {
    data: any[];
    total: number;
}
interface State {
    skip?: number;
    take?: number;
    sort?: SortDescriptor[];
    filter?: CompositeFilterDescriptor;
    group?: GroupDescriptor[];
}
type ColumnSortSettings = boolean | {
    allowUnsort?: boolean;
    initialDirection?: SortOrder;
};
type SortSettings = boolean | (ColumnSortSettings & {
    mode?: 'single' | 'multiple';
    showIndexes?: boolean;
});
type FilterableSettings = boolean | 'row' | 'menu' | 'menu, row';
interface SelectableSettings {
    enabled?: boolean;
    checkboxOnly?: boolean;
    mode?: 'single' | 'multiple';
    cell?: boolean;
    drag?: boolean;
}
interface GroupableSettings {
    enabled: boolean;
    emptyText?: string;
    showFooter: boolean;
}
type ScrollMode = 'none' | 'scrollable' | 'virtual';
interface PagerSettings {
    buttonCount?: number;
    info?: boolean;
    type?: 'numeric' | 'input';
    pageSizes?: boolean | number[];
    previousNext?: boolean;
}

/**
 * ColumnBase — 18 @Input binding chung cho mọi loại cột
 * (SPEC §3.1). KHÔNG có selector riêng; dùng làm base directive cho
 * ColumnComponent và các column type khác (group/checkbox/command/span — v1.1).
 * Không abstract để `autoGenerateColumns` có thể `new ColumnBase()` tạo cột động.
 */
declare class ColumnBase {
    isGenerated: boolean;
    /**
     * Tiêu đề cột hiển thị trên header cell.
     */
    title: string | undefined;
    /**
     * Chiều rộng cột (px hoặc chuỗi CSS).
     */
    width: number | string | undefined;
    /**
     * Ẩn/hiện cột.
     */
    hidden: boolean;
    /**
     * Cột cố định (locked) — behavior hoàn chỉnh ở v1.1 (locked columns).
     */
    locked: boolean;
    /**
     * Cho phép cột bị lock/unlock khi bật locked columns (v1.1).
     */
    lockable: boolean;
    /**
     * Cho phép resize cột (v1.1).
     */
    resizable: boolean;
    /**
     * Cho phép reorder cột (v1.1).
     */
    reorderable: boolean;
    /**
     * Tự resize theo nội dung (v1.1).
     */
    autoSize: boolean;
    /**
     * Chiều rộng tối thiểu khi resize (px).
     */
    minResizableWidth: number;
    /**
     * Media query để responsive ẩn/hiện cột (v1.1).
     */
    media: string | undefined;
    /**
     * Cột xuất hiện trong column menu / column chooser (v1.2).
     */
    columnMenu: boolean;
    /**
     * Cột xuất hiện trong column chooser.
     */
    includeInChooser: boolean;
    /**
     * CSS class cho cell — template attribute binding là `[class]`
     * (ɵdir map `"cssClass":"class"`).
     */
    cssClass: string | undefined;
    /**
     * CSS class cho header cell.
     */
    headerClass: string | undefined;
    /**
     * CSS class cho footer cell.
     */
    footerClass: string | undefined;
    /**
     * Inline style cho cell — object (vd `{ 'text-align': 'right' }`).
     */
    style: {
        [key: string]: string;
    } | undefined;
    /**
     * Inline style cho header cell.
     */
    headerStyle: {
        [key: string]: string;
    } | undefined;
    /**
     * Inline style cho footer cell.
     */
    footerStyle: {
        [key: string]: string;
    } | undefined;
    /** Field của cột (chiếu vào dataItem). */
    field: string | undefined;
    /** Cho phép sort theo cột này. */
    sortable: boolean | ColumnSortSettings;
    /** Filterable của riêng cột. */
    filterable: boolean;
    protected cellTemplateDirective: CellTemplateDirective | undefined;
    protected headerTemplateDirective: HeaderTemplateDirective | undefined;
    protected footerTemplateDirective: FooterTemplateDirective | undefined;
    /** TemplateRef của cell template (nếu có `<ng-template kendoGridCellTemplate>`). */
    get cellTemplateRef(): TemplateRef<any> | null;
    /** TemplateRef của header template (nếu có). */
    get headerTemplateRef(): TemplateRef<any> | null;
    /** TemplateRef của footer template (nếu có `<ng-template kendoGridFooterTemplate>`). */
    get footerTemplateRef(): TemplateRef<any> | null;
    /** colspan của header cell (column group > 1). */
    get colspan(): number;
    /** Là column group (`kendo-grid-column-group`)? */
    isColumnGroup(): boolean;
    /** Là span column (`kendo-grid-span-column`)? */
    isSpanColumn(): boolean;
    /** Là command column (`kendo-grid-command-column`)? */
    isCommandColumn(): boolean;
    /** Là checkbox column (`kendo-grid-checkbox-column`)? */
    isCheckboxColumn(): boolean;
    /** Là radio column (`kendo-grid-radio-column`)? */
    isRadioColumn(): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ColumnBase, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<ColumnBase, never, never, { "title": { "alias": "title"; "required": false; }; "width": { "alias": "width"; "required": false; }; "hidden": { "alias": "hidden"; "required": false; }; "locked": { "alias": "locked"; "required": false; }; "lockable": { "alias": "lockable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "reorderable": { "alias": "reorderable"; "required": false; }; "autoSize": { "alias": "autoSize"; "required": false; }; "minResizableWidth": { "alias": "minResizableWidth"; "required": false; }; "media": { "alias": "media"; "required": false; }; "columnMenu": { "alias": "columnMenu"; "required": false; }; "includeInChooser": { "alias": "includeInChooser"; "required": false; }; "cssClass": { "alias": "cssClass"; "required": false; }; "headerClass": { "alias": "headerClass"; "required": false; }; "footerClass": { "alias": "footerClass"; "required": false; }; "style": { "alias": "style"; "required": false; }; "headerStyle": { "alias": "headerStyle"; "required": false; }; "footerStyle": { "alias": "footerStyle"; "required": false; }; }, {}, ["cellTemplateDirective", "headerTemplateDirective", "footerTemplateDirective"], never, true, never>;
}

/**
 * `<ng-template kendoGridNoRecordsTemplate>` — nội dung hiển thị khi không có
 * records (empty state của grid).
 */
declare class NoRecordsTemplateDirective {
    templateRef: TemplateRef<any>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<NoRecordsTemplateDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<NoRecordsTemplateDirective, "[kendoGridNoRecordsTemplate]", never, {}, {}, never, never, true, never>;
}

/**
 * `<ng-template kendoGridDetailTemplate let-dataItem let-index="index">`
 * Template cho detail row của master detail. Context: `$implicit` = dataItem, `index`.
 */
declare class DetailTemplateDirective {
    templateRef: TemplateRef<any>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DetailTemplateDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<DetailTemplateDirective, "[kendoGridDetailTemplate]", never, {}, {}, never, never, true, never>;
}

/**
 * The data type that is expected by the Grid (SPEC §6 DataResult).
 * `data` có thể là toàn bộ records (total = data.length) hoặc 1 trang
 * (page data + total thật từ server).
 */
interface GridDataResult extends DataResult {
}
/** @hidden — iterator nội bộ (khớp contract .d.ts DataResultIterator) */
declare class DataResultIterator {
    private source;
    private isGridDataResultFlag;
    constructor(source: GridDataResult | any[], skip?: number);
    get total(): number;
    get data(): any[];
    map(fn: (item: any, index: number, array: any[]) => any): any[];
    filter(fn: (item: any, index: number, array: any[]) => boolean): any[];
    reduce(fn: (prev: any, cur: any, index: number, array: any[]) => any, init: any): any;
    forEach(fn: (item: any, index: number, array: any[]) => void): void;
    some(fn: (value: any, index: number, array: any[]) => boolean): boolean;
    toString(): string;
}
/**
 * DataCollection — wrapper read-only quanh iterator (khớp contract .d.ts,
 * dùng làm data source cho grid rendering / virtualization).
 */
declare class DataCollection {
    private accessor;
    constructor(accessor: () => DataResultIterator);
    get total(): number;
    get length(): number;
    get first(): any;
    get last(): any;
    at(index: number): any;
    map(fn: (item: any, index: number, array: any[]) => any): any[];
    filter(fn: (item: any, index: number, array: any[]) => boolean): any[];
    reduce(fn: (prev: any, cur: any, index: number, array: any[]) => any, init: any): any;
    forEach(fn: (item: any, index: number, array: any[]) => void): void;
    some(fn: (value: any, index: number, array: any[]) => boolean): boolean;
    toString(): string;
}
/** Tiện ích: tạo DataCollection từ data source + vị trí skip. */
declare function toCollection(data: GridDataResult | any[], skip?: number): DataCollection;

/**
 * Arguments for the `pageChange` event (khớp contract .d.ts — interface, không phải class).
 */
interface PageChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
}
/**
 * Arguments for the `dataStateChange` event (khớp contract .d.ts).
 */
interface DataStateChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
    /**
     * The sort descriptors by which the data is sorted.
     */
    sort?: Array<SortDescriptor>;
    /**
     * The group descriptors by which the data is grouped.
     */
    group?: Array<GroupDescriptor>;
    /**
     * The filter descriptor by which the data is filtered.
     */
    filter?: CompositeFilterDescriptor;
}

/** Item trong grid view (data row / group / detail) — dùng cho trackBy. */
interface GridItem {
    type: 'data' | 'detail' | 'group' | 'groupFooter' | 'no-data' | 'inactive';
    dataItem?: any;
    dataRowIndex?: number;
    index?: string;
    group?: GroupResult;
    level?: number;
    colspan?: number;
}
/** Context cho `rowClass` */
interface RowClassArgs {
    dataItem: any;
    index: number;
}
type RowClassFn = (context: RowClassArgs) => string;
/** Context cho `rowSelected` */
interface RowSelectedArgs extends RowClassArgs {
    dataRowIndex?: number;
}
type RowSelectedFn = (context: RowSelectedArgs) => boolean;
/** Context cho `cellSelected` */
interface CellSelectedArgs {
    dataItem: any;
    rowIndex: number;
    column: any;
}
type CellSelectedFn = (context: CellSelectedArgs) => boolean;
/**
 * Column menu settings — full API bổ sung khi implement column menu (v1.2).
 * Selector `kendo-grid-column-menu` tương ứng.
 */
interface ColumnMenuSettings {
    [key: string]: any;
}
/** Arguments cho `selectionChange` (SPEC §5.2) */
interface SelectionEvent {
    selectedRows?: Array<GridItem>;
    deselectedRows?: Array<GridItem>;
    selectedCells?: Array<CellSelectedArgs>;
    deselectedCells?: Array<CellSelectedArgs>;
    ctrlKey?: boolean;
    shiftKey?: boolean;
}
/** Arguments cho `detailExpand` / `detailCollapse` */
interface DetailExpandEvent {
    dataItem: any;
    index: number;
    expand: boolean;
}
/** Arguments cho `groupExpand` / `groupCollapse` */
interface GroupExpandCollapseEvent {
    group: GroupResult;
    groupIndex: string;
}
/** Arguments cho `columnReorder` (khi user drag header để đổi thứ tự cột). */
interface ColumnReorderEvent {
    column: ColumnBase;
    oldIndex: number;
    newIndex: number;
    columns: ColumnBase[];
}
/** Arguments cho `edit` / `save` / `cancel` / `remove` (row-edit mode). */
interface EditEvent {
    dataItem: any;
    isNew: boolean;
    rowIndex?: number;
}
/** Trạng thái nội bộ grid — phục vụ dữ liệu binding khi cần. */
interface GridState {
    skip: number;
    take: number;
    sort: SortDescriptor[];
    group: GroupDescriptor[];
    filter: CompositeFilterDescriptor | null;
}

type GridViewRow = {
    type: 'group';
    group: GroupResult;
    index: string;
} | {
    type: 'footer';
    group: GroupResult;
    index: string;
} | {
    type: 'data';
    dataItem: any;
    dataIndex: number;
    index: string;
};
interface GridHeaderCell {
    column: ColumnBase;
    colspan: number;
    rowspan: number;
    isGroup: boolean;
}
/**
 * GridComponent — selector `kendo-grid`, API-compatible với
 * `kendo-angular-grid` 4.8.4 (SPEC §2). Standalone + signals.
 *
 * State flow:
 * - Inputs `skip`/`sort`/`filter`/`group`/`pageSize` (từ parent) sync vào
 *   internal signals qua `effect`.
 * - User interaction (click sort header / pager) mutate internal signals và
 *   emit `sortChange`/`pageChange`/`dataStateChange` — parent có thể bắt và
 *   trả lại qua inputs (two-way), hoặc để grid tự xử lý client-side.
 * - `data` dạng `GridDataResult` (server-driven) → grid KHÔNG tự process,
 *   render nguyên trang + dùng `total` từ server.
 */
declare class GridComponent {
    readonly sortAscIcon: SVGIcon;
    readonly sortDescIcon: SVGIcon;
    readonly firstIcon: SVGIcon;
    readonly prevIcon: SVGIcon;
    readonly nextIcon: SVGIcon;
    readonly lastIcon: SVGIcon;
    readonly expandOpenIcon: SVGIcon;
    readonly expandClosedIcon: SVGIcon;
    readonly groupButtonIcon: SVGIcon;
    readonly columnsMenuIcon: SVGIcon;
    readonly menuSortAscIcon: SVGIcon;
    readonly menuSortDescIcon: SVGIcon;
    readonly editCmdIcon: SVGIcon;
    readonly trashCmdIcon: SVGIcon;
    readonly saveCmdIcon: SVGIcon;
    readonly cancelCmdIcon: SVGIcon;
    private readonly sanitizer;
    private readonly elementRef;
    /** Render nội dung SVG icon (path) an toàn qua [innerHTML]. */
    iconHtml(icon: SVGIcon): SafeHtml;
    /** Width cột cho colgroup — number → px, string → giữ nguyên. */
    colWidthStyle(col: ColumnBase): {
        width: string;
    } | null;
    /** Dữ liệu nguồn: mảng (client-side) hoặc `GridDataResult` (server-driven). */
    readonly data: _angular_core.InputSignal<any[] | GridDataResult | null>;
    /** Chế độ scroll: 'none' | 'scrollable' | 'virtual'. */
    readonly scrollable: _angular_core.InputSignal<ScrollMode>;
    /** Bật/tắt selection (v1: chỉ ảnh hưởng khi có rowSelected). */
    readonly selectable: _angular_core.InputSignal<boolean | SelectableSettings>;
    /** Hàm trackBy cho rows (TrackByFunction<GridItem>). */
    readonly trackBy: _angular_core.InputSignal<((index: number, item: GridItem) => any) | undefined>;
    /** Virtual columns (v2). */
    readonly virtualColumns: _angular_core.InputSignal<boolean>;
    /** Tự sinh cột từ keys của data khi không khai báo cột nào (SPEC §6.1). */
    readonly autoGenerateColumns: _angular_core.InputSignal<boolean>;
    /** Bật/tắt filtering — 'row' | 'menu' | 'menu, row' (filter row UI: v1.1). */
    readonly filterable: _angular_core.InputSignal<FilterableSettings>;
    /** Bật/tắt sorting + settings. */
    readonly sortable: _angular_core.InputSignal<SortSettings>;
    /** Bật/tắt paging + settings. */
    readonly pageable: _angular_core.InputSignal<boolean | PagerSettings>;
    /** Bật/tắt grouping (v1.1). */
    readonly groupable: _angular_core.InputSignal<boolean | GroupableSettings>;
    /** Keyboard navigation (deferred). */
    readonly navigable: _angular_core.InputSignal<boolean>;
    /** Auto-resize cột theo nội dung (v1.1). */
    readonly autoSize: _angular_core.InputSignal<boolean>;
    /** Cho phép resize cột (v1.1). */
    readonly resizable: _angular_core.InputSignal<boolean>;
    /** Cho phép reorder cột (v1.1). */
    readonly reorderable: _angular_core.InputSignal<boolean>;
    /** Hiển thị loading overlay. */
    readonly loading: _angular_core.InputSignal<boolean>;
    /** Bật tắt column menu (v1.2). */
    readonly columnMenu: _angular_core.InputSignal<boolean | ColumnMenuSettings>;
    /** Aggregates cho grid footer (client-side, tính trên toàn bộ data đã filter). */
    readonly aggregates: _angular_core.InputSignal<AggregateDescriptor[]>;
    /** Hiển thị toolbar column chooser (nút Columns toggle visibility các cột). */
    readonly columnChooser: _angular_core.InputSignal<boolean>;
    /** Ẩn header. */
    readonly hideHeader: _angular_core.InputSignal<boolean>;
    /** Skip hiện tại (page offset). */
    readonly skip: _angular_core.InputSignal<number>;
    /** Sort descriptors hiện tại. */
    readonly sort: _angular_core.InputSignal<SortDescriptor[]>;
    /** Group descriptors hiện tại (v1.1). */
    readonly group: _angular_core.InputSignal<GroupDescriptor[]>;
    /** Deprecated alias của `navigable`. */
    readonly navigatable: _angular_core.InputSignal<boolean>;
    /** Hàm trả CSS class cho mỗi row: `(context: RowClassArgs) => string`. */
    readonly rowClass: _angular_core.InputSignal<RowClassFn | undefined>;
    /** Hàm xác định row được chọn (highlight). */
    readonly rowSelected: _angular_core.InputSignal<RowSelectedFn | undefined>;
    /** Hàm xác định cell được chọn. */
    readonly cellSelected: _angular_core.InputSignal<CellSelectedFn | undefined>;
    /** Hàm xác định detail row mở rộng hay không. */
    readonly isDetailExpanded: _angular_core.InputSignal<((dataItem: any, index: number) => boolean) | undefined>;
    /** Số records mỗi trang. */
    readonly pageSize: _angular_core.InputSignal<number>;
    /** Chiều cao grid (px). */
    readonly height: _angular_core.InputSignal<number | undefined>;
    /** Chiều cao row — virtual scroll (v2). */
    readonly rowHeight: _angular_core.InputSignal<number>;
    /** Chiều cao detail row (v1.1). */
    readonly detailRowHeight: _angular_core.InputSignal<number>;
    /** Field unique key giữ trạng thái expand qua paging (kendo: detailExpandBy). */
    readonly detailExpandBy: _angular_core.InputSignal<string | undefined>;
    /** Bật inline editing (double-click cell → input, Enter lưu / Esc hủy). */
    readonly editable: _angular_core.InputSignal<boolean>;
    /** Filter descriptors hiện tại. */
    readonly filter: _angular_core.InputSignal<CompositeFilterDescriptor | null>;
    /** Phát khi user thay đổi filter (filter row UI: v1.1). */
    readonly filterChange: _angular_core.OutputEmitterRef<CompositeFilterDescriptor>;
    /** Phát khi user đổi trang. */
    readonly pageChange: _angular_core.OutputEmitterRef<PageChangeEvent>;
    /** Phát khi user thay đổi group (v1.1). */
    readonly groupChange: _angular_core.OutputEmitterRef<GroupDescriptor[]>;
    /** Phát khi user click sort header. */
    readonly sortChange: _angular_core.OutputEmitterRef<SortDescriptor[]>;
    /** Phát khi user select/deselect (selection: v1.1). */
    readonly selectionChange: _angular_core.OutputEmitterRef<SelectionEvent>;
    /** Phát khi bất kỳ state nào (sort/page/filter/group) thay đổi. */
    readonly dataStateChange: _angular_core.OutputEmitterRef<DataStateChangeEvent>;
    /** Phát khi `setGridState()` được gọi (state persistence) — khớp Kendo: chỉ set programmatic mới fire. */
    readonly stateChange: _angular_core.OutputEmitterRef<DataStateChangeEvent>;
    /** Phát khi user drag header để đổi thứ tự cột. */
    readonly columnReorder: _angular_core.OutputEmitterRef<ColumnReorderEvent>;
    /** Phát khi user click Edit (row-edit mode). */
    readonly edit: _angular_core.OutputEmitterRef<EditEvent>;
    /** Phát khi user lưu row đang edit. */
    readonly save: _angular_core.OutputEmitterRef<EditEvent>;
    /** Phát khi user hủy row-edit. */
    readonly cancel: _angular_core.OutputEmitterRef<EditEvent>;
    /** Phát khi user click Remove. */
    readonly remove: _angular_core.OutputEmitterRef<EditEvent>;
    /** Phát khi mở detail row. */
    readonly detailExpand: _angular_core.OutputEmitterRef<DetailExpandEvent>;
    /** Phát khi đóng detail row. */
    readonly detailCollapse: _angular_core.OutputEmitterRef<DetailExpandEvent>;
    /** Phát khi mở group (v1.1). */
    readonly groupExpand: _angular_core.OutputEmitterRef<GroupExpandCollapseEvent>;
    /** Phát khi đóng group (v1.1). */
    readonly groupCollapse: _angular_core.OutputEmitterRef<GroupExpandCollapseEvent>;
    /** Phát khi nhấn Enter/blur để lưu 1 cell edit. */
    readonly cellChange: _angular_core.OutputEmitterRef<{
        dataItem: any;
        field: string;
        value: any;
    }>;
    /** Phát khi đóng cell editor (lưu hoặc hủy). */
    readonly cellClose: _angular_core.OutputEmitterRef<{
        dataItem: any;
        field: string;
        rowIndex: number;
    }>;
    /** Các cột khai báo trong template (`kendo-grid-column`...). */
    readonly columns: _angular_core.Signal<readonly ColumnBase[]>;
    readonly noRecordsTemplate: _angular_core.Signal<NoRecordsTemplateDirective | undefined>;
    /** Detail template (`kendoGridDetailTemplate`) — master detail active khi có. */
    readonly detailTemplate: _angular_core.Signal<DetailTemplateDirective | undefined>;
    private readonly skipState;
    private readonly pageSizeState;
    private readonly sortState;
    private readonly filterState;
    private readonly groupState;
    private readonly expandedKeys;
    /** Bump để force re-render khi mutate thuộc tính column (resize/hidden). */
    private readonly layoutVersion;
    /** Bump khi có media query của cột đổi trạng thái (responsive columns). */
    private readonly mediaVersion;
    /** Thứ tự cột sau khi reorder (null = dùng thứ tự khai báo). */
    private readonly reorderColumns;
    /** Các dataItem đang được chọn (identity-based, giữ qua paging). */
    private readonly selectedKeys;
    /** Group index đang collapse (vd "0", "0_1"). Rỗng = tất cả expanded. */
    private readonly collapsedGroups;
    /** Cell đang edit: { dataItem, field, value } hoặc null. */
    private readonly editState;
    /** DataItem đang row-edit (null = không edit row nào). */
    private readonly editRowData;
    /** Bản copy giá trị row đang edit — commit mới ghi vào dataItem gốc. */
    private readonly editRowBuffer;
    /** Column đang mở column menu (null = đóng). */
    private readonly menuColumn;
    /** Column chooser đang mở. */
    private readonly chooserOpenSignal;
    /** Data đang render (writable interior) — feed từ `data` input hoặc `setData()` (DataBindingDirective). */
    private readonly dataState;
    private autoGenCache;
    private autoGenFirst;
    private readonly generatedColumns;
    private buildAutoColumns;
    /** Column không bị hidden — dùng cho header + body. */
    readonly visibleColumns: _angular_core.Signal<ColumnBase[]>;
    /** Cột bị ẩn bởi media query (`col.media` không khớp viewport hiện tại) — responsive columns. */
    isMediaHidden(col: ColumnBase): boolean;
    readonly leafColumns: _angular_core.Signal<ColumnBase[]>;
    /** Cột body render: group được flatten nhưng span column giữ nguyên (merged cell). */
    readonly bodyColumns: _angular_core.Signal<ColumnBase[]>;
    readonly headerRows: _angular_core.Signal<GridHeaderCell[][]>;
    private headerDepth;
    private fillHeaderRows;
    /** Kết quả query: server-driven → render nguyên trang; client-side → filter+sort+page. */
    readonly result: _angular_core.Signal<emi_grid.DataResult>;
    /** Data rows hiển thị trên view. */
    readonly viewData: _angular_core.Signal<any[]>;
    /** Kết quả aggregates cho grid footer (tính trên data đã filter, trước paging). */
    readonly gridAggregates: _angular_core.Signal<AggregateResult>;
    showGridFooter(): boolean;
    /** Aggregate results của 1 field (undefined nếu field rỗng hoặc không có aggregate). */
    aggregateValueFor(col: ColumnBase, aggregates: AggregateResult | undefined): AggregateResultValue | undefined;
    /** Aggregate text cho 1 cột (vd "Sum: 142.50") — rỗng nếu cột không có aggregate. */
    gridAggregateTextFor(col: ColumnBase): string;
    /** Aggregate text cho group footer của 1 cột — đọc từ `group.aggregates`. */
    groupAggregateTextFor(col: ColumnBase, group: GroupResult): string;
    private formatAggregateValue;
    /** Tổng records (sau filter, trước page) hoặc total của server. */
    readonly total: _angular_core.Signal<number>;
    /** Số cột hiển thị (cho colspan của empty row). */
    readonly columnsCount: _angular_core.Signal<number>;
    private readonly pageSizeValue;
    /** Danh sách 0-based page index. */
    readonly pages: _angular_core.Signal<number[]>;
    /** Page hiện tại (1-based). */
    readonly currentPage: _angular_core.Signal<number>;
    readonly pagerInfo: _angular_core.Signal<string>;
    isFilterRow(): boolean;
    isSelectionEnabled(): boolean;
    isGroupableEnabled(): boolean;
    isGrouped(): boolean;
    isGroupFooterEnabled(): boolean;
    isResizable(): boolean;
    isColumnMenuEnabled(): boolean;
    /** View rows khi grouping active: flatten (group headers + items + footers) rồi paging. */
    readonly viewRows: _angular_core.Signal<GridViewRow[]>;
    private flattenGroups;
    groupItemCount(group: GroupResult): number;
    constructor();
    setData(value: GridDataResult | any[] | null): void;
    getGridState(): DataStateChangeEvent;
    setGridState(state: DataStateChangeEvent): void;
    isColumnLocked(col: ColumnBase): boolean;
    spanColspan(col: ColumnBase): number | null;
    spanTemplateRef(col: ColumnBase): TemplateRef<any> | null;
    spanChildren(col: ColumnBase): ColumnBase[];
    lockedOffsetFor(col: ColumnBase): number | null;
    private columnPixelWidth;
    private dragState;
    isReorderableColumn(col: ColumnBase): boolean;
    isReorderDragging(col: ColumnBase): boolean;
    startReorder(event: MouseEvent, col: ColumnBase): void;
    onReorderMove(event: MouseEvent): void;
    onReorderEnd(_event: MouseEvent): void;
    private reorderTargetIndex;
    sortColumn(col: ColumnBase): void;
    /** Sort descriptor đang áp dụng cho 1 cột (null nếu chưa sort). */
    sortDescriptorFor(col: ColumnBase): SortDescriptor | null;
    headerClassFor(col: ColumnBase): string;
    private isGridSortable;
    private sortSettings;
    isPageable(): boolean;
    gotoPage(pageIndex: number): void;
    trackItemFn(index: number, dataItem: any): any;
    rowClassFor(dataItem: any, index: number): string;
    getValue(dataItem: any, field: string): any;
    private detailKeyFor;
    isRowExpanded(dataItem: any, index: number): boolean;
    toggleRow(dataItem: any, index: number): void;
    filterValueFor(col: ColumnBase): string;
    applyColumnFilter(col: ColumnBase, event: Event): void;
    isRowSelected(dataItem: any): boolean;
    get allSelected(): boolean;
    get someSelected(): boolean;
    toggleAllRows(): void;
    toggleRowSelection(dataItem: any): void;
    /** Radio column: chọn đúng 1 row (thay thế toàn bộ selection hiện tại). */
    selectRowOnly(dataItem: any): void;
    checkboxShowSelectAll(col: ColumnBase): boolean;
    private emitSelectionChange;
    startResize(event: MouseEvent, col: ColumnBase): void;
    extraCellsCount(): number;
    isGroupedBy(col: ColumnBase): boolean;
    toggleGroupForColumn(col: ColumnBase): void;
    isGroupCollapsed(index: string): boolean;
    toggleGroup(index: string, group: GroupResult): void;
    isColumnMenuOpen(col: ColumnBase): boolean;
    chooserOpen(): boolean;
    toggleChooser(): void;
    /** Các cột xuất hiện trong column chooser (body columns, không includeInChooser=false). */
    chooserColumns(): ColumnBase[];
    toggleColumnMenu(col: ColumnBase, event?: Event): void;
    onDocumentClick(): void;
    closeColumnMenu(): void;
    toggleColumnVisibility(col: ColumnBase): void;
    isColumnVisible(col: ColumnBase): boolean;
    menuSort(col: ColumnBase, dir: SortOrder): void;
    beginEdit(dataItem: any, col: ColumnBase, rowIndex: number): void;
    isCellEditing(dataItem: any, col: ColumnBase): boolean;
    editValue(): string;
    onEditInput(event: Event): void;
    commitEdit(): void;
    cancelEdit(): void;
    isRowEditing(dataItem: any): boolean;
    commandVisible(col: ColumnBase, kind: 'edit' | 'remove' | 'save' | 'cancel'): boolean;
    startRowEdit(dataItem: any): void;
    editBufferValueFor(field: string): any;
    onRowEditInput(field: string, event: Event): void;
    saveRowEdit(): void;
    cancelRowEdit(): void;
    removeRow(dataItem: any): void;
    private emitDataState;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<GridComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<GridComponent, "kendo-grid", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; "scrollable": { "alias": "scrollable"; "required": false; "isSignal": true; }; "selectable": { "alias": "selectable"; "required": false; "isSignal": true; }; "trackBy": { "alias": "trackBy"; "required": false; "isSignal": true; }; "virtualColumns": { "alias": "virtualColumns"; "required": false; "isSignal": true; }; "autoGenerateColumns": { "alias": "autoGenerateColumns"; "required": false; "isSignal": true; }; "filterable": { "alias": "filterable"; "required": false; "isSignal": true; }; "sortable": { "alias": "sortable"; "required": false; "isSignal": true; }; "pageable": { "alias": "pageable"; "required": false; "isSignal": true; }; "groupable": { "alias": "groupable"; "required": false; "isSignal": true; }; "navigable": { "alias": "navigable"; "required": false; "isSignal": true; }; "autoSize": { "alias": "autoSize"; "required": false; "isSignal": true; }; "resizable": { "alias": "resizable"; "required": false; "isSignal": true; }; "reorderable": { "alias": "reorderable"; "required": false; "isSignal": true; }; "loading": { "alias": "loading"; "required": false; "isSignal": true; }; "columnMenu": { "alias": "columnMenu"; "required": false; "isSignal": true; }; "aggregates": { "alias": "aggregates"; "required": false; "isSignal": true; }; "columnChooser": { "alias": "columnChooser"; "required": false; "isSignal": true; }; "hideHeader": { "alias": "hideHeader"; "required": false; "isSignal": true; }; "skip": { "alias": "skip"; "required": false; "isSignal": true; }; "sort": { "alias": "sort"; "required": false; "isSignal": true; }; "group": { "alias": "group"; "required": false; "isSignal": true; }; "navigatable": { "alias": "navigatable"; "required": false; "isSignal": true; }; "rowClass": { "alias": "rowClass"; "required": false; "isSignal": true; }; "rowSelected": { "alias": "rowSelected"; "required": false; "isSignal": true; }; "cellSelected": { "alias": "cellSelected"; "required": false; "isSignal": true; }; "isDetailExpanded": { "alias": "isDetailExpanded"; "required": false; "isSignal": true; }; "pageSize": { "alias": "pageSize"; "required": false; "isSignal": true; }; "height": { "alias": "height"; "required": false; "isSignal": true; }; "rowHeight": { "alias": "rowHeight"; "required": false; "isSignal": true; }; "detailRowHeight": { "alias": "detailRowHeight"; "required": false; "isSignal": true; }; "detailExpandBy": { "alias": "detailExpandBy"; "required": false; "isSignal": true; }; "editable": { "alias": "editable"; "required": false; "isSignal": true; }; "filter": { "alias": "filter"; "required": false; "isSignal": true; }; }, { "filterChange": "filterChange"; "pageChange": "pageChange"; "groupChange": "groupChange"; "sortChange": "sortChange"; "selectionChange": "selectionChange"; "dataStateChange": "dataStateChange"; "stateChange": "stateChange"; "columnReorder": "columnReorder"; "edit": "edit"; "save": "save"; "cancel": "cancel"; "remove": "remove"; "detailExpand": "detailExpand"; "detailCollapse": "detailCollapse"; "groupExpand": "groupExpand"; "groupCollapse": "groupCollapse"; "cellChange": "cellChange"; "cellClose": "cellClose"; }, ["columns", "noRecordsTemplate", "detailTemplate"], never, true, never>;
}

/**
 * Cột chuẩn của grid — selector `kendo-grid-column`.
 *
 * ```html
 * <kendo-grid-column field="ProductName" title="Tên sản phẩm" width="200">
 *   <ng-template kendoGridCellTemplate let-dataItem>{{ dataItem.ProductName }}</ng-template>
 * </kendo-grid-column>
 * ```
 */
declare class ColumnComponent extends ColumnBase {
    /**
     * Tên field trong dataItem (hỗ trợ path lồng nhau 'a.b.c').
     */
    field: string | undefined;
    /**
     * Định dạng giá trị khi hiển thị (số/ngày) — apply v1.1.
     */
    format: any | undefined;
    /**
     * Cho phép sort theo cột này + settings riêng.
     */
    sortable: boolean | ColumnSortSettings;
    /**
     * Cho phép group theo cột này (v1.1).
     */
    groupable: boolean;
    /**
     * Kiểu editor khi editing (v1.2).
     */
    editor: 'text' | 'numeric' | 'date' | 'boolean' | undefined;
    /**
     * Kiểu filter cell hiển thị (v1.1).
     */
    filter: 'text' | 'numeric' | 'boolean' | 'date' | undefined;
    /**
     * Cho phép filter theo cột này.
     */
    filterable: boolean;
    /**
     * Cho phép edit cột này (v1.2).
     */
    editable: boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ColumnComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ColumnComponent, "kendo-grid-column", never, { "field": { "alias": "field"; "required": false; }; "format": { "alias": "format"; "required": false; }; "sortable": { "alias": "sortable"; "required": false; }; "groupable": { "alias": "groupable"; "required": false; }; "editor": { "alias": "editor"; "required": false; }; "filter": { "alias": "filter"; "required": false; }; "filterable": { "alias": "filterable"; "required": false; }; "editable": { "alias": "editable"; "required": false; }; }, {}, never, ["*"], true, never>;
}

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
declare class ColumnGroupComponent extends ColumnBase {
    children: QueryList<ColumnBase>;
    isColumnGroup(): boolean;
    /** Các cột con không bị hidden. */
    visibleChildren(): ColumnBase[];
    /** Flatten tất cả cột lá (không bị hidden) dưới group này. */
    leafColumns(): ColumnBase[];
    /** Số cell header chiếm dụng (số cột lá visible). */
    get colspan(): number;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<ColumnGroupComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<ColumnGroupComponent, "kendo-grid-column-group", never, {}, {}, ["children"], ["*"], true, never>;
}

/**
 * Cột command cho row-edit — selector `kendo-grid-command-column`.
 *
 * ```html
 * <kendo-grid-command-column title="Actions" width="120"></kendo-grid-command-column>
 * ```
 */
declare class CommandColumnComponent extends ColumnBase {
    field: string | undefined;
    sortable: boolean | ColumnSortSettings;
    filterable: boolean;
    resizable: boolean;
    width: number;
    edit: boolean;
    remove: boolean;
    save: boolean;
    cancel: boolean;
    isCommandColumn(): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CommandColumnComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CommandColumnComponent, "kendo-grid-command-column", never, { "field": { "alias": "field"; "required": false; }; "sortable": { "alias": "sortable"; "required": false; }; "filterable": { "alias": "filterable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "width": { "alias": "width"; "required": false; }; "edit": { "alias": "edit"; "required": false; }; "remove": { "alias": "remove"; "required": false; }; "save": { "alias": "save"; "required": false; }; "cancel": { "alias": "cancel"; "required": false; }; }, {}, never, ["*"], true, never>;
}

/**
 * Cột checkbox cho row selection — selector `kendo-grid-checkbox-column`.
 *
 * ```html
 * <kendo-grid-checkbox-column title="Chọn" width="60"></kendo-grid-checkbox-column>
 * ```
 */
declare class CheckboxColumnComponent extends ColumnBase {
    field: string | undefined;
    sortable: boolean | ColumnSortSettings;
    filterable: boolean;
    resizable: boolean;
    columnMenu: boolean;
    /** Hiển thị checkbox select-all ở header cell. */
    showSelectAll: boolean;
    isCheckboxColumn(): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<CheckboxColumnComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<CheckboxColumnComponent, "kendo-grid-checkbox-column", never, { "field": { "alias": "field"; "required": false; }; "sortable": { "alias": "sortable"; "required": false; }; "filterable": { "alias": "filterable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "columnMenu": { "alias": "columnMenu"; "required": false; }; "showSelectAll": { "alias": "showSelectAll"; "required": false; }; }, {}, never, ["*"], true, never>;
}

/**
 * Cột radio cho single selection — selector `kendo-grid-radio-column`.
 *
 * ```html
 * <kendo-grid-radio-column title="Chọn" width="60"></kendo-grid-radio-column>
 * ```
 */
declare class RadioColumnComponent extends ColumnBase {
    field: string | undefined;
    sortable: boolean | ColumnSortSettings;
    filterable: boolean;
    resizable: boolean;
    columnMenu: boolean;
    isRadioColumn(): boolean;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<RadioColumnComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<RadioColumnComponent, "kendo-grid-radio-column", never, { "field": { "alias": "field"; "required": false; }; "sortable": { "alias": "sortable"; "required": false; }; "filterable": { "alias": "filterable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "columnMenu": { "alias": "columnMenu"; "required": false; }; }, {}, never, ["*"], true, never>;
}

/**
 * `<ng-template kendoGridSpanCellTemplate let-dataItem>` — template cho merged cell
 * của span column. Context: `$implicit` = dataItem.
 */
declare class SpanCellTemplateDirective {
    templateRef: TemplateRef<any>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SpanCellTemplateDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<SpanCellTemplateDirective, "[kendoGridSpanCellTemplate]", never, {}, {}, never, never, true, never>;
}

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
declare class SpanColumnComponent extends ColumnBase {
    children: QueryList<ColumnBase>;
    sortable: boolean | ColumnSortSettings;
    filterable: boolean;
    resizable: boolean;
    columnMenu: boolean;
    protected spanCellTemplateDirective: SpanCellTemplateDirective | undefined;
    isSpanColumn(): boolean;
    /** TemplateRef của `<ng-template kendoGridSpanCellTemplate>` (nếu có). */
    get spanCellTemplateRef(): TemplateRef<any> | null;
    /** Các cột con không bị hidden. */
    visibleChildren(): ColumnBase[];
    /** Flatten tất cả cột lá dưới span column (tính colspan + colgroup). */
    leafColumns(): ColumnBase[];
    /** Số cột body cell chiếm dụng trong merged cell. */
    get colspan(): number;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<SpanColumnComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<SpanColumnComponent, "kendo-grid-span-column", never, { "sortable": { "alias": "sortable"; "required": false; }; "filterable": { "alias": "filterable"; "required": false; }; "resizable": { "alias": "resizable"; "required": false; }; "columnMenu": { "alias": "columnMenu"; "required": false; }; }, {}, ["spanCellTemplateDirective", "children"], ["*"], true, never>;
}

/**
 * Hàm nạp dữ liệu server-driven: nhận state hiện tại (skip/take/sort/group/filter),
 * trả `Observable<GridDataResult>`, `Promise<GridDataResult>` hoặc `GridDataResult` trực tiếp.
 */
type DataBindingFetch = (state: DataStateChangeEvent) => Observable<GridDataResult> | Promise<GridDataResult> | GridDataResult;
/**
 * Data Binding directive (khớp contract Kendo `kendoGridDataBinding`).
 *
 * Gắn lên `<kendo-grid>` để grid tự fetch khi user thay đổi state (sort/filter/page/group):
 *
 * ```html
 * <kendo-grid [kendoGridDataBinding]="fetchProducts" [pageable]="true"></kendo-grid>
 * ```
 */
declare class DataBindingDirective implements AfterViewInit, OnDestroy {
    protected grid: GridComponent;
    /** Hàm fetch dữ liệu (xem `DataBindingFetch`). */
    dataBinding: DataBindingFetch | undefined;
    private readonly destroy$;
    constructor(grid: GridComponent);
    ngAfterViewInit(): void;
    /** Kendo-compatible: nạp lại dữ liệu với state hiện tại của grid. */
    reload(): void;
    protected rebind(state: DataStateChangeEvent): void;
    private toObservable;
    ngOnDestroy(): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<DataBindingDirective, never>;
    static ɵdir: _angular_core.ɵɵDirectiveDeclaration<DataBindingDirective, "[kendoGridDataBinding]", never, { "dataBinding": { "alias": "kendoGridDataBinding"; "required": false; }; }, {}, never, never, true, never>;
}

/**
 * Truy cập field lồng nhau ('a.b.c') + field dạng Function — tương đương
 * `getter` của @progress/kendo-common.
 */
type FieldAccessor = string | Function;
declare function getter(field: FieldAccessor): (dataItem: any) => any;
declare function getValue(dataItem: any, field: FieldAccessor): any;

/**
 * Sort mảng theo danh sách SortDescriptor (multi-key, stable — JS sort
 * ES2019+ đã stable nên phần tử bằng nhau giữ nguyên thứ tự ban đầu).
 *
 * LƯU Ý (khớp oracle kendo-data-query 1.6.0): descriptor KHÔNG có `dir`
 * bị BỎ QUA hoàn toàn (không sort theo nó). Nếu không có descriptor nào
 * có `dir` → trả về copy giữ nguyên thứ tự.
 */
declare function orderBy(data: any[], descriptors?: SortDescriptor[]): any[];

type OperatorFn = (a: any, b: any, ignoreCase: boolean) => boolean;
declare const operators: Record<string, OperatorFn>;

/** Lọc mảng theo composite filter (and/or, lồng nhau). Không filter → copy nguyên mảng. */
declare function filterBy(data: any[], filter?: CompositeFilterDescriptor): any[];

/** Tính aggregates (count/sum/average/min/max) cho 1 mảng dữ liệu theo descriptors. */
declare function aggregatesFor(descriptors: AggregateDescriptor[], data: any[]): AggregateResult;
/**
 * Group data theo danh sách GroupDescriptor (multi-level) + tính aggregates.
 * Trả về GroupResult[] cho cấp 1 — khớp `groupBy` của kendo-data-query 1.6.0.
 * Descriptor không có `dir` → group value theo thứ tự xuất hiện (orderBy bỏ qua).
 */
declare function groupBy(data: any[], groups: GroupDescriptor[]): GroupResult[];

/**
 * Process data theo State (kendo-data-query `process`):
 *   filter → sort → group → paging
 * Group active → trả GroupResult[] (paging do GridComponent xử lý trên
 * flattened view). take = 0/undefined → không paging (trả toàn bộ).
 */
declare function process(data: any[], state: State): DataResult;
/** Cắt trang con từ mảng đã process — dùng khi pager đổi trang. */
declare function slicePage(data: any[], skip: number, take: number): any[];

export { CellTemplateDirective, CheckboxColumnComponent, ColumnBase, ColumnComponent, ColumnGroupComponent, CommandColumnComponent, DataBindingDirective, DataCollection, DataResultIterator, DetailTemplateDirective, FilterOperator, FooterTemplateDirective, GridComponent, HeaderTemplateDirective, NoRecordsTemplateDirective, RadioColumnComponent, SpanCellTemplateDirective, SpanColumnComponent, aggregatesFor, filterBy, operators as filterOperators, getValue, getter, groupBy, orderBy, process, slicePage, toCollection };
export type { AggregateDescriptor, AggregateResult, AggregateResultValue, CellSelectedArgs, CellSelectedFn, ColumnMenuSettings, ColumnReorderEvent, ColumnSortSettings, CompositeFilterDescriptor, DataBindingFetch, DataResult, DataStateChangeEvent, DetailExpandEvent, EditEvent, FieldAccessor, Filter, FilterDescriptor, FilterOperatorType, FilterableSettings, GridDataResult, GridItem, GridState, GroupDescriptor, GroupExpandCollapseEvent, GroupResult, GroupableSettings, PageChangeEvent, PagerSettings, RowClassArgs, RowClassFn, RowSelectedArgs, RowSelectedFn, ScrollMode, SelectableSettings, SelectionEvent, SortDescriptor, SortOrder, SortSettings, State };
