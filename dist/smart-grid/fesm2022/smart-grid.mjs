import * as i0 from '@angular/core';
import { inject, TemplateRef, Directive, ContentChild, Input, ElementRef, input, output, contentChildren, contentChild, signal, computed, effect, ChangeDetectionStrategy, Component, ContentChildren, NgModule } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { sortAscSmallIcon, sortDescSmallIcon, chevronDoubleLeftIcon, chevronLeftIcon, chevronRightIcon, chevronDoubleRightIcon, chevronDownIcon, groupIcon, columnsIcon, pencilIcon, trashIcon, checkIcon, xIcon } from '@progress/kendo-svg-icons';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { Subject, isObservable, from, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * `<ng-template kendoGridCellTemplate let-dataItem let-rowIndex="rowIndex" let-column="column">`
 * Được chiếu vào 1 cột (`kendo-grid-column`). Context: `$implicit` = dataItem,
 * `rowIndex`, `column`.
 */
class CellTemplateDirective {
    templateRef = inject(TemplateRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: CellTemplateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: CellTemplateDirective, isStandalone: true, selector: "[smartGridCellTemplate], [kendoGridCellTemplate]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: CellTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[smartGridCellTemplate], [kendoGridCellTemplate]',
                    standalone: true,
                }]
        }] });

/**
 * `<ng-template kendoGridHeaderTemplate let-column>` — template cho header cell
 * của cột. Context: `$implicit` = column.
 */
class HeaderTemplateDirective {
    templateRef = inject(TemplateRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: HeaderTemplateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: HeaderTemplateDirective, isStandalone: true, selector: "[smartGridHeaderTemplate], [kendoGridHeaderTemplate]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: HeaderTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[smartGridHeaderTemplate], [kendoGridHeaderTemplate]',
                    standalone: true,
                }]
        }] });

/**
 * `<ng-template kendoGridFooterTemplate let-column="column" let-aggregates="aggregates">`
 * Template cho footer cell của cột (grid footer + group footer).
 * Context: `$implicit` = aggregate result của field, `column`, `aggregates`.
 */
class FooterTemplateDirective {
    templateRef = inject(TemplateRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: FooterTemplateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: FooterTemplateDirective, isStandalone: true, selector: "[smartGridFooterTemplate], [kendoGridFooterTemplate]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: FooterTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[smartGridFooterTemplate], [kendoGridFooterTemplate]',
                    standalone: true,
                }]
        }] });

/**
 * ColumnBase — 18 @Input binding chung cho mọi loại cột
 * (SPEC §3.1). KHÔNG có selector riêng; dùng làm base directive cho
 * ColumnComponent và các column type khác (group/checkbox/command/span — v1.1).
 * Không abstract để `autoGenerateColumns` có thể `new ColumnBase()` tạo cột động.
 */
class ColumnBase {
    isGenerated = false;
    /**
     * Tiêu đề cột hiển thị trên header cell.
     */
    title;
    /**
     * Chiều rộng cột (px hoặc chuỗi CSS).
     */
    width;
    /**
     * Ẩn/hiện cột.
     */
    hidden = false;
    /**
     * Cột cố định (locked) — behavior hoàn chỉnh ở v1.1 (locked columns).
     */
    locked = false;
    /**
     * Cho phép cột bị lock/unlock khi bật locked columns (v1.1).
     */
    lockable = false;
    /**
     * Cho phép resize cột (v1.1).
     */
    resizable = true;
    /**
     * Cho phép reorder cột (v1.1).
     */
    reorderable = true;
    /**
     * Tự resize theo nội dung (v1.1).
     */
    autoSize = false;
    /**
     * Chiều rộng tối thiểu khi resize (px).
     */
    minResizableWidth = 10;
    /**
     * Media query để responsive ẩn/hiện cột (v1.1).
     */
    media;
    /**
     * Cột xuất hiện trong column menu / column chooser (v1.2).
     */
    columnMenu = true;
    /**
     * Cột xuất hiện trong column chooser.
     */
    includeInChooser = true;
    /**
     * CSS class cho cell — template attribute binding là `[class]`
     * (ɵdir map `"cssClass":"class"`).
     */
    cssClass;
    /**
     * CSS class cho header cell.
     */
    headerClass;
    /**
     * CSS class cho footer cell.
     */
    footerClass;
    /**
     * Inline style cho cell — object (vd `{ 'text-align': 'right' }`).
     */
    style;
    /**
     * Inline style cho header cell.
     */
    headerStyle;
    /**
     * Inline style cho footer cell.
     */
    footerStyle;
    /* ── field & sortable: ghi đè ở cột concrete (ColumnComponent) ── */
    /** Field của cột (chiếu vào dataItem). */
    field = undefined;
    /** Cho phép sort theo cột này. */
    sortable = true;
    /** Filterable của riêng cột. */
    filterable = true;
    /* ── Templates (content children) ── */
    cellTemplateDirective;
    headerTemplateDirective;
    footerTemplateDirective;
    /** TemplateRef của cell template (nếu có `<ng-template kendoGridCellTemplate>`). */
    get cellTemplateRef() {
        return this.cellTemplateDirective?.templateRef ?? null;
    }
    /** TemplateRef của header template (nếu có). */
    get headerTemplateRef() {
        return this.headerTemplateDirective?.templateRef ?? null;
    }
    /** TemplateRef của footer template (nếu có `<ng-template kendoGridFooterTemplate>`). */
    get footerTemplateRef() {
        return this.footerTemplateDirective?.templateRef ?? null;
    }
    /* ── Layout helpers ── */
    /** colspan của header cell (column group > 1). */
    get colspan() {
        return 1;
    }
    /** Là column group (`kendo-grid-column-group`)? */
    isColumnGroup() {
        return false;
    }
    /** Là span column (`kendo-grid-span-column`)? */
    isSpanColumn() {
        return false;
    }
    /** Là command column (`kendo-grid-command-column`)? */
    isCommandColumn() {
        return false;
    }
    /** Là checkbox column (`kendo-grid-checkbox-column`)? */
    isCheckboxColumn() {
        return false;
    }
    /** Là radio column (`kendo-grid-radio-column`)? */
    isRadioColumn() {
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: ColumnBase, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: ColumnBase, isStandalone: true, inputs: { title: "title", width: "width", hidden: "hidden", locked: "locked", lockable: "lockable", resizable: "resizable", reorderable: "reorderable", autoSize: "autoSize", minResizableWidth: "minResizableWidth", media: "media", columnMenu: "columnMenu", includeInChooser: "includeInChooser", cssClass: "cssClass", headerClass: "headerClass", footerClass: "footerClass", style: "style", headerStyle: "headerStyle", footerStyle: "footerStyle" }, queries: [{ propertyName: "cellTemplateDirective", first: true, predicate: CellTemplateDirective, descendants: true }, { propertyName: "headerTemplateDirective", first: true, predicate: HeaderTemplateDirective, descendants: true }, { propertyName: "footerTemplateDirective", first: true, predicate: FooterTemplateDirective, descendants: true }], ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: ColumnBase, decorators: [{
            type: Directive,
            args: [{ standalone: true }]
        }], propDecorators: { title: [{
                type: Input
            }], width: [{
                type: Input
            }], hidden: [{
                type: Input
            }], locked: [{
                type: Input
            }], lockable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], reorderable: [{
                type: Input
            }], autoSize: [{
                type: Input
            }], minResizableWidth: [{
                type: Input
            }], media: [{
                type: Input
            }], columnMenu: [{
                type: Input
            }], includeInChooser: [{
                type: Input
            }], cssClass: [{
                type: Input
            }], headerClass: [{
                type: Input
            }], footerClass: [{
                type: Input
            }], style: [{
                type: Input
            }], headerStyle: [{
                type: Input
            }], footerStyle: [{
                type: Input
            }], cellTemplateDirective: [{
                type: ContentChild,
                args: [CellTemplateDirective]
            }], headerTemplateDirective: [{
                type: ContentChild,
                args: [HeaderTemplateDirective]
            }], footerTemplateDirective: [{
                type: ContentChild,
                args: [FooterTemplateDirective]
            }] } });

/**
 * `<ng-template kendoGridNoRecordsTemplate>` — nội dung hiển thị khi không có
 * records (empty state của grid).
 */
class NoRecordsTemplateDirective {
    templateRef = inject(TemplateRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: NoRecordsTemplateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: NoRecordsTemplateDirective, isStandalone: true, selector: "[smartGridNoRecordsTemplate], [kendoGridNoRecordsTemplate]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: NoRecordsTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[smartGridNoRecordsTemplate], [kendoGridNoRecordsTemplate]',
                    standalone: true,
                }]
        }] });

/**
 * `<ng-template kendoGridDetailTemplate let-dataItem let-index="index">`
 * Template cho detail row của master detail. Context: `$implicit` = dataItem, `index`.
 */
class DetailTemplateDirective {
    templateRef = inject(TemplateRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: DetailTemplateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: DetailTemplateDirective, isStandalone: true, selector: "[smartGridDetailTemplate], [kendoGridDetailTemplate]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: DetailTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[smartGridDetailTemplate], [kendoGridDetailTemplate]',
                    standalone: true,
                }]
        }] });

function getter(field) {
    if (field instanceof Function) {
        return field;
    }
    const parts = field.split('.');
    return (dataItem) => {
        let value = dataItem;
        for (const part of parts) {
            if (value == null) {
                return value;
            }
            value = value[part];
        }
        return value;
    };
}
function getValue(dataItem, field) {
    return getter(field)(dataItem);
}

const isString$1 = (value) => typeof value === 'string';
const isBlank = (value) => value === null || value === undefined;
function compareValues(a, b) {
    if (a === b || (isBlank(a) && isBlank(b))) {
        return 0;
    }
    if (isBlank(a)) {
        return -1;
    }
    if (isBlank(b)) {
        return 1;
    }
    if (isString$1(a) && isString$1(b)) {
        const la = a.toLowerCase();
        const lb = b.toLowerCase();
        if (la === lb) {
            return 0;
        }
        return la < lb ? -1 : 1;
    }
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}
/**
 * Sort mảng theo danh sách SortDescriptor (multi-key, stable — JS sort
 * ES2019+ đã stable nên phần tử bằng nhau giữ nguyên thứ tự ban đầu).
 *
 * LƯU Ý (khớp oracle kendo-data-query 1.6.0): descriptor KHÔNG có `dir`
 * bị BỎ QUA hoàn toàn (không sort theo nó). Nếu không có descriptor nào
 * có `dir` → trả về copy giữ nguyên thứ tự.
 */
function orderBy(data, descriptors) {
    if (!descriptors) {
        return data.slice();
    }
    const active = descriptors.filter((d) => d.dir !== undefined);
    if (active.length === 0) {
        return data.slice();
    }
    const result = data.slice();
    result.sort((a, b) => {
        for (const descriptor of active) {
            const accessor = getter(descriptor.field);
            const cmp = compareValues(accessor(a), accessor(b));
            if (cmp !== 0) {
                return descriptor.dir === 'desc' ? -cmp : cmp;
            }
        }
        return 0;
    });
    return result;
}

const isString = (value) => typeof value === 'string';
const isCompositeFilter = (filter) => typeof filter.logic === 'string' &&
    Array.isArray(filter.filters);
const normalize = (value, ignoreCase) => isString(value) && ignoreCase ? value.toLowerCase() : value;
const eq = (a, b, ignoreCase) => normalize(a, ignoreCase) === normalize(b, ignoreCase);
const neq = (a, b, ignoreCase) => !eq(a, b, ignoreCase);
const gt = (a, b, ignoreCase) => normalize(a, ignoreCase) > normalize(b, ignoreCase);
const gte = (a, b, ignoreCase) => normalize(a, ignoreCase) >= normalize(b, ignoreCase);
const lt = (a, b, ignoreCase) => normalize(a, ignoreCase) < normalize(b, ignoreCase);
const lte = (a, b, ignoreCase) => normalize(a, ignoreCase) <= normalize(b, ignoreCase);
const isnull = (a) => a === null || a === undefined;
const isnotnull = (a) => a !== null && a !== undefined;
const isempty = (a) => a === '' ||
    (Array.isArray(a) && a.length === 0) ||
    (a !== null && typeof a === 'object' && Object.keys(a).length === 0);
const isnotempty = (a, b, ignoreCase) => !isempty(a, b, ignoreCase);
const startswith = (a, b, ignoreCase) => isString(a) && isString(b) && normalize(a, ignoreCase).indexOf(normalize(b, ignoreCase)) === 0;
const endswith = (a, b, ignoreCase) => {
    if (!isString(a) || !isString(b)) {
        return false;
    }
    const na = normalize(a, ignoreCase);
    const nb = normalize(b, ignoreCase);
    return na.lastIndexOf(nb, na.length - nb.length) !== -1;
};
const contains = (a, b, ignoreCase) => isString(a) && isString(b) && normalize(a, ignoreCase).indexOf(normalize(b, ignoreCase)) !== -1;
const doesnotcontain = (a, b, ignoreCase) => !contains(a, b, ignoreCase);
const doesnotstartwith = (a, b, ignoreCase) => !startswith(a, b, ignoreCase);
const doesnotendwith = (a, b, ignoreCase) => !endswith(a, b, ignoreCase);
const operators = {
    contains,
    doesnotcontain,
    doesnotendwith,
    doesnotstartwith,
    endswith,
    eq,
    gt,
    gte,
    isempty,
    isnotempty,
    isnotnull,
    isnull,
    lt,
    lte,
    neq,
    startswith,
};
function matchesDescriptor(dataItem, filter) {
    const accessor = getter(filter.field);
    const value = accessor(dataItem);
    const operator = filter.operator;
    if (operator instanceof Function) {
        return operator(value, filter.value, filter.ignoreCase !== false);
    }
    const op = operators[operator];
    if (!op) {
        throw new Error(`Unknown filter operator: ${String(operator)}`);
    }
    return op(value, filter.value, filter.ignoreCase !== false);
}
function matchesFilter(dataItem, filter) {
    if (isCompositeFilter(filter)) {
        const predicate = (f) => matchesFilter(dataItem, f);
        return filter.logic === 'and' ? filter.filters.every(predicate) : filter.filters.some(predicate);
    }
    return matchesDescriptor(dataItem, filter);
}
/** Lọc mảng theo composite filter (and/or, lồng nhau). Không filter → copy nguyên mảng. */
function filterBy(data, filter) {
    if (!filter) {
        return data.slice();
    }
    return data.filter((item) => matchesFilter(item, filter));
}

/** Tính aggregates (count/sum/average/min/max) cho 1 mảng dữ liệu theo descriptors. */
function aggregatesFor(descriptors, data) {
    const result = {};
    for (const descriptor of descriptors) {
        const accessor = getter(descriptor.field);
        let value = {};
        switch (descriptor.aggregate) {
            case 'count':
                value = { count: data.length };
                break;
            case 'sum':
                value = { sum: data.reduce((acc, item) => acc + (Number(accessor(item)) || 0), 0) };
                break;
            case 'average': {
                const sum = data.reduce((acc, item) => acc + (Number(accessor(item)) || 0), 0);
                value = data.length ? { average: sum / data.length } : {};
                break;
            }
            case 'min': {
                const values = data.map(accessor).filter((v) => v !== null && v !== undefined);
                value = values.length ? { min: Math.min(...values) } : {};
                break;
            }
            case 'max': {
                const values = data.map(accessor).filter((v) => v !== null && v !== undefined);
                value = values.length ? { max: Math.max(...values) } : {};
                break;
            }
        }
        result[descriptor.field] = { ...result[descriptor.field], ...value };
    }
    return result;
}
function groupAtLevel(data, groups, level) {
    if (!groups.length) {
        return data;
    }
    const group = groups[0];
    const rest = groups.slice(1);
    const sorted = orderBy(data, groups.map((d) => ({ field: d.field, dir: d.dir })));
    const result = [];
    let current;
    let currentItems = [];
    for (const item of sorted) {
        const value = getter(group.field)(item);
        if (!current || current.value !== value) {
            if (current) {
                current.aggregates = group.aggregates ? aggregatesFor(group.aggregates, currentItems) : {};
                current.items = groupAtLevel(currentItems, rest, level + 1);
            }
            current = { field: group.field, value, items: [], aggregates: {} };
            currentItems = [];
            result.push(current);
        }
        currentItems.push(item);
    }
    if (current) {
        current.aggregates = group.aggregates ? aggregatesFor(group.aggregates, currentItems) : {};
        current.items = groupAtLevel(currentItems, rest, level + 1);
    }
    return result.length ? result : data;
}
/**
 * Group data theo danh sách GroupDescriptor (multi-level) + tính aggregates.
 * Trả về GroupResult[] cho cấp 1 — khớp `groupBy` của kendo-data-query 1.6.0.
 * Descriptor không có `dir` → group value theo thứ tự xuất hiện (orderBy bỏ qua).
 */
function groupBy(data, groups) {
    if (!groups || groups.length === 0) {
        return data;
    }
    return groupAtLevel(data, groups, 0);
}

/**
 * Process data theo State (kendo-data-query `process`):
 *   filter → sort → group → paging
 * Group active → trả GroupResult[] (paging do GridComponent xử lý trên
 * flattened view). take = 0/undefined → không paging (trả toàn bộ).
 */
function process(data, state) {
    const skip = state.skip || 0;
    const take = state.take || 0;
    let result = data;
    if (state.filter) {
        result = filterBy(result, state.filter);
    }
    if (state.sort && state.sort.length) {
        result = orderBy(result, state.sort);
    }
    const total = result.length;
    if (state.group && state.group.length) {
        return { data: groupBy(result, state.group), total };
    }
    if (take > 0 && skip < result.length) {
        result = result.slice(skip, skip + take);
    }
    return { data: result, total };
}
/** Cắt trang con từ mảng đã process — dùng khi pager đổi trang. */
function slicePage(data, skip, take) {
    return take > 0 ? data.slice(skip, skip + take) : data.slice();
}

const EMPTY_RESULT = { data: [], total: 0 };
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
class GridComponent {
    /* ── Icons (kendo-svg-icons) ───────────────────────────────────── */
    sortAscIcon = sortAscSmallIcon;
    sortDescIcon = sortDescSmallIcon;
    firstIcon = chevronDoubleLeftIcon;
    prevIcon = chevronLeftIcon;
    nextIcon = chevronRightIcon;
    lastIcon = chevronDoubleRightIcon;
    expandOpenIcon = chevronDownIcon;
    expandClosedIcon = chevronRightIcon;
    groupButtonIcon = groupIcon;
    columnsMenuIcon = columnsIcon;
    menuSortAscIcon = sortAscSmallIcon;
    menuSortDescIcon = sortDescSmallIcon;
    editCmdIcon = pencilIcon;
    trashCmdIcon = trashIcon;
    saveCmdIcon = checkIcon;
    cancelCmdIcon = xIcon;
    sanitizer = inject(DomSanitizer);
    elementRef = inject(ElementRef);
    /** Render nội dung SVG icon (path) an toàn qua [innerHTML]. */
    iconHtml(icon) {
        return this.sanitizer.bypassSecurityTrustHtml(icon.content);
    }
    /** Width cột cho colgroup — number → px, string → giữ nguyên. */
    colWidthStyle(col) {
        this.layoutVersion();
        if (typeof col.width === 'number') {
            return { width: `${col.width}px` };
        }
        if (typeof col.width === 'string') {
            return { width: col.width };
        }
        return null;
    }
    /* ── Inputs (29) — SPEC §2.1 ───────────────────────────────────── */
    /** Dữ liệu nguồn: mảng (client-side) hoặc `GridDataResult` (server-driven). */
    data = input(null, ...(ngDevMode ? [{ debugName: "data" }] : []));
    /** Chế độ scroll: 'none' | 'scrollable' | 'virtual'. */
    scrollable = input('scrollable', ...(ngDevMode ? [{ debugName: "scrollable" }] : []));
    /** Bật/tắt selection (v1: chỉ ảnh hưởng khi có rowSelected). */
    selectable = input(false, ...(ngDevMode ? [{ debugName: "selectable" }] : []));
    /** Hàm trackBy cho rows (TrackByFunction<GridItem>). */
    trackBy = input(undefined, ...(ngDevMode ? [{ debugName: "trackBy" }] : []));
    /** Virtual columns (v2). */
    virtualColumns = input(false, ...(ngDevMode ? [{ debugName: "virtualColumns" }] : []));
    /** Tự sinh cột từ keys của data khi không khai báo cột nào (SPEC §6.1). */
    autoGenerateColumns = input(false, ...(ngDevMode ? [{ debugName: "autoGenerateColumns" }] : []));
    /** Bật/tắt filtering — 'row' | 'menu' | 'menu, row' (filter row UI: v1.1). */
    filterable = input(false, ...(ngDevMode ? [{ debugName: "filterable" }] : []));
    /** Bật/tắt sorting + settings. */
    sortable = input(false, ...(ngDevMode ? [{ debugName: "sortable" }] : []));
    /** Bật/tắt paging + settings. */
    pageable = input(false, ...(ngDevMode ? [{ debugName: "pageable" }] : []));
    /** Bật/tắt grouping (v1.1). */
    groupable = input(false, ...(ngDevMode ? [{ debugName: "groupable" }] : []));
    /** Keyboard navigation (deferred). */
    navigable = input(false, ...(ngDevMode ? [{ debugName: "navigable" }] : []));
    /** Auto-resize cột theo nội dung (v1.1). */
    autoSize = input(false, ...(ngDevMode ? [{ debugName: "autoSize" }] : []));
    /** Cho phép resize cột (v1.1). */
    resizable = input(false, ...(ngDevMode ? [{ debugName: "resizable" }] : []));
    /** Cho phép reorder cột (v1.1). */
    reorderable = input(false, ...(ngDevMode ? [{ debugName: "reorderable" }] : []));
    /** Hiển thị loading overlay. */
    loading = input(false, ...(ngDevMode ? [{ debugName: "loading" }] : []));
    /** Bật tắt column menu (v1.2). */
    columnMenu = input(false, ...(ngDevMode ? [{ debugName: "columnMenu" }] : []));
    /** Aggregates cho grid footer (client-side, tính trên toàn bộ data đã filter). */
    aggregates = input([], ...(ngDevMode ? [{ debugName: "aggregates" }] : []));
    /** Hiển thị toolbar column chooser (nút Columns toggle visibility các cột). */
    columnChooser = input(false, ...(ngDevMode ? [{ debugName: "columnChooser" }] : []));
    /** Ẩn header. */
    hideHeader = input(false, ...(ngDevMode ? [{ debugName: "hideHeader" }] : []));
    /** Skip hiện tại (page offset). */
    skip = input(0, ...(ngDevMode ? [{ debugName: "skip" }] : []));
    /** Sort descriptors hiện tại. */
    sort = input([], ...(ngDevMode ? [{ debugName: "sort" }] : []));
    /** Group descriptors hiện tại (v1.1). */
    group = input([], ...(ngDevMode ? [{ debugName: "group" }] : []));
    /** Deprecated alias của `navigable`. */
    navigatable = input(false, ...(ngDevMode ? [{ debugName: "navigatable" }] : []));
    /** Hàm trả CSS class cho mỗi row: `(context: RowClassArgs) => string`. */
    rowClass = input(undefined, ...(ngDevMode ? [{ debugName: "rowClass" }] : []));
    /** Hàm xác định row được chọn (highlight). */
    rowSelected = input(undefined, ...(ngDevMode ? [{ debugName: "rowSelected" }] : []));
    /** Hàm xác định cell được chọn. */
    cellSelected = input(undefined, ...(ngDevMode ? [{ debugName: "cellSelected" }] : []));
    /** Hàm xác định detail row mở rộng hay không. */
    isDetailExpanded = input(undefined, ...(ngDevMode ? [{ debugName: "isDetailExpanded" }] : []));
    /** Số records mỗi trang. */
    pageSize = input(20, ...(ngDevMode ? [{ debugName: "pageSize" }] : []));
    /** Chiều cao grid (px). */
    height = input(undefined, ...(ngDevMode ? [{ debugName: "height" }] : []));
    /** Chiều cao row — virtual scroll (v2). */
    rowHeight = input(28, ...(ngDevMode ? [{ debugName: "rowHeight" }] : []));
    /** Chiều cao detail row (v1.1). */
    detailRowHeight = input(0, ...(ngDevMode ? [{ debugName: "detailRowHeight" }] : []));
    /** Field unique key giữ trạng thái expand qua paging (kendo: detailExpandBy). */
    detailExpandBy = input(undefined, ...(ngDevMode ? [{ debugName: "detailExpandBy" }] : []));
    /** Bật inline editing (double-click cell → input, Enter lưu / Esc hủy). */
    editable = input(false, ...(ngDevMode ? [{ debugName: "editable" }] : []));
    /** Filter descriptors hiện tại. */
    filter = input(null, ...(ngDevMode ? [{ debugName: "filter" }] : []));
    /* ── Outputs — SPEC §2.2 (các sự kiện feature đang active) ──────── */
    /** Phát khi user thay đổi filter (filter row UI: v1.1). */
    filterChange = output();
    /** Phát khi user đổi trang. */
    pageChange = output();
    /** Phát khi user thay đổi group (v1.1). */
    groupChange = output();
    /** Phát khi user click sort header. */
    sortChange = output();
    /** Phát khi user select/deselect (selection: v1.1). */
    selectionChange = output();
    /** Phát khi bất kỳ state nào (sort/page/filter/group) thay đổi. */
    dataStateChange = output();
    /** Phát khi `setGridState()` được gọi (state persistence) — khớp Kendo: chỉ set programmatic mới fire. */
    stateChange = output();
    /** Phát khi user drag header để đổi thứ tự cột. */
    columnReorder = output();
    /** Phát khi user click Edit (row-edit mode). */
    edit = output();
    /** Phát khi user lưu row đang edit. */
    save = output();
    /** Phát khi user hủy row-edit. */
    cancel = output();
    /** Phát khi user click Remove. */
    remove = output();
    /** Phát khi mở detail row. */
    detailExpand = output();
    /** Phát khi đóng detail row. */
    detailCollapse = output();
    /** Phát khi mở group (v1.1). */
    groupExpand = output();
    /** Phát khi đóng group (v1.1). */
    groupCollapse = output();
    /** Phát khi nhấn Enter/blur để lưu 1 cell edit. */
    cellChange = output();
    /** Phát khi đóng cell editor (lưu hoặc hủy). */
    cellClose = output();
    /* ── Content children ──────────────────────────────────────────── */
    /** Các cột khai báo trong template (`kendo-grid-column`...). */
    columns = contentChildren(ColumnBase, ...(ngDevMode ? [{ debugName: "columns" }] : []));
    noRecordsTemplate = contentChild(NoRecordsTemplateDirective, ...(ngDevMode ? [{ debugName: "noRecordsTemplate" }] : []));
    /** Detail template (`kendoGridDetailTemplate`) — master detail active khi có. */
    detailTemplate = contentChild(DetailTemplateDirective, ...(ngDevMode ? [{ debugName: "detailTemplate" }] : []));
    /* ── Internal state (writable signals, sync từ inputs) ─────────── */
    skipState = signal(0, ...(ngDevMode ? [{ debugName: "skipState" }] : []));
    pageSizeState = signal(20, ...(ngDevMode ? [{ debugName: "pageSizeState" }] : []));
    sortState = signal([], ...(ngDevMode ? [{ debugName: "sortState" }] : []));
    filterState = signal(null, ...(ngDevMode ? [{ debugName: "filterState" }] : []));
    groupState = signal([], ...(ngDevMode ? [{ debugName: "groupState" }] : []));
    expandedKeys = signal(new Set(), ...(ngDevMode ? [{ debugName: "expandedKeys" }] : []));
    /** Bump để force re-render khi mutate thuộc tính column (resize/hidden). */
    layoutVersion = signal(0, ...(ngDevMode ? [{ debugName: "layoutVersion" }] : []));
    /** Bump khi có media query của cột đổi trạng thái (responsive columns). */
    mediaVersion = signal(0, ...(ngDevMode ? [{ debugName: "mediaVersion" }] : []));
    /** Thứ tự cột sau khi reorder (null = dùng thứ tự khai báo). */
    reorderColumns = signal(null, ...(ngDevMode ? [{ debugName: "reorderColumns" }] : []));
    /** Các dataItem đang được chọn (identity-based, giữ qua paging). */
    selectedKeys = signal(new Set(), ...(ngDevMode ? [{ debugName: "selectedKeys" }] : []));
    /** Group index đang collapse (vd "0", "0_1"). Rỗng = tất cả expanded. */
    collapsedGroups = signal(new Set(), ...(ngDevMode ? [{ debugName: "collapsedGroups" }] : []));
    /** Cell đang edit: { dataItem, field, value } hoặc null. */
    editState = signal(null, ...(ngDevMode ? [{ debugName: "editState" }] : []));
    /** DataItem đang row-edit (null = không edit row nào). */
    editRowData = signal(null, ...(ngDevMode ? [{ debugName: "editRowData" }] : []));
    /** Bản copy giá trị row đang edit — commit mới ghi vào dataItem gốc. */
    editRowBuffer = signal(null, ...(ngDevMode ? [{ debugName: "editRowBuffer" }] : []));
    /** Column đang mở column menu (null = đóng). */
    menuColumn = signal(null, ...(ngDevMode ? [{ debugName: "menuColumn" }] : []));
    /** Column chooser đang mở. */
    chooserOpenSignal = signal(false, ...(ngDevMode ? [{ debugName: "chooserOpenSignal" }] : []));
    /** Data đang render (writable interior) — feed từ `data` input hoặc `setData()` (DataBindingDirective). */
    dataState = signal(null, ...(ngDevMode ? [{ debugName: "dataState" }] : []));
    autoGenCache = null;
    autoGenFirst = undefined;
    generatedColumns = computed(() => {
        this.layoutVersion();
        if (!this.autoGenerateColumns() || this.columns().length > 0) {
            this.autoGenCache = null;
            return [];
        }
        const source = this.dataState();
        const items = Array.isArray(source) ? source : (source?.data ?? []);
        const first = items.find((i) => i !== null && typeof i === 'object' && !Array.isArray(i));
        if (first === this.autoGenFirst && this.autoGenCache) {
            return this.autoGenCache;
        }
        this.autoGenFirst = first;
        this.autoGenCache = first ? this.buildAutoColumns(first) : [];
        return this.autoGenCache;
    }, ...(ngDevMode ? [{ debugName: "generatedColumns" }] : []));
    buildAutoColumns(sample) {
        return Object.keys(sample)
            .filter((key) => typeof sample[key] !== 'function')
            .map((key) => {
            const col = new ColumnBase();
            col.field = key;
            col.title = key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ');
            col.isGenerated = true;
            return col;
        });
    }
    /** Column không bị hidden — dùng cho header + body. */
    visibleColumns = computed(() => {
        this.layoutVersion();
        const declared = this.columns();
        const base = declared.length > 0 ? declared : this.generatedColumns();
        return (this.reorderColumns() ?? base).filter((col) => !col.hidden && !this.isMediaHidden(col));
    }, ...(ngDevMode ? [{ debugName: "visibleColumns" }] : []));
    /** Cột bị ẩn bởi media query (`col.media` không khớp viewport hiện tại) — responsive columns. */
    isMediaHidden(col) {
        this.mediaVersion();
        if (!col.media) {
            return false;
        }
        return !window.matchMedia(col.media).matches;
    }
    leafColumns = computed(() => {
        const leaves = [];
        for (const col of this.visibleColumns()) {
            if (col.isColumnGroup()) {
                leaves.push(...col.leafColumns());
            }
            else if (col.isSpanColumn()) {
                leaves.push(...col.leafColumns());
            }
            else {
                leaves.push(col);
            }
        }
        return leaves;
    }, ...(ngDevMode ? [{ debugName: "leafColumns" }] : []));
    /** Cột body render: group được flatten nhưng span column giữ nguyên (merged cell). */
    bodyColumns = computed(() => {
        const cols = [];
        for (const col of this.visibleColumns()) {
            if (col.isColumnGroup()) {
                cols.push(...col.leafColumns());
            }
            else {
                cols.push(col);
            }
        }
        return cols;
    }, ...(ngDevMode ? [{ debugName: "bodyColumns" }] : []));
    headerRows = computed(() => {
        this.layoutVersion();
        const cols = this.visibleColumns();
        const depth = this.headerDepth(cols);
        const rows = Array.from({ length: depth }, () => []);
        for (const col of cols) {
            this.fillHeaderRows(col, rows, 0, depth);
        }
        return rows;
    }, ...(ngDevMode ? [{ debugName: "headerRows" }] : []));
    headerDepth(cols) {
        let depth = 1;
        for (const col of cols) {
            const group = col;
            if (col.isColumnGroup() && group.visibleChildren().length > 0) {
                depth = Math.max(depth, 1 + this.headerDepth(group.visibleChildren()));
            }
        }
        return depth;
    }
    fillHeaderRows(col, rows, level, depth) {
        if (col.isColumnGroup()) {
            const group = col;
            const leaves = group.leafColumns();
            if (leaves.length === 0) {
                return;
            }
            rows[level].push({ column: col, colspan: leaves.length, rowspan: 1, isGroup: true });
            for (const child of group.visibleChildren()) {
                this.fillHeaderRows(child, rows, level + 1, depth);
            }
        }
        else {
            rows[level].push({ column: col, colspan: 1, rowspan: depth - level, isGroup: false });
        }
    }
    /** Kết quả query: server-driven → render nguyên trang; client-side → filter+sort+page. */
    result = computed(() => {
        const source = this.dataState();
        if (source === null || source === undefined) {
            return EMPTY_RESULT;
        }
        if (!Array.isArray(source)) {
            return { data: source.data, total: source.total };
        }
        return process(source, {
            sort: this.sortState(),
            filter: this.filterState() ?? undefined,
            group: this.groupState(),
            skip: this.skipState(),
            take: this.isPageable() ? this.pageSizeState() : 0,
        });
    }, ...(ngDevMode ? [{ debugName: "result" }] : []));
    /** Data rows hiển thị trên view. */
    viewData = computed(() => this.result().data, ...(ngDevMode ? [{ debugName: "viewData" }] : []));
    /** Kết quả aggregates cho grid footer (tính trên data đã filter, trước paging). */
    gridAggregates = computed(() => {
        const descriptors = this.aggregates();
        if (!descriptors.length) {
            return {};
        }
        const source = this.dataState();
        const items = Array.isArray(source) ? source : (source?.data ?? []);
        return aggregatesFor(descriptors, filterBy(items, this.filterState() ?? undefined));
    }, ...(ngDevMode ? [{ debugName: "gridAggregates" }] : []));
    showGridFooter() {
        return (this.aggregates().length > 0 ||
            this.bodyColumns().some((col) => col.footerTemplateRef !== null));
    }
    /** Aggregate results của 1 field (undefined nếu field rỗng hoặc không có aggregate). */
    aggregateValueFor(col, aggregates) {
        if (col.field === undefined || !aggregates) {
            return undefined;
        }
        return aggregates[col.field];
    }
    /** Aggregate text cho 1 cột (vd "Sum: 142.50") — rỗng nếu cột không có aggregate. */
    gridAggregateTextFor(col) {
        if (col.field === undefined || col.isSpanColumn()) {
            return '';
        }
        const agg = this.gridAggregates()[col.field];
        if (!agg) {
            return '';
        }
        return Object.keys(agg)
            .map((kind) => `${kind === 'average' ? 'Avg' : kind[0].toUpperCase() + kind.slice(1)}: ${this.formatAggregateValue(agg[kind])}`)
            .join(' | ');
    }
    /** Aggregate text cho group footer của 1 cột — đọc từ `group.aggregates`. */
    groupAggregateTextFor(col, group) {
        if (col.field === undefined || col.isSpanColumn()) {
            return '';
        }
        const agg = group.aggregates?.[col.field];
        if (!agg) {
            return '';
        }
        return Object.keys(agg)
            .map((kind) => `${kind === 'average' ? 'Avg' : kind[0].toUpperCase() + kind.slice(1)}: ${this.formatAggregateValue(agg[kind])}`)
            .join(' | ');
    }
    formatAggregateValue(value) {
        return value === undefined ? '' : String(value);
    }
    /** Tổng records (sau filter, trước page) hoặc total của server. */
    total = computed(() => this.result().total, ...(ngDevMode ? [{ debugName: "total" }] : []));
    /** Số cột hiển thị (cho colspan của empty row). */
    columnsCount = computed(() => Math.max(this.leafColumns().length, 1), ...(ngDevMode ? [{ debugName: "columnsCount" }] : []));
    pageSizeValue = computed(() => Math.max(1, this.pageSizeState()), ...(ngDevMode ? [{ debugName: "pageSizeValue" }] : []));
    /** Danh sách 0-based page index. */
    pages = computed(() => {
        const total = this.total();
        if (!total) {
            return [];
        }
        const count = Math.ceil(total / this.pageSizeValue());
        return Array.from({ length: count }, (_, i) => i);
    }, ...(ngDevMode ? [{ debugName: "pages" }] : []));
    /** Page hiện tại (1-based). */
    currentPage = computed(() => Math.floor(this.skipState() / this.pageSizeValue()) + 1, ...(ngDevMode ? [{ debugName: "currentPage" }] : []));
    pagerInfo = computed(() => `Page ${this.currentPage()} of ${Math.max(this.pages().length, 1)} (${this.total()} records)`, ...(ngDevMode ? [{ debugName: "pagerInfo" }] : []));
    /* ── Feature computed (filter row / selection / group / view) ──── */
    isFilterRow() {
        const value = this.filterable();
        return typeof value === 'string' ? value.includes('row') : value === true;
    }
    isSelectionEnabled() {
        const value = this.selectable();
        if (typeof value === 'boolean') {
            return value;
        }
        return value?.enabled ?? false;
    }
    isGroupableEnabled() {
        const value = this.groupable();
        if (typeof value === 'boolean') {
            return value;
        }
        return value?.enabled ?? false;
    }
    isGrouped() {
        return this.isGroupableEnabled() && this.groupState().length > 0;
    }
    isGroupFooterEnabled() {
        return this.groupState().some((d) => d.aggregates !== undefined && d.aggregates.length > 0);
    }
    isResizable() {
        return this.resizable() === true;
    }
    isColumnMenuEnabled() {
        const value = this.columnMenu();
        return typeof value === 'boolean' ? value : true;
    }
    /** View rows khi grouping active: flatten (group headers + items + footers) rồi paging. */
    viewRows = computed(() => {
        if (!this.isGrouped()) {
            return [];
        }
        const rows = [];
        const dataRef = { v: 0 };
        this.flattenGroups(this.result().data, rows, '', dataRef);
        const skip = this.skipState();
        const take = this.pageSizeValue();
        if (this.isPageable() && take > 0) {
            return rows.slice(skip, skip + take);
        }
        return rows;
    }, ...(ngDevMode ? [{ debugName: "viewRows" }] : []));
    flattenGroups(groups, rows, path, dataRef) {
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            const index = path ? `${path}_${i}` : `${i}`;
            rows.push({ type: 'group', group, index });
            if (this.collapsedGroups().has(index)) {
                continue;
            }
            const items = group.items;
            if (items.length > 0 && items[0].field !== undefined) {
                this.flattenGroups(items, rows, index, dataRef);
            }
            else {
                for (const item of items) {
                    rows.push({ type: 'data', dataItem: item, dataIndex: dataRef.v++, index: `${index}_${dataRef.v - 1}` });
                }
            }
            if (this.isGroupFooterEnabled()) {
                rows.push({ type: 'footer', group, index: `${index}_footer` });
            }
        }
    }
    groupItemCount(group) {
        const items = group.items;
        if (items.length > 0 && items[0].field !== undefined) {
            return items.reduce((acc, g) => acc + this.groupItemCount(g), 0);
        }
        return items.length;
    }
    constructor() {
        effect(() => {
            this.skipState.set(this.skip());
            this.pageSizeState.set(this.pageSize());
        });
        effect(() => this.sortState.set(this.sort()));
        effect(() => this.filterState.set(this.filter()));
        effect(() => this.groupState.set(this.group()));
        effect(() => this.dataState.set(this.data()));
        effect(() => {
            const cols = this.columns();
            this.mediaVersion();
            const cleanups = [];
            for (const col of cols) {
                if (!col.media) {
                    continue;
                }
                const mql = window.matchMedia(col.media);
                const onChange = () => this.mediaVersion.update((v) => v + 1);
                mql.addEventListener('change', onChange);
                cleanups.push(() => mql.removeEventListener('change', onChange));
            }
            return () => cleanups.forEach((fn) => fn());
        });
    }
    /* ── State management (server-driven / persistence) — SPEC §5 ───── */
    setData(value) {
        this.dataState.set(value);
    }
    getGridState() {
        return {
            skip: this.skipState(),
            take: this.pageSizeValue(),
            sort: this.sortState(),
            group: this.groupState(),
            filter: this.filterState() ?? undefined,
        };
    }
    setGridState(state) {
        if (state.skip !== undefined) {
            this.skipState.set(state.skip);
        }
        if (state.take !== undefined && state.take > 0) {
            this.pageSizeState.set(state.take);
        }
        if (state.sort) {
            this.sortState.set(state.sort);
        }
        if (state.group) {
            this.groupState.set(state.group);
        }
        if (state.filter !== undefined) {
            this.filterState.set(state.filter);
        }
        this.stateChange.emit(state);
    }
    /* ── Locked columns ────────────────────────────────────────────── */
    isColumnLocked(col) {
        if (col.locked) {
            return true;
        }
        if (col.isColumnGroup()) {
            const leaves = col.leafColumns();
            return leaves.length > 0 && leaves.every((c) => c.locked);
        }
        if (col.isSpanColumn()) {
            const leaves = col.leafColumns();
            return leaves.length > 0 && leaves.every((c) => c.locked);
        }
        return false;
    }
    spanColspan(col) {
        if (!col.isSpanColumn()) {
            return null;
        }
        return Math.max(col.leafColumns().length, 1);
    }
    spanTemplateRef(col) {
        return col.isSpanColumn() ? col.spanCellTemplateRef : null;
    }
    spanChildren(col) {
        return col.isSpanColumn() ? col.leafColumns() : [];
    }
    lockedOffsetFor(col) {
        this.layoutVersion();
        if (!this.isColumnLocked(col)) {
            return null;
        }
        const cols = this.leafColumns();
        let offset = 0;
        for (const c of cols) {
            if (c.locked) {
                if (c === col) {
                    return offset;
                }
                offset += this.columnPixelWidth(c);
            }
        }
        if (col.isColumnGroup()) {
            const first = col.leafColumns()[0];
            let before = 0;
            for (const c of cols) {
                if (c === first) {
                    break;
                }
                if (c.locked) {
                    before += this.columnPixelWidth(c);
                }
            }
            return before;
        }
        if (col.isSpanColumn()) {
            const first = col.leafColumns()[0];
            let before = 0;
            for (const c of cols) {
                if (c === first) {
                    break;
                }
                if (c.locked) {
                    before += this.columnPixelWidth(c);
                }
            }
            return before;
        }
        return offset;
    }
    columnPixelWidth(col) {
        if (typeof col.width === 'number') {
            return col.width;
        }
        if (typeof col.width === 'string') {
            const px = parseFloat(col.width);
            if (!isNaN(px)) {
                return px;
            }
        }
        return 100;
    }
    /* ── Column reorder ────────────────────────────────────────────── */
    dragState = null;
    isReorderableColumn(col) {
        return this.reorderable() && col.reorderable !== false && !col.isColumnGroup() && !col.isSpanColumn();
    }
    isReorderDragging(col) {
        return this.dragState?.col === col;
    }
    startReorder(event, col) {
        if (!this.isReorderableColumn(col)) {
            return;
        }
        const target = event.target;
        if (target.closest('.k-resize-handle, .k-column-menu-button, .k-grouping-header, .k-column-menu')) {
            return;
        }
        event.preventDefault();
        this.dragState = { col, fromIndex: this.leafColumns().indexOf(col) };
    }
    onReorderMove(event) {
        if (!this.dragState) {
            return;
        }
        const cols = this.leafColumns();
        const current = cols.indexOf(this.dragState.col);
        const target = this.reorderTargetIndex(event.clientX);
        if (target !== -1 && target !== current) {
            const next = [...cols];
            const [moving] = next.splice(current, 1);
            next.splice(target, 0, moving);
            this.reorderColumns.set(next);
        }
    }
    onReorderEnd(_event) {
        if (!this.dragState) {
            return;
        }
        const { col, fromIndex } = this.dragState;
        this.dragState = null;
        const newIndex = this.leafColumns().indexOf(col);
        if (newIndex !== fromIndex) {
            this.columnReorder.emit({ column: col, oldIndex: fromIndex, newIndex, columns: this.leafColumns() });
        }
    }
    reorderTargetIndex(clientX) {
        const ths = this.elementRef.nativeElement.querySelectorAll('thead.k-grid-header tr:last-of-type th:not(.k-hierarchy-cell):not(.k-checkbox-cell)');
        for (let i = 0; i < ths.length; i++) {
            const rect = ths[i].getBoundingClientRect();
            if (clientX < rect.left + rect.width / 2) {
                return i;
            }
        }
        return ths.length - 1;
    }
    /* ── Sorting ───────────────────────────────────────────────────── */
    sortColumn(col) {
        if (!this.isGridSortable() || col.isColumnGroup() || col.field === undefined || col.sortable === false) {
            return;
        }
        const field = col.field;
        const current = this.sortState();
        const existing = current.findIndex((d) => d.field === field);
        const settings = this.sortSettings();
        let next;
        if (existing !== -1) {
            const currentDir = current[existing].dir ?? 'asc';
            if (currentDir === 'desc' && settings.allowUnsort) {
                next = current.filter((_, i) => i !== existing);
            }
            else {
                const dir = currentDir === 'asc' ? 'desc' : 'asc';
                next =
                    settings.mode === 'single'
                        ? [{ field, dir }]
                        : current.map((d) => (d.field === field ? { field, dir } : d));
            }
        }
        else {
            const dir = settings.initialDirection;
            next = settings.mode === 'single' ? [{ field, dir }] : [...current, { field, dir }];
        }
        this.sortState.set(next);
        this.sortChange.emit(next);
        this.emitDataState();
    }
    /** Sort descriptor đang áp dụng cho 1 cột (null nếu chưa sort). */
    sortDescriptorFor(col) {
        if (col.field === undefined) {
            return null;
        }
        return this.sortState().find((d) => d.field === col.field) ?? null;
    }
    headerClassFor(col) {
        const classes = ['k-table-th', 'k-header'];
        const hc = col.headerClass;
        if (hc) {
            classes.push(hc);
        }
        if (this.isGridSortable() && col.sortable && !col.isColumnGroup() && col.field !== undefined) {
            classes.push('k-sortable');
        }
        if (this.sortDescriptorFor(col) !== null) {
            classes.push('k-sorted');
        }
        return classes.join(' ');
    }
    isGridSortable() {
        const value = this.sortable();
        return typeof value === 'boolean' ? value : true;
    }
    sortSettings() {
        const value = this.sortable();
        if (value === false) {
            return { mode: 'single', allowUnsort: true, initialDirection: 'asc' };
        }
        if (value === true) {
            return { mode: 'single', allowUnsort: true, initialDirection: 'asc' };
        }
        return {
            mode: value.mode ?? 'single',
            allowUnsort: value.allowUnsort ?? true,
            initialDirection: value.initialDirection ?? 'asc',
        };
    }
    /* ── Paging ────────────────────────────────────────────────────── */
    isPageable() {
        const value = this.pageable();
        return typeof value === 'boolean' ? value : true;
    }
    gotoPage(pageIndex) {
        const clamped = Math.min(Math.max(pageIndex, 0), Math.max(this.pages().length - 1, 0));
        const skip = clamped * this.pageSizeValue();
        const take = this.pageSizeValue();
        if (skip === this.skipState()) {
            return;
        }
        this.skipState.set(skip);
        this.pageChange.emit({ skip, take });
        this.emitDataState();
    }
    /* ── Row helpers ───────────────────────────────────────────────── */
    trackItemFn(index, dataItem) {
        const item = { type: 'data', dataItem, dataRowIndex: index };
        const fn = this.trackBy();
        return fn ? fn(index, item) : dataItem;
    }
    rowClassFor(dataItem, index) {
        const classes = ['k-master-row', 'k-table-row'];
        const rowClassFn = this.rowClass();
        if (rowClassFn) {
            const custom = rowClassFn({ dataItem, index });
            if (custom) {
                classes.push(custom);
            }
        }
        const rowSelectedFn = this.rowSelected();
        if (rowSelectedFn && rowSelectedFn({ dataItem, index })) {
            classes.push('k-selected');
        }
        return classes.join(' ');
    }
    getValue(dataItem, field) {
        return getValue(dataItem, field);
    }
    /* ── Master detail ─────────────────────────────────────────────── */
    detailKeyFor(dataItem, index) {
        const field = this.detailExpandBy();
        return field !== undefined ? getValue(dataItem, field) : index;
    }
    isRowExpanded(dataItem, index) {
        const fn = this.isDetailExpanded();
        if (fn) {
            return fn(dataItem, index);
        }
        return this.expandedKeys().has(this.detailKeyFor(dataItem, index));
    }
    toggleRow(dataItem, index) {
        const fn = this.isDetailExpanded();
        if (fn) {
            const expand = !fn(dataItem, index);
            (expand ? this.detailExpand : this.detailCollapse).emit({ dataItem, index, expand });
            return;
        }
        const key = this.detailKeyFor(dataItem, index);
        const expanded = this.expandedKeys().has(key);
        const next = new Set(this.expandedKeys());
        if (expanded) {
            next.delete(key);
        }
        else {
            next.add(key);
        }
        this.expandedKeys.set(next);
        (expanded ? this.detailCollapse : this.detailExpand).emit({ dataItem, index, expand: !expanded });
    }
    /* ── Filter row ────────────────────────────────────────────────── */
    filterValueFor(col) {
        if (col.field === undefined) {
            return '';
        }
        const filters = this.filterState()?.filters;
        const match = filters?.find((f) => !Array.isArray(f) && f.field === col.field);
        return match ? String(match.value ?? '') : '';
    }
    applyColumnFilter(col, event) {
        if (col.field === undefined) {
            return;
        }
        const value = event.target.value;
        const existing = this.filterState();
        const filters = existing?.filters ?? [];
        const rest = filters.filter((f) => !Array.isArray(f) && f.field !== col.field);
        let next;
        if (value === '') {
            next = rest.length ? { logic: 'and', filters: rest } : { logic: 'and', filters: [] };
        }
        else {
            const sample = this.result().data[0];
            const raw = sample !== undefined ? getValue(sample, col.field) : undefined;
            const operator = typeof raw === 'number' ? 'eq' : 'contains';
            const filterValue = typeof raw === 'number' ? Number(value) : value;
            const descriptor = { field: col.field, operator, value: filterValue };
            next = { logic: 'and', filters: [...rest, descriptor] };
        }
        this.filterState.set(next);
        this.skipState.set(0);
        this.filterChange.emit(next);
        this.emitDataState();
    }
    /* ── Selection ─────────────────────────────────────────────────── */
    isRowSelected(dataItem) {
        return this.selectedKeys().has(dataItem);
    }
    get allSelected() {
        const view = this.viewData();
        return view.length > 0 && view.every((item) => this.selectedKeys().has(item));
    }
    get someSelected() {
        const view = this.viewData();
        return view.some((item) => this.selectedKeys().has(item));
    }
    toggleAllRows() {
        const view = this.viewData();
        const next = new Set(this.selectedKeys());
        const deselectedRows = [];
        if (this.allSelected) {
            for (const item of view) {
                if (next.delete(item)) {
                    deselectedRows.push(item);
                }
            }
            this.selectedKeys.set(next);
            this.emitSelectionChange([], deselectedRows);
        }
        else {
            for (const item of view) {
                next.add(item);
            }
            this.selectedKeys.set(next);
            this.emitSelectionChange(view.slice(), []);
        }
    }
    toggleRowSelection(dataItem) {
        const selectable = this.selectable();
        const single = typeof selectable !== 'boolean' && selectable.mode === 'single';
        const next = new Set(single ? [] : this.selectedKeys());
        let deselected = [];
        if (next.has(dataItem)) {
            next.delete(dataItem);
            deselected = [dataItem];
            this.selectedKeys.set(next);
            this.emitSelectionChange([], deselected);
            return;
        }
        if (single) {
            deselected = [...this.selectedKeys()];
        }
        this.selectedKeys.set(next);
        next.add(dataItem);
        this.selectedKeys.set(next);
        this.emitSelectionChange([dataItem], single ? deselected : []);
    }
    /** Radio column: chọn đúng 1 row (thay thế toàn bộ selection hiện tại). */
    selectRowOnly(dataItem) {
        if (this.isRowSelected(dataItem)) {
            return;
        }
        const deselected = [...this.selectedKeys()];
        this.selectedKeys.set(new Set([dataItem]));
        this.emitSelectionChange([dataItem], deselected);
    }
    checkboxShowSelectAll(col) {
        return col.isCheckboxColumn() && col.showSelectAll === true;
    }
    emitSelectionChange(selected, deselected) {
        this.selectionChange.emit({
            selectedRows: selected.map((dataItem) => ({ type: 'data', dataItem, dataRowIndex: 0 })),
            deselectedRows: deselected.map((dataItem) => ({ type: 'data', dataItem, dataRowIndex: 0 })),
        });
    }
    /* ── Resizable columns ─────────────────────────────────────────── */
    startResize(event, col) {
        if (!this.isResizable() || col.isColumnGroup() || col.isSpanColumn() || col.isCommandColumn() || col.isCheckboxColumn() || col.isRadioColumn()) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startWidth = typeof col.width === 'number' ? col.width : col.width ? parseInt(col.width, 10) : 100;
        const min = col.minResizableWidth;
        const onMove = (moveEvent) => {
            const next = Math.max(min, startWidth + (moveEvent.clientX - startX));
            col.width = next;
            this.layoutVersion.update((v) => v + 1);
        };
        const onUp = () => {
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }
    /* ── Grouping ──────────────────────────────────────────────────── */
    extraCellsCount() {
        return (this.detailTemplate() ? 1 : 0) + (this.isSelectionEnabled() ? 1 : 0);
    }
    isGroupedBy(col) {
        return col.field !== undefined && this.groupState().some((d) => d.field === col.field);
    }
    toggleGroupForColumn(col) {
        if (col.field === undefined || !this.isGroupableEnabled()) {
            return;
        }
        const current = this.groupState();
        const existing = current.findIndex((d) => d.field === col.field);
        const next = existing !== -1
            ? current.filter((_, i) => i !== existing)
            : [...current, { field: col.field, dir: (this.sortDescriptorFor(col)?.dir ?? 'asc') }];
        this.groupState.set(next);
        this.collapsedGroups.set(new Set());
        this.skipState.set(0);
        this.groupChange.emit(next);
        this.emitDataState();
    }
    isGroupCollapsed(index) {
        return this.collapsedGroups().has(index);
    }
    toggleGroup(index, group) {
        const next = new Set(this.collapsedGroups());
        const event = { group, groupIndex: index };
        if (next.has(index)) {
            next.delete(index);
            this.groupExpand.emit(event);
        }
        else {
            next.add(index);
            this.groupCollapse.emit(event);
        }
        this.collapsedGroups.set(next);
    }
    /* ── Column menu ───────────────────────────────────────────────── */
    isColumnMenuOpen(col) {
        return this.menuColumn() === col;
    }
    chooserOpen() {
        return this.chooserOpenSignal();
    }
    toggleChooser() {
        this.chooserOpenSignal.set(!this.chooserOpenSignal());
    }
    /** Các cột xuất hiện trong column chooser (body columns, không includeInChooser=false). */
    chooserColumns() {
        return this.bodyColumns().filter((col) => col.includeInChooser);
    }
    toggleColumnMenu(col, event) {
        if (event) {
            event.stopPropagation();
        }
        this.menuColumn.set(this.menuColumn() === col ? null : col);
    }
    onDocumentClick() {
        this.menuColumn.set(null);
        this.chooserOpenSignal.set(false);
    }
    closeColumnMenu() {
        this.menuColumn.set(null);
    }
    toggleColumnVisibility(col) {
        col.hidden = !col.hidden;
        this.layoutVersion.update((v) => v + 1);
        if (col.hidden && this.menuColumn() === col) {
            this.menuColumn.set(null);
        }
    }
    isColumnVisible(col) {
        return !col.hidden;
    }
    menuSort(col, dir) {
        if (col.field === undefined) {
            return;
        }
        const next = [{ field: col.field, dir }];
        this.sortState.set(next);
        this.sortChange.emit(next);
        this.emitDataState();
        this.menuColumn.set(null);
    }
    /* ── Inline editing ────────────────────────────────────────────── */
    beginEdit(dataItem, col, rowIndex) {
        if (!this.editable() || col.field === undefined || col.isColumnGroup() || this.editRowData() !== null) {
            return;
        }
        this.editState.set({ dataItem, field: col.field, value: String(getValue(dataItem, col.field) ?? '') });
        this.cellClose.emit({ dataItem, field: col.field, rowIndex });
    }
    isCellEditing(dataItem, col) {
        const edit = this.editState();
        return edit !== null && edit.dataItem === dataItem && edit.field === col.field;
    }
    editValue() {
        return this.editState()?.value ?? '';
    }
    onEditInput(event) {
        const edit = this.editState();
        if (edit) {
            this.editState.set({ ...edit, value: event.target.value });
        }
    }
    commitEdit() {
        const edit = this.editState();
        if (edit) {
            edit.dataItem[edit.field] = edit.value;
            this.cellChange.emit({ dataItem: edit.dataItem, field: edit.field, value: edit.value });
            this.layoutVersion.update((v) => v + 1);
        }
        this.editState.set(null);
    }
    cancelEdit() {
        this.editState.set(null);
    }
    /* ── Row editing (command column) ──────────────────────────────── */
    isRowEditing(dataItem) {
        return this.editRowData() === dataItem;
    }
    commandVisible(col, kind) {
        if (!col.isCommandColumn()) {
            return false;
        }
        const cmd = col;
        return cmd[kind] === true;
    }
    startRowEdit(dataItem) {
        if (this.editRowData() !== null) {
            return;
        }
        this.editRowData.set(dataItem);
        this.editRowBuffer.set({ ...dataItem });
        this.edit.emit({ dataItem, isNew: false, rowIndex: this.viewData().indexOf(dataItem) });
    }
    editBufferValueFor(field) {
        return this.editRowBuffer()?.[field];
    }
    onRowEditInput(field, event) {
        const buffer = this.editRowBuffer();
        if (buffer === null) {
            return;
        }
        buffer[field] = event.target.value;
        this.editRowBuffer.set(buffer);
    }
    saveRowEdit() {
        const dataItem = this.editRowData();
        if (dataItem === null) {
            return;
        }
        Object.assign(dataItem, this.editRowBuffer());
        this.editRowData.set(null);
        this.editRowBuffer.set(null);
        this.save.emit({ dataItem, isNew: false });
    }
    cancelRowEdit() {
        const dataItem = this.editRowData();
        if (dataItem === null) {
            return;
        }
        this.editRowData.set(null);
        this.editRowBuffer.set(null);
        this.cancel.emit({ dataItem, isNew: false });
    }
    removeRow(dataItem) {
        this.remove.emit({ dataItem, isNew: false });
    }
    /* ── Data state ────────────────────────────────────────────────── */
    emitDataState() {
        const state = {
            skip: this.skipState(),
            take: this.pageSizeValue(),
        };
        const sort = this.sortState();
        if (sort.length) {
            state.sort = sort.slice();
        }
        const group = this.groupState();
        if (group.length) {
            state.group = group.slice();
        }
        const filter = this.filterState();
        if (filter !== null) {
            state.filter = filter;
        }
        this.dataStateChange.emit(state);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: GridComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.28", type: GridComponent, isStandalone: true, selector: "smart-grid, kendo-grid", inputs: { data: { classPropertyName: "data", publicName: "data", isSignal: true, isRequired: false, transformFunction: null }, scrollable: { classPropertyName: "scrollable", publicName: "scrollable", isSignal: true, isRequired: false, transformFunction: null }, selectable: { classPropertyName: "selectable", publicName: "selectable", isSignal: true, isRequired: false, transformFunction: null }, trackBy: { classPropertyName: "trackBy", publicName: "trackBy", isSignal: true, isRequired: false, transformFunction: null }, virtualColumns: { classPropertyName: "virtualColumns", publicName: "virtualColumns", isSignal: true, isRequired: false, transformFunction: null }, autoGenerateColumns: { classPropertyName: "autoGenerateColumns", publicName: "autoGenerateColumns", isSignal: true, isRequired: false, transformFunction: null }, filterable: { classPropertyName: "filterable", publicName: "filterable", isSignal: true, isRequired: false, transformFunction: null }, sortable: { classPropertyName: "sortable", publicName: "sortable", isSignal: true, isRequired: false, transformFunction: null }, pageable: { classPropertyName: "pageable", publicName: "pageable", isSignal: true, isRequired: false, transformFunction: null }, groupable: { classPropertyName: "groupable", publicName: "groupable", isSignal: true, isRequired: false, transformFunction: null }, navigable: { classPropertyName: "navigable", publicName: "navigable", isSignal: true, isRequired: false, transformFunction: null }, autoSize: { classPropertyName: "autoSize", publicName: "autoSize", isSignal: true, isRequired: false, transformFunction: null }, resizable: { classPropertyName: "resizable", publicName: "resizable", isSignal: true, isRequired: false, transformFunction: null }, reorderable: { classPropertyName: "reorderable", publicName: "reorderable", isSignal: true, isRequired: false, transformFunction: null }, loading: { classPropertyName: "loading", publicName: "loading", isSignal: true, isRequired: false, transformFunction: null }, columnMenu: { classPropertyName: "columnMenu", publicName: "columnMenu", isSignal: true, isRequired: false, transformFunction: null }, aggregates: { classPropertyName: "aggregates", publicName: "aggregates", isSignal: true, isRequired: false, transformFunction: null }, columnChooser: { classPropertyName: "columnChooser", publicName: "columnChooser", isSignal: true, isRequired: false, transformFunction: null }, hideHeader: { classPropertyName: "hideHeader", publicName: "hideHeader", isSignal: true, isRequired: false, transformFunction: null }, skip: { classPropertyName: "skip", publicName: "skip", isSignal: true, isRequired: false, transformFunction: null }, sort: { classPropertyName: "sort", publicName: "sort", isSignal: true, isRequired: false, transformFunction: null }, group: { classPropertyName: "group", publicName: "group", isSignal: true, isRequired: false, transformFunction: null }, navigatable: { classPropertyName: "navigatable", publicName: "navigatable", isSignal: true, isRequired: false, transformFunction: null }, rowClass: { classPropertyName: "rowClass", publicName: "rowClass", isSignal: true, isRequired: false, transformFunction: null }, rowSelected: { classPropertyName: "rowSelected", publicName: "rowSelected", isSignal: true, isRequired: false, transformFunction: null }, cellSelected: { classPropertyName: "cellSelected", publicName: "cellSelected", isSignal: true, isRequired: false, transformFunction: null }, isDetailExpanded: { classPropertyName: "isDetailExpanded", publicName: "isDetailExpanded", isSignal: true, isRequired: false, transformFunction: null }, pageSize: { classPropertyName: "pageSize", publicName: "pageSize", isSignal: true, isRequired: false, transformFunction: null }, height: { classPropertyName: "height", publicName: "height", isSignal: true, isRequired: false, transformFunction: null }, rowHeight: { classPropertyName: "rowHeight", publicName: "rowHeight", isSignal: true, isRequired: false, transformFunction: null }, detailRowHeight: { classPropertyName: "detailRowHeight", publicName: "detailRowHeight", isSignal: true, isRequired: false, transformFunction: null }, detailExpandBy: { classPropertyName: "detailExpandBy", publicName: "detailExpandBy", isSignal: true, isRequired: false, transformFunction: null }, editable: { classPropertyName: "editable", publicName: "editable", isSignal: true, isRequired: false, transformFunction: null }, filter: { classPropertyName: "filter", publicName: "filter", isSignal: true, isRequired: false, transformFunction: null } }, outputs: { filterChange: "filterChange", pageChange: "pageChange", groupChange: "groupChange", sortChange: "sortChange", selectionChange: "selectionChange", dataStateChange: "dataStateChange", stateChange: "stateChange", columnReorder: "columnReorder", edit: "edit", save: "save", cancel: "cancel", remove: "remove", detailExpand: "detailExpand", detailCollapse: "detailCollapse", groupExpand: "groupExpand", groupCollapse: "groupCollapse", cellChange: "cellChange", cellClose: "cellClose" }, host: { listeners: { "document:click": "onDocumentClick()", "document:mousemove": "onReorderMove($event)", "document:mouseup": "onReorderEnd($event)" } }, queries: [{ propertyName: "columns", predicate: ColumnBase, isSignal: true }, { propertyName: "noRecordsTemplate", first: true, predicate: NoRecordsTemplateDirective, descendants: true, isSignal: true }, { propertyName: "detailTemplate", first: true, predicate: DetailTemplateDirective, descendants: true, isSignal: true }], ngImport: i0, template: `
        <div
            class="k-grid k-grid-display-block k-grid-aria-root"
            [class.k-grid-virtual]="scrollable() === 'virtual'"
            [style.position]="loading() ? 'relative' : null"
            role="grid"
        >
            @if (columnChooser()) {
                <div class="k-grid-toolbar k-toolbar" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid var(--kendo-color-border, #ebebeb);position:relative">
                    <button
                        type="button"
                        class="k-button k-button-md k-button-solid k-button-icon k-column-chooser-button"
                        [attr.aria-expanded]="chooserOpen()"
                        title="Choose columns"
                        (click)="toggleChooser(); $event.stopPropagation()"
                    >
                        <svg class="k-icon k-svg-icon" [attr.viewBox]="columnsMenuIcon.viewBox" [innerHTML]="iconHtml(columnsMenuIcon)" focusable="false" aria-hidden="true"></svg>
                        <span style="margin-left:6px">Columns</span>
                    </button>
                    @if (chooserOpen()) {
                        <div
                            class="k-column-chooser"
                            style="position:absolute;top:100%;left:0;min-width:200px;z-index:1000;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);padding:8px 0"
                            (click)="$event.stopPropagation()"
                        >
                            @for (c of chooserColumns(); track c) {
                                <label class="k-column-menu-item">
                                    <input
                                        type="checkbox"
                                        class="k-checkbox"
                                        [checked]="isColumnVisible(c)"
                                        (change)="toggleColumnVisibility(c)"
                                    />
                                    <span>{{ c.title ?? c.field }}</span>
                                </label>
                            }
                        </div>
                    }
                </div>
            }
            <div class="k-grid-container">
                <div
                    class="k-grid-content k-grid-scrollable"
                    [style.height.px]="scrollable() !== 'none' ? height() : null"
                >
                    <table class="k-grid-table k-table">
                        <colgroup class="k-table-colgroup">
                            @for (col of leafColumns(); track col) {
                                <col class="k-table-col" [style]="colWidthStyle(col)" />
                            }
                        </colgroup>
                        @if (!hideHeader()) {
                            <thead class="k-grid-header k-table-thead">
                                @for (row of headerRows(); track $index) {
                                    <tr class="k-table-row">
                                        @if ($first) {
                                            @if (detailTemplate()) {
                                                <th class="k-hierarchy-cell k-table-th" [attr.rowspan]="headerRows().length"></th>
                                            }
                                            @if (isSelectionEnabled()) {
                                                <th class="k-checkbox-cell k-table-th" [attr.rowspan]="headerRows().length">
                                                    <input
                                                        type="checkbox"
                                                        class="k-checkbox"
                                                        [checked]="allSelected"
                                                        [indeterminate]="someSelected && !allSelected"
                                                        (change)="toggleAllRows()"
                                                    />
                                                </th>
                                            }
                                        }
                                        @for (cell of row; track cell.column) {
                                            @if (cell.isGroup) {
                                                <th
                                                    class="k-table-th k-header"
                                                    [attr.colspan]="cell.colspan"
                                                    [attr.rowspan]="cell.rowspan"
                                                    [class.k-locked]="isColumnLocked(cell.column)"
                                                    [style]="cell.column.headerStyle"
                                                    [style.left.px]="lockedOffsetFor(cell.column)"
                                                    [style.position]="isColumnLocked(cell.column) ? 'sticky' : null"
                                                    [style.z-index]="isColumnLocked(cell.column) ? 5 : null"
                                                    [style.background]="isColumnLocked(cell.column) ? 'var(--kendo-color-surface, #fff)' : null"
                                                >
                                                    <span class="k-cell-inner">
                                                        <span class="k-link">{{ cell.column.title ?? cell.column.field }}</span>
                                                    </span>
                                                </th>
                                            } @else {
                                                <th
                                                    [attr.colspan]="cell.colspan"
                                                    [attr.rowspan]="cell.rowspan"
                                                    [class]="headerClassFor(cell.column)"
                                                    [class.k-locked]="isColumnLocked(cell.column)"
                                                    [class.k-reorderable]="isReorderableColumn(cell.column)"
                                                    [class.k-dragging]="isReorderDragging(cell.column)"
                                                    [style]="cell.column.headerStyle"
                                                    [style.left.px]="lockedOffsetFor(cell.column)"
                                                    [style.position]="isColumnLocked(cell.column) ? 'sticky' : (isResizable() || isColumnMenuEnabled() ? 'relative' : null)"
                                                    [style.z-index]="isColumnLocked(cell.column) ? 5 : null"
                                                    [style.background]="isColumnLocked(cell.column) ? 'var(--kendo-color-surface, #fff)' : null"
                                                    [style.overflow]="isColumnMenuEnabled() ? 'visible' : null"
                                                    (click)="sortColumn(cell.column)"
                                                    (mousedown)="startReorder($event, cell.column)"
                                                >
                                                    @if (checkboxShowSelectAll(cell.column)) {
                                                        <span class="k-cell-inner">
                                                            <input
                                                                type="checkbox"
                                                                class="k-checkbox"
                                                                [checked]="allSelected"
                                                                [indeterminate]="someSelected && !allSelected"
                                                                (change)="toggleAllRows()"
                                                            />
                                                        </span>
                                                    } @else if (cell.column.isRadioColumn()) {
                                                        <span class="k-cell-inner"></span>
                                                    } @else if (cell.column.headerTemplateRef !== null) {
                                                        <ng-container
                                                            [ngTemplateOutlet]="cell.column.headerTemplateRef"
                                                            [ngTemplateOutletContext]="{ $implicit: cell.column, column: cell.column }"
                                                        />
                                                    } @else {
                                                        <span class="k-cell-inner" [style.overflow]="isColumnMenuOpen(cell.column) ? 'visible' : null">
                                                            <span class="k-link">{{ cell.column.title ?? cell.column.field }}</span>
                                                            @if (sortDescriptorFor(cell.column); as sd) {
                                                                <span class="k-sort-icon">
                                                                    <svg
                                                                        class="k-icon k-svg-icon"
                                                                        [attr.viewBox]="(sd.dir === 'asc' ? sortAscIcon : sortDescIcon).viewBox"
                                                                        [innerHTML]="iconHtml(sd.dir === 'asc' ? sortAscIcon : sortDescIcon)"
                                                                        focusable="false"
                                                                        aria-hidden="true"
                                                                    ></svg>
                                                                </span>
                                                            }
                                                            @if (isGroupableEnabled() && cell.column.field !== undefined && !cell.column.isColumnGroup()) {
                                                                <button
                                                                    type="button"
                                                                    class="k-button k-button-md k-button-solid k-button-icon k-grouping-header"
                                                                    [class.k-grouped]="isGroupedBy(cell.column)"
                                                                    [title]="isGroupedBy(cell.column) ? 'Ungroup' : 'Group by this column'"
                                                                    (click)="toggleGroupForColumn(cell.column); $event.stopPropagation()"
                                                                >
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="groupButtonIcon.viewBox" [innerHTML]="iconHtml(groupButtonIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (isColumnMenuEnabled() && cell.column.columnMenu && !cell.column.isColumnGroup()) {
                                                                <button
                                                                    type="button"
                                                                    class="k-button k-button-md k-button-solid k-button-icon k-column-menu-button"
                                                                    [attr.aria-expanded]="isColumnMenuOpen(cell.column)"
                                                                    title="Column menu"
                                                                    (click)="toggleColumnMenu(cell.column, $event)"
                                                                >
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="columnsMenuIcon.viewBox" [innerHTML]="iconHtml(columnsMenuIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                                @if (isColumnMenuOpen(cell.column)) {
                                                                    <div
                                                                        class="k-column-menu"
                                                                        style="position:absolute;top:100%;left:0;min-width:200px;z-index:1000;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);padding:8px 0"
                                                                        (click)="$event.stopPropagation()"
                                                                    >
                                                                        <div class="k-column-menu-header">Sort</div>
                                                                        <button type="button" class="k-column-menu-item" (click)="menuSort(cell.column, 'asc')">
                                                                            <svg class="k-icon k-svg-icon" [attr.viewBox]="menuSortAscIcon.viewBox" [innerHTML]="iconHtml(menuSortAscIcon)" focusable="false" aria-hidden="true"></svg>
                                                                            Sort ascending
                                                                        </button>
                                                                        <button type="button" class="k-column-menu-item" (click)="menuSort(cell.column, 'desc')">
                                                                            <svg class="k-icon k-svg-icon" [attr.viewBox]="menuSortDescIcon.viewBox" [innerHTML]="iconHtml(menuSortDescIcon)" focusable="false" aria-hidden="true"></svg>
                                                                            Sort descending
                                                                        </button>
                                                                        <div class="k-column-menu-divider"></div>
                                                                        <div class="k-column-menu-header">Columns</div>
                                                                        @for (c of leafColumns(); track c) {
                                                                            @if (c.includeInChooser) {
                                                                                <label class="k-column-menu-item">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        class="k-checkbox"
                                                                                        [checked]="isColumnVisible(c)"
                                                                                        (change)="toggleColumnVisibility(c)"
                                                                                    />
                                                                                    <span>{{ c.title ?? c.field }}</span>
                                                                                </label>
                                                                            }
                                                                        }
                                                                    </div>
                                                                }
                                                            }
                                                            @if (isResizable() && !cell.column.isColumnGroup() && !cell.column.isSpanColumn() && !cell.column.isCheckboxColumn() && !cell.column.isRadioColumn() && !cell.column.isCommandColumn()) {
                                                                    <span
                                                                        class="k-resize-handle"
                                                                        style="position:absolute;top:0;bottom:0;right:0;width:8px;cursor:col-resize;display:block;z-index:200"
                                                                        (mousedown)="startResize($event, cell.column)"
                                                                        (click)="$event.stopPropagation()"
                                                                    ></span>
                                                                }
                                                        </span>
                                                    }
                                                </th>
                                            }
                                        }
                                    </tr>
                                }
                                @if (isFilterRow()) {
                                    <tr class="k-filter-row k-table-row">
                                        @if (detailTemplate()) {
                                            <td class="k-hierarchy-cell k-table-td"></td>
                                        }
                                        @if (isSelectionEnabled()) {
                                            <td class="k-checkbox-cell k-table-td"></td>
                                        }
                                        @for (col of bodyColumns(); track col) {
                                            <td
                                                class="k-table-td"
                                                [attr.colspan]="spanColspan(col)"
                                                [class.k-locked]="isColumnLocked(col)"
                                                [style.left.px]="lockedOffsetFor(col)"
                                                [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                            >
                                                @if (col.field !== undefined && col.filterable !== false) {
                                                    <input
                                                        class="k-input k-textbox"
                                                        [value]="filterValueFor(col)"
                                                        (input)="applyColumnFilter(col, $event)"
                                                    />
                                                }
                                            </td>
                                        }
                                    </tr>
                                }
                            </thead>
                        }
                        <tbody class="k-grid-table-tbody k-table-tbody">
                            @if (isGrouped()) {
                                @for (row of viewRows(); track row.index) {
                                    @if (row.type === 'group') {
                                        <tr class="k-grouping-row k-table-row">
                                            <td class="k-table-td" [attr.colspan]="columnsCount() + extraCellsCount()">
                                                <span class="k-group-cell-inner">
                                                    <button
                                                        type="button"
                                                        class="k-button k-button-md k-button-solid k-button-icon k-group-toggle"
                                                        [class.k-hierarchy-collapse]="!isGroupCollapsed(row.index)"
                                                        [attr.aria-expanded]="!isGroupCollapsed(row.index)"
                                                        (click)="toggleGroup(row.index, row.group)"
                                                    >
                                                        <svg class="k-icon k-svg-icon" [attr.viewBox]="(isGroupCollapsed(row.index) ? expandClosedIcon : expandOpenIcon).viewBox" [innerHTML]="iconHtml(isGroupCollapsed(row.index) ? expandClosedIcon : expandOpenIcon)" focusable="false" aria-hidden="true"></svg>
                                                    </button>
                                                    <span class="k-group-value">{{ row.group.value }}</span>
                                                    <span class="k-group-count">({{ groupItemCount(row.group) }})</span>
                                                </span>
                                            </td>
                                        </tr>
                                    } @else if (row.type === 'footer') {
                                        <tr class="k-group-footer k-table-row">
                                            @if (detailTemplate()) {
                                                <td class="k-hierarchy-cell k-table-td"></td>
                                            }
                                            @if (isSelectionEnabled()) {
                                                <td class="k-checkbox-cell k-table-td"></td>
                                            }
                                            @for (col of bodyColumns(); track col) {
                                                <td
                                                    class="k-table-td"
                                                    [attr.colspan]="spanColspan(col)"
                                                    [style]="col.footerStyle"
                                                    [class]="col.footerClass"
                                                    [class.k-locked]="isColumnLocked(col)"
                                                    [style.left.px]="lockedOffsetFor(col)"
                                                    [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                    [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                    [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                                >
                                                    @if (col.footerTemplateRef !== null) {
                                                        <ng-container
                                                            [ngTemplateOutlet]="col.footerTemplateRef"
                                                            [ngTemplateOutletContext]="{ $implicit: aggregateValueFor(col, row.group.aggregates), column: col, aggregates: row.group.aggregates }"
                                                        />
                                                    } @else {
                                                        {{ groupAggregateTextFor(col, row.group) }}
                                                    }
                                                </td>
                                            }
                                        </tr>
                                    } @else {
                                        <tr [class]="rowClassFor(row.dataItem, row.dataIndex)">
                                            @if (detailTemplate()) {
                                                <td class="k-hierarchy-cell k-table-td">
                                                    <button
                                                        type="button"
                                                        class="k-button k-button-md k-button-solid k-button-icon k-hierarchy-expand"
                                                        [class.k-hierarchy-collapse]="isRowExpanded(row.dataItem, row.dataIndex)"
                                                        [attr.aria-expanded]="isRowExpanded(row.dataItem, row.dataIndex)"
                                                        [title]="isRowExpanded(row.dataItem, row.dataIndex) ? 'Collapse' : 'Expand'"
                                                        (click)="toggleRow(row.dataItem, row.dataIndex)"
                                                    >
                                                        <svg
                                                            class="k-icon k-svg-icon"
                                                            [attr.viewBox]="(isRowExpanded(row.dataItem, row.dataIndex) ? expandOpenIcon : expandClosedIcon).viewBox"
                                                            [innerHTML]="iconHtml(isRowExpanded(row.dataItem, row.dataIndex) ? expandOpenIcon : expandClosedIcon)"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        ></svg>
                                                    </button>
                                                </td>
                                            }
                                            @if (isSelectionEnabled()) {
                                                <td class="k-checkbox-cell k-table-td">
                                                    <input
                                                        type="checkbox"
                                                        class="k-checkbox"
                                                        [checked]="isRowSelected(row.dataItem)"
                                                        (change)="toggleRowSelection(row.dataItem)"
                                                    />
                                                </td>
                                            }
                                            @for (col of bodyColumns(); track col) {
                                                <td
                                                    class="k-table-td"
                                                    [attr.colspan]="spanColspan(col)"
                                                    [style]="col.style"
                                                    [class]="col.cssClass"
                                                    [class.k-locked]="isColumnLocked(col)"
                                                    [style.left.px]="lockedOffsetFor(col)"
                                                    [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                    [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                    [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                                    (dblclick)="beginEdit(row.dataItem, col, row.dataIndex)"
                                                >
                                                    @if (col.isSpanColumn()) {
                                                        @if (spanTemplateRef(col); as tpl) {
                                                            <ng-container
                                                                [ngTemplateOutlet]="tpl"
                                                                [ngTemplateOutletContext]="{ $implicit: row.dataItem, dataItem: row.dataItem, column: col }"
                                                            />
                                                        } @else {
                                                            @for (child of spanChildren(col); track child) {
                                                                @if (child.field !== undefined) {
                                                                    <div class="k-span-cell-value">{{ getValue(row.dataItem, child.field) }}</div>
                                                                }
                                                            }
                                                        }
                                                    } @else if (col.isCheckboxColumn()) {
                                                        <input
                                                            type="checkbox"
                                                            class="k-checkbox"
                                                            [checked]="isRowSelected(row.dataItem)"
                                                            (change)="toggleRowSelection(row.dataItem)"
                                                        />
                                                    } @else if (col.isRadioColumn()) {
                                                        <input
                                                            type="radio"
                                                            class="k-radio"
                                                            [checked]="isRowSelected(row.dataItem)"
                                                            (change)="selectRowOnly(row.dataItem)"
                                                        />
                                                    } @else if (col.isCommandColumn()) {
                                                        @if (isRowEditing(row.dataItem)) {
                                                            @if (commandVisible(col, 'save')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-save-command" title="Update" (click)="saveRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="saveCmdIcon.viewBox" [innerHTML]="iconHtml(saveCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'cancel')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-cancel-command" title="Cancel" (click)="cancelRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="cancelCmdIcon.viewBox" [innerHTML]="iconHtml(cancelCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        } @else {
                                                            @if (commandVisible(col, 'edit')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-edit-command" title="Edit" (click)="startRowEdit(row.dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="editCmdIcon.viewBox" [innerHTML]="iconHtml(editCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'remove')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-remove-command" title="Remove" (click)="removeRow(row.dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="trashCmdIcon.viewBox" [innerHTML]="iconHtml(trashCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        }
                                                    } @else {
                                                        @if (isRowEditing(row.dataItem)) {
                                                            @if (col.field !== undefined) {
                                                                <input
                                                                    class="k-input k-textbox k-editable-cell"
                                                                    [value]="editBufferValueFor(col.field)"
                                                                    (input)="onRowEditInput(col.field, $event)"
                                                                />
                                                            }
                                                        } @else if (isCellEditing(row.dataItem, col)) {
                                                            <input
                                                                class="k-input k-textbox k-editable-cell"
                                                                [value]="editValue()"
                                                                (input)="onEditInput($event)"
                                                                (keydown.enter)="commitEdit()"
                                                                (keydown.escape)="cancelEdit()"
                                                                (blur)="commitEdit()"
                                                            />
                                                        } @else {
                                                            @if (col.cellTemplateRef !== null) {
                                                                <ng-container
                                                                    [ngTemplateOutlet]="col.cellTemplateRef"
                                                                    [ngTemplateOutletContext]="{ $implicit: row.dataItem, rowIndex: row.dataIndex, column: col }"
                                                                />
                                                            } @else {
                                                                @if (col.field !== undefined) {
                                                                    {{ getValue(row.dataItem, col.field) }}
                                                                }
                                                            }
                                                        }
                                                    }
                                                </td>
                                            }
                                        </tr>
                                        @if (detailTemplate(); as dt) {
                                            @if (isRowExpanded(row.dataItem, row.dataIndex)) {
                                                <tr class="k-detail-row k-table-row" [style.height.px]="detailRowHeight() || null">
                                                    <td class="k-hierarchy-cell k-table-td"></td>
                                                    <td class="k-detail-cell k-table-td" [attr.colspan]="columnsCount() + (isSelectionEnabled() ? 1 : 0)">
                                                        <ng-container
                                                            [ngTemplateOutlet]="dt.templateRef"
                                                            [ngTemplateOutletContext]="{ $implicit: row.dataItem, index: row.dataIndex }"
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                        }
                                    }
                                } @empty {
                                    <tr class="k-grid-norecords k-table-row">
                                        <td class="k-table-td" [attr.colspan]="columnsCount() + extraCellsCount()">
                                            <div class="k-grid-norecords-template">
                                                @if (noRecordsTemplate()?.templateRef; as tpl) {
                                                    <ng-container [ngTemplateOutlet]="tpl" />
                                                } @else {
                                                    <span class="k-grid-norecords-text">No records available.</span>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                }
                            } @else {
                                @for (dataItem of viewData(); track trackItemFn($index, dataItem); let rowIndex = $index) {
                                    <tr [class]="rowClassFor(dataItem, rowIndex)">
                                        @if (detailTemplate()) {
                                            <td class="k-hierarchy-cell k-table-td">
                                                <button
                                                    type="button"
                                                    class="k-button k-button-md k-button-solid k-button-icon k-hierarchy-expand"
                                                    [class.k-hierarchy-collapse]="isRowExpanded(dataItem, rowIndex)"
                                                    [attr.aria-expanded]="isRowExpanded(dataItem, rowIndex)"
                                                    [title]="isRowExpanded(dataItem, rowIndex) ? 'Collapse' : 'Expand'"
                                                    (click)="toggleRow(dataItem, rowIndex)"
                                                >
                                                    <svg
                                                        class="k-icon k-svg-icon"
                                                        [attr.viewBox]="(isRowExpanded(dataItem, rowIndex) ? expandOpenIcon : expandClosedIcon).viewBox"
                                                        [innerHTML]="iconHtml(isRowExpanded(dataItem, rowIndex) ? expandOpenIcon : expandClosedIcon)"
                                                        focusable="false"
                                                        aria-hidden="true"
                                                    ></svg>
                                                </button>
                                            </td>
                                        }
                                        @if (isSelectionEnabled()) {
                                            <td class="k-checkbox-cell k-table-td">
                                                <input
                                                    type="checkbox"
                                                    class="k-checkbox"
                                                    [checked]="isRowSelected(dataItem)"
                                                    (change)="toggleRowSelection(dataItem)"
                                                />
                                            </td>
                                        }
                                        @for (col of bodyColumns(); track col) {
                                            <td
                                                class="k-table-td"
                                                [attr.colspan]="spanColspan(col)"
                                                [style]="col.style"
                                                [class]="col.cssClass"
                                                [class.k-locked]="isColumnLocked(col)"
                                                [style.left.px]="lockedOffsetFor(col)"
                                                [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                                (dblclick)="beginEdit(dataItem, col, rowIndex)"
                                            >
                                                @if (col.isSpanColumn()) {
                                                    @if (spanTemplateRef(col); as tpl) {
                                                        <ng-container
                                                            [ngTemplateOutlet]="tpl"
                                                            [ngTemplateOutletContext]="{ $implicit: dataItem, dataItem: dataItem, column: col }"
                                                        />
                                                    } @else {
                                                        @for (child of spanChildren(col); track child) {
                                                            @if (child.field !== undefined) {
                                                                <div class="k-span-cell-value">{{ getValue(dataItem, child.field) }}</div>
                                                            }
                                                        }
                                                    }
                                                } @else if (col.isCheckboxColumn()) {
                                                        <input
                                                            type="checkbox"
                                                            class="k-checkbox"
                                                            [checked]="isRowSelected(dataItem)"
                                                            (change)="toggleRowSelection(dataItem)"
                                                        />
                                                    } @else if (col.isRadioColumn()) {
                                                        <input
                                                            type="radio"
                                                            class="k-radio"
                                                            [checked]="isRowSelected(dataItem)"
                                                            (change)="selectRowOnly(dataItem)"
                                                        />
                                                    } @else if (col.isCommandColumn()) {
                                                        @if (isRowEditing(dataItem)) {
                                                            @if (commandVisible(col, 'save')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-save-command" title="Update" (click)="saveRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="saveCmdIcon.viewBox" [innerHTML]="iconHtml(saveCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'cancel')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-cancel-command" title="Cancel" (click)="cancelRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="cancelCmdIcon.viewBox" [innerHTML]="iconHtml(cancelCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        } @else {
                                                            @if (commandVisible(col, 'edit')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-edit-command" title="Edit" (click)="startRowEdit(dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="editCmdIcon.viewBox" [innerHTML]="iconHtml(editCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'remove')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-remove-command" title="Remove" (click)="removeRow(dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="trashCmdIcon.viewBox" [innerHTML]="iconHtml(trashCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        }
                                                    } @else {
                                                        @if (isRowEditing(dataItem)) {
                                                            @if (col.field !== undefined) {
                                                                <input
                                                                    class="k-input k-textbox k-editable-cell"
                                                                    [value]="editBufferValueFor(col.field)"
                                                                    (input)="onRowEditInput(col.field, $event)"
                                                                />
                                                            }
                                                        } @else if (isCellEditing(dataItem, col) && col.field !== undefined) {
                                                            <input
                                                                class="k-input k-textbox k-editable-cell"
                                                                [value]="editValue()"
                                                                (input)="onEditInput($event)"
                                                                (keydown.enter)="commitEdit()"
                                                                (keydown.escape)="cancelEdit()"
                                                                (blur)="commitEdit()"
                                                            />
                                                        } @else {
                                                            @if (col.cellTemplateRef !== null) {
                                                                <ng-container
                                                                    [ngTemplateOutlet]="col.cellTemplateRef"
                                                                    [ngTemplateOutletContext]="{ $implicit: dataItem, rowIndex: rowIndex, column: col }"
                                                                />
                                                            } @else {
                                                                @if (col.field !== undefined) {
                                                                    {{ getValue(dataItem, col.field) }}
                                                                }
                                                            }
                                                        }
                                                    }
                                            </td>
                                        }
                                    </tr>
                                    @if (detailTemplate(); as dt) {
                                        @if (isRowExpanded(dataItem, rowIndex)) {
                                            <tr class="k-detail-row k-table-row" [style.height.px]="detailRowHeight() || null">
                                                <td class="k-hierarchy-cell k-table-td"></td>
                                                <td class="k-detail-cell k-table-td" [attr.colspan]="columnsCount() + (isSelectionEnabled() ? 1 : 0)">
                                                    <ng-container
                                                        [ngTemplateOutlet]="dt.templateRef"
                                                        [ngTemplateOutletContext]="{ $implicit: dataItem, index: rowIndex }"
                                                    />
                                                </td>
                                            </tr>
                                        }
                                    }
                                } @empty {
                                    <tr class="k-grid-norecords k-table-row">
                                        <td class="k-table-td" [attr.colspan]="columnsCount() + extraCellsCount()">
                                            <div class="k-grid-norecords-template">
                                                @if (noRecordsTemplate()?.templateRef; as tpl) {
                                                    <ng-container [ngTemplateOutlet]="tpl" />
                                                } @else {
                                                    <span class="k-grid-norecords-text">No records available.</span>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                }
                            }
                            @if (showGridFooter()) {
                                <tr class="k-grid-footer-row k-table-row">
                                    @if (detailTemplate()) {
                                        <td class="k-hierarchy-cell k-table-td"></td>
                                    }
                                    @if (isSelectionEnabled()) {
                                        <td class="k-checkbox-cell k-table-td"></td>
                                    }
                                    @for (col of bodyColumns(); track col) {
                                        <td
                                            class="k-table-td"
                                            [attr.colspan]="spanColspan(col)"
                                            [style]="col.footerStyle"
                                            [class]="col.footerClass"
                                            [class.k-locked]="isColumnLocked(col)"
                                            [style.left.px]="lockedOffsetFor(col)"
                                            [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                            [style.z-index]="isColumnLocked(col) ? 5 : null"
                                            [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                        >
                                            @if (col.footerTemplateRef !== null) {
                                                <ng-container
                                                    [ngTemplateOutlet]="col.footerTemplateRef"
                                                    [ngTemplateOutletContext]="{ $implicit: aggregateValueFor(col, gridAggregates()), column: col, aggregates: gridAggregates() }"
                                                />
                                            } @else {
                                                {{ gridAggregateTextFor(col) }}
                                            }
                                        </td>
                                    }
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            @if (loading()) {
                <div class="k-loading-mask">
                    <span class="k-loading-text">Loading...</span>
                    <div class="k-loading-color"></div>
                    <div class="k-loading-image"></div>
                </div>
            }

            @if (isPageable()) {
                <div class="k-pager k-grid-pager k-pager-md" role="navigation" aria-label="Pager">
                    <div class="k-pager-numbers-wrap">
                        <button
                            type="button"
                            class="k-pager-nav k-pager-first k-button k-button-md k-button-solid"
                            [disabled]="currentPage() <= 1"
                            title="Go to the first page"
                            (click)="gotoPage(0)"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="firstIcon.viewBox" [innerHTML]="iconHtml(firstIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                        <button
                            type="button"
                            class="k-pager-nav k-pager-prev k-button k-button-md k-button-solid"
                            [disabled]="currentPage() <= 1"
                            title="Go to the previous page"
                            (click)="gotoPage(currentPage() - 2)"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="prevIcon.viewBox" [innerHTML]="iconHtml(prevIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                        <div class="k-pager-numbers">
                            @for (page of pages(); track page) {
                                <button
                                    type="button"
                                    class="k-pager-numbers k-button k-button-md k-button-solid"
                                    [class.k-selected]="page === currentPage() - 1"
                                    [attr.tabindex]="page === currentPage() - 1 ? 0 : -1"
                                    (click)="gotoPage(page)"
                                >
                                    {{ page + 1 }}
                                </button>
                            }
                        </div>
                        <button
                            type="button"
                            class="k-pager-nav k-pager-next k-button k-button-md k-button-solid"
                            [disabled]="currentPage() >= pages().length"
                            title="Go to the next page"
                            (click)="gotoPage(currentPage())"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="nextIcon.viewBox" [innerHTML]="iconHtml(nextIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                        <button
                            type="button"
                            class="k-pager-nav k-pager-last k-button k-button-md k-button-solid"
                            [disabled]="currentPage() >= pages().length"
                            title="Go to the last page"
                            (click)="gotoPage(pages().length - 1)"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="lastIcon.viewBox" [innerHTML]="iconHtml(lastIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                    </div>
                    <span class="k-pager-info k-label">{{ pagerInfo() }}</span>
                </div>
            }
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: GridComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'smart-grid, kendo-grid',
                    standalone: true,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    imports: [NgTemplateOutlet],
                    host: {
                        '(document:click)': 'onDocumentClick()',
                        '(document:mousemove)': 'onReorderMove($event)',
                        '(document:mouseup)': 'onReorderEnd($event)',
                    },
                    template: `
        <div
            class="k-grid k-grid-display-block k-grid-aria-root"
            [class.k-grid-virtual]="scrollable() === 'virtual'"
            [style.position]="loading() ? 'relative' : null"
            role="grid"
        >
            @if (columnChooser()) {
                <div class="k-grid-toolbar k-toolbar" style="display:flex;align-items:center;gap:8px;padding:8px 12px;border-bottom:1px solid var(--kendo-color-border, #ebebeb);position:relative">
                    <button
                        type="button"
                        class="k-button k-button-md k-button-solid k-button-icon k-column-chooser-button"
                        [attr.aria-expanded]="chooserOpen()"
                        title="Choose columns"
                        (click)="toggleChooser(); $event.stopPropagation()"
                    >
                        <svg class="k-icon k-svg-icon" [attr.viewBox]="columnsMenuIcon.viewBox" [innerHTML]="iconHtml(columnsMenuIcon)" focusable="false" aria-hidden="true"></svg>
                        <span style="margin-left:6px">Columns</span>
                    </button>
                    @if (chooserOpen()) {
                        <div
                            class="k-column-chooser"
                            style="position:absolute;top:100%;left:0;min-width:200px;z-index:1000;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);padding:8px 0"
                            (click)="$event.stopPropagation()"
                        >
                            @for (c of chooserColumns(); track c) {
                                <label class="k-column-menu-item">
                                    <input
                                        type="checkbox"
                                        class="k-checkbox"
                                        [checked]="isColumnVisible(c)"
                                        (change)="toggleColumnVisibility(c)"
                                    />
                                    <span>{{ c.title ?? c.field }}</span>
                                </label>
                            }
                        </div>
                    }
                </div>
            }
            <div class="k-grid-container">
                <div
                    class="k-grid-content k-grid-scrollable"
                    [style.height.px]="scrollable() !== 'none' ? height() : null"
                >
                    <table class="k-grid-table k-table">
                        <colgroup class="k-table-colgroup">
                            @for (col of leafColumns(); track col) {
                                <col class="k-table-col" [style]="colWidthStyle(col)" />
                            }
                        </colgroup>
                        @if (!hideHeader()) {
                            <thead class="k-grid-header k-table-thead">
                                @for (row of headerRows(); track $index) {
                                    <tr class="k-table-row">
                                        @if ($first) {
                                            @if (detailTemplate()) {
                                                <th class="k-hierarchy-cell k-table-th" [attr.rowspan]="headerRows().length"></th>
                                            }
                                            @if (isSelectionEnabled()) {
                                                <th class="k-checkbox-cell k-table-th" [attr.rowspan]="headerRows().length">
                                                    <input
                                                        type="checkbox"
                                                        class="k-checkbox"
                                                        [checked]="allSelected"
                                                        [indeterminate]="someSelected && !allSelected"
                                                        (change)="toggleAllRows()"
                                                    />
                                                </th>
                                            }
                                        }
                                        @for (cell of row; track cell.column) {
                                            @if (cell.isGroup) {
                                                <th
                                                    class="k-table-th k-header"
                                                    [attr.colspan]="cell.colspan"
                                                    [attr.rowspan]="cell.rowspan"
                                                    [class.k-locked]="isColumnLocked(cell.column)"
                                                    [style]="cell.column.headerStyle"
                                                    [style.left.px]="lockedOffsetFor(cell.column)"
                                                    [style.position]="isColumnLocked(cell.column) ? 'sticky' : null"
                                                    [style.z-index]="isColumnLocked(cell.column) ? 5 : null"
                                                    [style.background]="isColumnLocked(cell.column) ? 'var(--kendo-color-surface, #fff)' : null"
                                                >
                                                    <span class="k-cell-inner">
                                                        <span class="k-link">{{ cell.column.title ?? cell.column.field }}</span>
                                                    </span>
                                                </th>
                                            } @else {
                                                <th
                                                    [attr.colspan]="cell.colspan"
                                                    [attr.rowspan]="cell.rowspan"
                                                    [class]="headerClassFor(cell.column)"
                                                    [class.k-locked]="isColumnLocked(cell.column)"
                                                    [class.k-reorderable]="isReorderableColumn(cell.column)"
                                                    [class.k-dragging]="isReorderDragging(cell.column)"
                                                    [style]="cell.column.headerStyle"
                                                    [style.left.px]="lockedOffsetFor(cell.column)"
                                                    [style.position]="isColumnLocked(cell.column) ? 'sticky' : (isResizable() || isColumnMenuEnabled() ? 'relative' : null)"
                                                    [style.z-index]="isColumnLocked(cell.column) ? 5 : null"
                                                    [style.background]="isColumnLocked(cell.column) ? 'var(--kendo-color-surface, #fff)' : null"
                                                    [style.overflow]="isColumnMenuEnabled() ? 'visible' : null"
                                                    (click)="sortColumn(cell.column)"
                                                    (mousedown)="startReorder($event, cell.column)"
                                                >
                                                    @if (checkboxShowSelectAll(cell.column)) {
                                                        <span class="k-cell-inner">
                                                            <input
                                                                type="checkbox"
                                                                class="k-checkbox"
                                                                [checked]="allSelected"
                                                                [indeterminate]="someSelected && !allSelected"
                                                                (change)="toggleAllRows()"
                                                            />
                                                        </span>
                                                    } @else if (cell.column.isRadioColumn()) {
                                                        <span class="k-cell-inner"></span>
                                                    } @else if (cell.column.headerTemplateRef !== null) {
                                                        <ng-container
                                                            [ngTemplateOutlet]="cell.column.headerTemplateRef"
                                                            [ngTemplateOutletContext]="{ $implicit: cell.column, column: cell.column }"
                                                        />
                                                    } @else {
                                                        <span class="k-cell-inner" [style.overflow]="isColumnMenuOpen(cell.column) ? 'visible' : null">
                                                            <span class="k-link">{{ cell.column.title ?? cell.column.field }}</span>
                                                            @if (sortDescriptorFor(cell.column); as sd) {
                                                                <span class="k-sort-icon">
                                                                    <svg
                                                                        class="k-icon k-svg-icon"
                                                                        [attr.viewBox]="(sd.dir === 'asc' ? sortAscIcon : sortDescIcon).viewBox"
                                                                        [innerHTML]="iconHtml(sd.dir === 'asc' ? sortAscIcon : sortDescIcon)"
                                                                        focusable="false"
                                                                        aria-hidden="true"
                                                                    ></svg>
                                                                </span>
                                                            }
                                                            @if (isGroupableEnabled() && cell.column.field !== undefined && !cell.column.isColumnGroup()) {
                                                                <button
                                                                    type="button"
                                                                    class="k-button k-button-md k-button-solid k-button-icon k-grouping-header"
                                                                    [class.k-grouped]="isGroupedBy(cell.column)"
                                                                    [title]="isGroupedBy(cell.column) ? 'Ungroup' : 'Group by this column'"
                                                                    (click)="toggleGroupForColumn(cell.column); $event.stopPropagation()"
                                                                >
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="groupButtonIcon.viewBox" [innerHTML]="iconHtml(groupButtonIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (isColumnMenuEnabled() && cell.column.columnMenu && !cell.column.isColumnGroup()) {
                                                                <button
                                                                    type="button"
                                                                    class="k-button k-button-md k-button-solid k-button-icon k-column-menu-button"
                                                                    [attr.aria-expanded]="isColumnMenuOpen(cell.column)"
                                                                    title="Column menu"
                                                                    (click)="toggleColumnMenu(cell.column, $event)"
                                                                >
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="columnsMenuIcon.viewBox" [innerHTML]="iconHtml(columnsMenuIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                                @if (isColumnMenuOpen(cell.column)) {
                                                                    <div
                                                                        class="k-column-menu"
                                                                        style="position:absolute;top:100%;left:0;min-width:200px;z-index:1000;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 4px 12px rgba(0,0,0,0.15);padding:8px 0"
                                                                        (click)="$event.stopPropagation()"
                                                                    >
                                                                        <div class="k-column-menu-header">Sort</div>
                                                                        <button type="button" class="k-column-menu-item" (click)="menuSort(cell.column, 'asc')">
                                                                            <svg class="k-icon k-svg-icon" [attr.viewBox]="menuSortAscIcon.viewBox" [innerHTML]="iconHtml(menuSortAscIcon)" focusable="false" aria-hidden="true"></svg>
                                                                            Sort ascending
                                                                        </button>
                                                                        <button type="button" class="k-column-menu-item" (click)="menuSort(cell.column, 'desc')">
                                                                            <svg class="k-icon k-svg-icon" [attr.viewBox]="menuSortDescIcon.viewBox" [innerHTML]="iconHtml(menuSortDescIcon)" focusable="false" aria-hidden="true"></svg>
                                                                            Sort descending
                                                                        </button>
                                                                        <div class="k-column-menu-divider"></div>
                                                                        <div class="k-column-menu-header">Columns</div>
                                                                        @for (c of leafColumns(); track c) {
                                                                            @if (c.includeInChooser) {
                                                                                <label class="k-column-menu-item">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        class="k-checkbox"
                                                                                        [checked]="isColumnVisible(c)"
                                                                                        (change)="toggleColumnVisibility(c)"
                                                                                    />
                                                                                    <span>{{ c.title ?? c.field }}</span>
                                                                                </label>
                                                                            }
                                                                        }
                                                                    </div>
                                                                }
                                                            }
                                                            @if (isResizable() && !cell.column.isColumnGroup() && !cell.column.isSpanColumn() && !cell.column.isCheckboxColumn() && !cell.column.isRadioColumn() && !cell.column.isCommandColumn()) {
                                                                    <span
                                                                        class="k-resize-handle"
                                                                        style="position:absolute;top:0;bottom:0;right:0;width:8px;cursor:col-resize;display:block;z-index:200"
                                                                        (mousedown)="startResize($event, cell.column)"
                                                                        (click)="$event.stopPropagation()"
                                                                    ></span>
                                                                }
                                                        </span>
                                                    }
                                                </th>
                                            }
                                        }
                                    </tr>
                                }
                                @if (isFilterRow()) {
                                    <tr class="k-filter-row k-table-row">
                                        @if (detailTemplate()) {
                                            <td class="k-hierarchy-cell k-table-td"></td>
                                        }
                                        @if (isSelectionEnabled()) {
                                            <td class="k-checkbox-cell k-table-td"></td>
                                        }
                                        @for (col of bodyColumns(); track col) {
                                            <td
                                                class="k-table-td"
                                                [attr.colspan]="spanColspan(col)"
                                                [class.k-locked]="isColumnLocked(col)"
                                                [style.left.px]="lockedOffsetFor(col)"
                                                [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                            >
                                                @if (col.field !== undefined && col.filterable !== false) {
                                                    <input
                                                        class="k-input k-textbox"
                                                        [value]="filterValueFor(col)"
                                                        (input)="applyColumnFilter(col, $event)"
                                                    />
                                                }
                                            </td>
                                        }
                                    </tr>
                                }
                            </thead>
                        }
                        <tbody class="k-grid-table-tbody k-table-tbody">
                            @if (isGrouped()) {
                                @for (row of viewRows(); track row.index) {
                                    @if (row.type === 'group') {
                                        <tr class="k-grouping-row k-table-row">
                                            <td class="k-table-td" [attr.colspan]="columnsCount() + extraCellsCount()">
                                                <span class="k-group-cell-inner">
                                                    <button
                                                        type="button"
                                                        class="k-button k-button-md k-button-solid k-button-icon k-group-toggle"
                                                        [class.k-hierarchy-collapse]="!isGroupCollapsed(row.index)"
                                                        [attr.aria-expanded]="!isGroupCollapsed(row.index)"
                                                        (click)="toggleGroup(row.index, row.group)"
                                                    >
                                                        <svg class="k-icon k-svg-icon" [attr.viewBox]="(isGroupCollapsed(row.index) ? expandClosedIcon : expandOpenIcon).viewBox" [innerHTML]="iconHtml(isGroupCollapsed(row.index) ? expandClosedIcon : expandOpenIcon)" focusable="false" aria-hidden="true"></svg>
                                                    </button>
                                                    <span class="k-group-value">{{ row.group.value }}</span>
                                                    <span class="k-group-count">({{ groupItemCount(row.group) }})</span>
                                                </span>
                                            </td>
                                        </tr>
                                    } @else if (row.type === 'footer') {
                                        <tr class="k-group-footer k-table-row">
                                            @if (detailTemplate()) {
                                                <td class="k-hierarchy-cell k-table-td"></td>
                                            }
                                            @if (isSelectionEnabled()) {
                                                <td class="k-checkbox-cell k-table-td"></td>
                                            }
                                            @for (col of bodyColumns(); track col) {
                                                <td
                                                    class="k-table-td"
                                                    [attr.colspan]="spanColspan(col)"
                                                    [style]="col.footerStyle"
                                                    [class]="col.footerClass"
                                                    [class.k-locked]="isColumnLocked(col)"
                                                    [style.left.px]="lockedOffsetFor(col)"
                                                    [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                    [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                    [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                                >
                                                    @if (col.footerTemplateRef !== null) {
                                                        <ng-container
                                                            [ngTemplateOutlet]="col.footerTemplateRef"
                                                            [ngTemplateOutletContext]="{ $implicit: aggregateValueFor(col, row.group.aggregates), column: col, aggregates: row.group.aggregates }"
                                                        />
                                                    } @else {
                                                        {{ groupAggregateTextFor(col, row.group) }}
                                                    }
                                                </td>
                                            }
                                        </tr>
                                    } @else {
                                        <tr [class]="rowClassFor(row.dataItem, row.dataIndex)">
                                            @if (detailTemplate()) {
                                                <td class="k-hierarchy-cell k-table-td">
                                                    <button
                                                        type="button"
                                                        class="k-button k-button-md k-button-solid k-button-icon k-hierarchy-expand"
                                                        [class.k-hierarchy-collapse]="isRowExpanded(row.dataItem, row.dataIndex)"
                                                        [attr.aria-expanded]="isRowExpanded(row.dataItem, row.dataIndex)"
                                                        [title]="isRowExpanded(row.dataItem, row.dataIndex) ? 'Collapse' : 'Expand'"
                                                        (click)="toggleRow(row.dataItem, row.dataIndex)"
                                                    >
                                                        <svg
                                                            class="k-icon k-svg-icon"
                                                            [attr.viewBox]="(isRowExpanded(row.dataItem, row.dataIndex) ? expandOpenIcon : expandClosedIcon).viewBox"
                                                            [innerHTML]="iconHtml(isRowExpanded(row.dataItem, row.dataIndex) ? expandOpenIcon : expandClosedIcon)"
                                                            focusable="false"
                                                            aria-hidden="true"
                                                        ></svg>
                                                    </button>
                                                </td>
                                            }
                                            @if (isSelectionEnabled()) {
                                                <td class="k-checkbox-cell k-table-td">
                                                    <input
                                                        type="checkbox"
                                                        class="k-checkbox"
                                                        [checked]="isRowSelected(row.dataItem)"
                                                        (change)="toggleRowSelection(row.dataItem)"
                                                    />
                                                </td>
                                            }
                                            @for (col of bodyColumns(); track col) {
                                                <td
                                                    class="k-table-td"
                                                    [attr.colspan]="spanColspan(col)"
                                                    [style]="col.style"
                                                    [class]="col.cssClass"
                                                    [class.k-locked]="isColumnLocked(col)"
                                                    [style.left.px]="lockedOffsetFor(col)"
                                                    [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                    [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                    [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                                    (dblclick)="beginEdit(row.dataItem, col, row.dataIndex)"
                                                >
                                                    @if (col.isSpanColumn()) {
                                                        @if (spanTemplateRef(col); as tpl) {
                                                            <ng-container
                                                                [ngTemplateOutlet]="tpl"
                                                                [ngTemplateOutletContext]="{ $implicit: row.dataItem, dataItem: row.dataItem, column: col }"
                                                            />
                                                        } @else {
                                                            @for (child of spanChildren(col); track child) {
                                                                @if (child.field !== undefined) {
                                                                    <div class="k-span-cell-value">{{ getValue(row.dataItem, child.field) }}</div>
                                                                }
                                                            }
                                                        }
                                                    } @else if (col.isCheckboxColumn()) {
                                                        <input
                                                            type="checkbox"
                                                            class="k-checkbox"
                                                            [checked]="isRowSelected(row.dataItem)"
                                                            (change)="toggleRowSelection(row.dataItem)"
                                                        />
                                                    } @else if (col.isRadioColumn()) {
                                                        <input
                                                            type="radio"
                                                            class="k-radio"
                                                            [checked]="isRowSelected(row.dataItem)"
                                                            (change)="selectRowOnly(row.dataItem)"
                                                        />
                                                    } @else if (col.isCommandColumn()) {
                                                        @if (isRowEditing(row.dataItem)) {
                                                            @if (commandVisible(col, 'save')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-save-command" title="Update" (click)="saveRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="saveCmdIcon.viewBox" [innerHTML]="iconHtml(saveCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'cancel')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-cancel-command" title="Cancel" (click)="cancelRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="cancelCmdIcon.viewBox" [innerHTML]="iconHtml(cancelCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        } @else {
                                                            @if (commandVisible(col, 'edit')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-edit-command" title="Edit" (click)="startRowEdit(row.dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="editCmdIcon.viewBox" [innerHTML]="iconHtml(editCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'remove')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-remove-command" title="Remove" (click)="removeRow(row.dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="trashCmdIcon.viewBox" [innerHTML]="iconHtml(trashCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        }
                                                    } @else {
                                                        @if (isRowEditing(row.dataItem)) {
                                                            @if (col.field !== undefined) {
                                                                <input
                                                                    class="k-input k-textbox k-editable-cell"
                                                                    [value]="editBufferValueFor(col.field)"
                                                                    (input)="onRowEditInput(col.field, $event)"
                                                                />
                                                            }
                                                        } @else if (isCellEditing(row.dataItem, col)) {
                                                            <input
                                                                class="k-input k-textbox k-editable-cell"
                                                                [value]="editValue()"
                                                                (input)="onEditInput($event)"
                                                                (keydown.enter)="commitEdit()"
                                                                (keydown.escape)="cancelEdit()"
                                                                (blur)="commitEdit()"
                                                            />
                                                        } @else {
                                                            @if (col.cellTemplateRef !== null) {
                                                                <ng-container
                                                                    [ngTemplateOutlet]="col.cellTemplateRef"
                                                                    [ngTemplateOutletContext]="{ $implicit: row.dataItem, rowIndex: row.dataIndex, column: col }"
                                                                />
                                                            } @else {
                                                                @if (col.field !== undefined) {
                                                                    {{ getValue(row.dataItem, col.field) }}
                                                                }
                                                            }
                                                        }
                                                    }
                                                </td>
                                            }
                                        </tr>
                                        @if (detailTemplate(); as dt) {
                                            @if (isRowExpanded(row.dataItem, row.dataIndex)) {
                                                <tr class="k-detail-row k-table-row" [style.height.px]="detailRowHeight() || null">
                                                    <td class="k-hierarchy-cell k-table-td"></td>
                                                    <td class="k-detail-cell k-table-td" [attr.colspan]="columnsCount() + (isSelectionEnabled() ? 1 : 0)">
                                                        <ng-container
                                                            [ngTemplateOutlet]="dt.templateRef"
                                                            [ngTemplateOutletContext]="{ $implicit: row.dataItem, index: row.dataIndex }"
                                                        />
                                                    </td>
                                                </tr>
                                            }
                                        }
                                    }
                                } @empty {
                                    <tr class="k-grid-norecords k-table-row">
                                        <td class="k-table-td" [attr.colspan]="columnsCount() + extraCellsCount()">
                                            <div class="k-grid-norecords-template">
                                                @if (noRecordsTemplate()?.templateRef; as tpl) {
                                                    <ng-container [ngTemplateOutlet]="tpl" />
                                                } @else {
                                                    <span class="k-grid-norecords-text">No records available.</span>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                }
                            } @else {
                                @for (dataItem of viewData(); track trackItemFn($index, dataItem); let rowIndex = $index) {
                                    <tr [class]="rowClassFor(dataItem, rowIndex)">
                                        @if (detailTemplate()) {
                                            <td class="k-hierarchy-cell k-table-td">
                                                <button
                                                    type="button"
                                                    class="k-button k-button-md k-button-solid k-button-icon k-hierarchy-expand"
                                                    [class.k-hierarchy-collapse]="isRowExpanded(dataItem, rowIndex)"
                                                    [attr.aria-expanded]="isRowExpanded(dataItem, rowIndex)"
                                                    [title]="isRowExpanded(dataItem, rowIndex) ? 'Collapse' : 'Expand'"
                                                    (click)="toggleRow(dataItem, rowIndex)"
                                                >
                                                    <svg
                                                        class="k-icon k-svg-icon"
                                                        [attr.viewBox]="(isRowExpanded(dataItem, rowIndex) ? expandOpenIcon : expandClosedIcon).viewBox"
                                                        [innerHTML]="iconHtml(isRowExpanded(dataItem, rowIndex) ? expandOpenIcon : expandClosedIcon)"
                                                        focusable="false"
                                                        aria-hidden="true"
                                                    ></svg>
                                                </button>
                                            </td>
                                        }
                                        @if (isSelectionEnabled()) {
                                            <td class="k-checkbox-cell k-table-td">
                                                <input
                                                    type="checkbox"
                                                    class="k-checkbox"
                                                    [checked]="isRowSelected(dataItem)"
                                                    (change)="toggleRowSelection(dataItem)"
                                                />
                                            </td>
                                        }
                                        @for (col of bodyColumns(); track col) {
                                            <td
                                                class="k-table-td"
                                                [attr.colspan]="spanColspan(col)"
                                                [style]="col.style"
                                                [class]="col.cssClass"
                                                [class.k-locked]="isColumnLocked(col)"
                                                [style.left.px]="lockedOffsetFor(col)"
                                                [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                                [style.z-index]="isColumnLocked(col) ? 5 : null"
                                                [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                                (dblclick)="beginEdit(dataItem, col, rowIndex)"
                                            >
                                                @if (col.isSpanColumn()) {
                                                    @if (spanTemplateRef(col); as tpl) {
                                                        <ng-container
                                                            [ngTemplateOutlet]="tpl"
                                                            [ngTemplateOutletContext]="{ $implicit: dataItem, dataItem: dataItem, column: col }"
                                                        />
                                                    } @else {
                                                        @for (child of spanChildren(col); track child) {
                                                            @if (child.field !== undefined) {
                                                                <div class="k-span-cell-value">{{ getValue(dataItem, child.field) }}</div>
                                                            }
                                                        }
                                                    }
                                                } @else if (col.isCheckboxColumn()) {
                                                        <input
                                                            type="checkbox"
                                                            class="k-checkbox"
                                                            [checked]="isRowSelected(dataItem)"
                                                            (change)="toggleRowSelection(dataItem)"
                                                        />
                                                    } @else if (col.isRadioColumn()) {
                                                        <input
                                                            type="radio"
                                                            class="k-radio"
                                                            [checked]="isRowSelected(dataItem)"
                                                            (change)="selectRowOnly(dataItem)"
                                                        />
                                                    } @else if (col.isCommandColumn()) {
                                                        @if (isRowEditing(dataItem)) {
                                                            @if (commandVisible(col, 'save')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-save-command" title="Update" (click)="saveRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="saveCmdIcon.viewBox" [innerHTML]="iconHtml(saveCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'cancel')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-cancel-command" title="Cancel" (click)="cancelRowEdit()">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="cancelCmdIcon.viewBox" [innerHTML]="iconHtml(cancelCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        } @else {
                                                            @if (commandVisible(col, 'edit')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-edit-command" title="Edit" (click)="startRowEdit(dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="editCmdIcon.viewBox" [innerHTML]="iconHtml(editCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                            @if (commandVisible(col, 'remove')) {
                                                                <button type="button" class="k-button k-button-md k-button-solid k-button-icon k-grid-remove-command" title="Remove" (click)="removeRow(dataItem)">
                                                                    <svg class="k-icon k-svg-icon" [attr.viewBox]="trashCmdIcon.viewBox" [innerHTML]="iconHtml(trashCmdIcon)" focusable="false" aria-hidden="true"></svg>
                                                                </button>
                                                            }
                                                        }
                                                    } @else {
                                                        @if (isRowEditing(dataItem)) {
                                                            @if (col.field !== undefined) {
                                                                <input
                                                                    class="k-input k-textbox k-editable-cell"
                                                                    [value]="editBufferValueFor(col.field)"
                                                                    (input)="onRowEditInput(col.field, $event)"
                                                                />
                                                            }
                                                        } @else if (isCellEditing(dataItem, col) && col.field !== undefined) {
                                                            <input
                                                                class="k-input k-textbox k-editable-cell"
                                                                [value]="editValue()"
                                                                (input)="onEditInput($event)"
                                                                (keydown.enter)="commitEdit()"
                                                                (keydown.escape)="cancelEdit()"
                                                                (blur)="commitEdit()"
                                                            />
                                                        } @else {
                                                            @if (col.cellTemplateRef !== null) {
                                                                <ng-container
                                                                    [ngTemplateOutlet]="col.cellTemplateRef"
                                                                    [ngTemplateOutletContext]="{ $implicit: dataItem, rowIndex: rowIndex, column: col }"
                                                                />
                                                            } @else {
                                                                @if (col.field !== undefined) {
                                                                    {{ getValue(dataItem, col.field) }}
                                                                }
                                                            }
                                                        }
                                                    }
                                            </td>
                                        }
                                    </tr>
                                    @if (detailTemplate(); as dt) {
                                        @if (isRowExpanded(dataItem, rowIndex)) {
                                            <tr class="k-detail-row k-table-row" [style.height.px]="detailRowHeight() || null">
                                                <td class="k-hierarchy-cell k-table-td"></td>
                                                <td class="k-detail-cell k-table-td" [attr.colspan]="columnsCount() + (isSelectionEnabled() ? 1 : 0)">
                                                    <ng-container
                                                        [ngTemplateOutlet]="dt.templateRef"
                                                        [ngTemplateOutletContext]="{ $implicit: dataItem, index: rowIndex }"
                                                    />
                                                </td>
                                            </tr>
                                        }
                                    }
                                } @empty {
                                    <tr class="k-grid-norecords k-table-row">
                                        <td class="k-table-td" [attr.colspan]="columnsCount() + extraCellsCount()">
                                            <div class="k-grid-norecords-template">
                                                @if (noRecordsTemplate()?.templateRef; as tpl) {
                                                    <ng-container [ngTemplateOutlet]="tpl" />
                                                } @else {
                                                    <span class="k-grid-norecords-text">No records available.</span>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                }
                            }
                            @if (showGridFooter()) {
                                <tr class="k-grid-footer-row k-table-row">
                                    @if (detailTemplate()) {
                                        <td class="k-hierarchy-cell k-table-td"></td>
                                    }
                                    @if (isSelectionEnabled()) {
                                        <td class="k-checkbox-cell k-table-td"></td>
                                    }
                                    @for (col of bodyColumns(); track col) {
                                        <td
                                            class="k-table-td"
                                            [attr.colspan]="spanColspan(col)"
                                            [style]="col.footerStyle"
                                            [class]="col.footerClass"
                                            [class.k-locked]="isColumnLocked(col)"
                                            [style.left.px]="lockedOffsetFor(col)"
                                            [style.position]="isColumnLocked(col) ? 'sticky' : null"
                                            [style.z-index]="isColumnLocked(col) ? 5 : null"
                                            [style.background]="isColumnLocked(col) ? 'var(--kendo-color-surface, #fff)' : null"
                                        >
                                            @if (col.footerTemplateRef !== null) {
                                                <ng-container
                                                    [ngTemplateOutlet]="col.footerTemplateRef"
                                                    [ngTemplateOutletContext]="{ $implicit: aggregateValueFor(col, gridAggregates()), column: col, aggregates: gridAggregates() }"
                                                />
                                            } @else {
                                                {{ gridAggregateTextFor(col) }}
                                            }
                                        </td>
                                    }
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            @if (loading()) {
                <div class="k-loading-mask">
                    <span class="k-loading-text">Loading...</span>
                    <div class="k-loading-color"></div>
                    <div class="k-loading-image"></div>
                </div>
            }

            @if (isPageable()) {
                <div class="k-pager k-grid-pager k-pager-md" role="navigation" aria-label="Pager">
                    <div class="k-pager-numbers-wrap">
                        <button
                            type="button"
                            class="k-pager-nav k-pager-first k-button k-button-md k-button-solid"
                            [disabled]="currentPage() <= 1"
                            title="Go to the first page"
                            (click)="gotoPage(0)"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="firstIcon.viewBox" [innerHTML]="iconHtml(firstIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                        <button
                            type="button"
                            class="k-pager-nav k-pager-prev k-button k-button-md k-button-solid"
                            [disabled]="currentPage() <= 1"
                            title="Go to the previous page"
                            (click)="gotoPage(currentPage() - 2)"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="prevIcon.viewBox" [innerHTML]="iconHtml(prevIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                        <div class="k-pager-numbers">
                            @for (page of pages(); track page) {
                                <button
                                    type="button"
                                    class="k-pager-numbers k-button k-button-md k-button-solid"
                                    [class.k-selected]="page === currentPage() - 1"
                                    [attr.tabindex]="page === currentPage() - 1 ? 0 : -1"
                                    (click)="gotoPage(page)"
                                >
                                    {{ page + 1 }}
                                </button>
                            }
                        </div>
                        <button
                            type="button"
                            class="k-pager-nav k-pager-next k-button k-button-md k-button-solid"
                            [disabled]="currentPage() >= pages().length"
                            title="Go to the next page"
                            (click)="gotoPage(currentPage())"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="nextIcon.viewBox" [innerHTML]="iconHtml(nextIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                        <button
                            type="button"
                            class="k-pager-nav k-pager-last k-button k-button-md k-button-solid"
                            [disabled]="currentPage() >= pages().length"
                            title="Go to the last page"
                            (click)="gotoPage(pages().length - 1)"
                        >
                            <svg class="k-icon k-svg-icon" [attr.viewBox]="lastIcon.viewBox" [innerHTML]="iconHtml(lastIcon)" focusable="false" aria-hidden="true"></svg>
                        </button>
                    </div>
                    <span class="k-pager-info k-label">{{ pagerInfo() }}</span>
                </div>
            }
        </div>
    `,
                }]
        }], ctorParameters: () => [], propDecorators: { data: [{ type: i0.Input, args: [{ isSignal: true, alias: "data", required: false }] }], scrollable: [{ type: i0.Input, args: [{ isSignal: true, alias: "scrollable", required: false }] }], selectable: [{ type: i0.Input, args: [{ isSignal: true, alias: "selectable", required: false }] }], trackBy: [{ type: i0.Input, args: [{ isSignal: true, alias: "trackBy", required: false }] }], virtualColumns: [{ type: i0.Input, args: [{ isSignal: true, alias: "virtualColumns", required: false }] }], autoGenerateColumns: [{ type: i0.Input, args: [{ isSignal: true, alias: "autoGenerateColumns", required: false }] }], filterable: [{ type: i0.Input, args: [{ isSignal: true, alias: "filterable", required: false }] }], sortable: [{ type: i0.Input, args: [{ isSignal: true, alias: "sortable", required: false }] }], pageable: [{ type: i0.Input, args: [{ isSignal: true, alias: "pageable", required: false }] }], groupable: [{ type: i0.Input, args: [{ isSignal: true, alias: "groupable", required: false }] }], navigable: [{ type: i0.Input, args: [{ isSignal: true, alias: "navigable", required: false }] }], autoSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "autoSize", required: false }] }], resizable: [{ type: i0.Input, args: [{ isSignal: true, alias: "resizable", required: false }] }], reorderable: [{ type: i0.Input, args: [{ isSignal: true, alias: "reorderable", required: false }] }], loading: [{ type: i0.Input, args: [{ isSignal: true, alias: "loading", required: false }] }], columnMenu: [{ type: i0.Input, args: [{ isSignal: true, alias: "columnMenu", required: false }] }], aggregates: [{ type: i0.Input, args: [{ isSignal: true, alias: "aggregates", required: false }] }], columnChooser: [{ type: i0.Input, args: [{ isSignal: true, alias: "columnChooser", required: false }] }], hideHeader: [{ type: i0.Input, args: [{ isSignal: true, alias: "hideHeader", required: false }] }], skip: [{ type: i0.Input, args: [{ isSignal: true, alias: "skip", required: false }] }], sort: [{ type: i0.Input, args: [{ isSignal: true, alias: "sort", required: false }] }], group: [{ type: i0.Input, args: [{ isSignal: true, alias: "group", required: false }] }], navigatable: [{ type: i0.Input, args: [{ isSignal: true, alias: "navigatable", required: false }] }], rowClass: [{ type: i0.Input, args: [{ isSignal: true, alias: "rowClass", required: false }] }], rowSelected: [{ type: i0.Input, args: [{ isSignal: true, alias: "rowSelected", required: false }] }], cellSelected: [{ type: i0.Input, args: [{ isSignal: true, alias: "cellSelected", required: false }] }], isDetailExpanded: [{ type: i0.Input, args: [{ isSignal: true, alias: "isDetailExpanded", required: false }] }], pageSize: [{ type: i0.Input, args: [{ isSignal: true, alias: "pageSize", required: false }] }], height: [{ type: i0.Input, args: [{ isSignal: true, alias: "height", required: false }] }], rowHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "rowHeight", required: false }] }], detailRowHeight: [{ type: i0.Input, args: [{ isSignal: true, alias: "detailRowHeight", required: false }] }], detailExpandBy: [{ type: i0.Input, args: [{ isSignal: true, alias: "detailExpandBy", required: false }] }], editable: [{ type: i0.Input, args: [{ isSignal: true, alias: "editable", required: false }] }], filter: [{ type: i0.Input, args: [{ isSignal: true, alias: "filter", required: false }] }], filterChange: [{ type: i0.Output, args: ["filterChange"] }], pageChange: [{ type: i0.Output, args: ["pageChange"] }], groupChange: [{ type: i0.Output, args: ["groupChange"] }], sortChange: [{ type: i0.Output, args: ["sortChange"] }], selectionChange: [{ type: i0.Output, args: ["selectionChange"] }], dataStateChange: [{ type: i0.Output, args: ["dataStateChange"] }], stateChange: [{ type: i0.Output, args: ["stateChange"] }], columnReorder: [{ type: i0.Output, args: ["columnReorder"] }], edit: [{ type: i0.Output, args: ["edit"] }], save: [{ type: i0.Output, args: ["save"] }], cancel: [{ type: i0.Output, args: ["cancel"] }], remove: [{ type: i0.Output, args: ["remove"] }], detailExpand: [{ type: i0.Output, args: ["detailExpand"] }], detailCollapse: [{ type: i0.Output, args: ["detailCollapse"] }], groupExpand: [{ type: i0.Output, args: ["groupExpand"] }], groupCollapse: [{ type: i0.Output, args: ["groupCollapse"] }], cellChange: [{ type: i0.Output, args: ["cellChange"] }], cellClose: [{ type: i0.Output, args: ["cellClose"] }], columns: [{ type: i0.ContentChildren, args: [i0.forwardRef(() => ColumnBase), { isSignal: true }] }], noRecordsTemplate: [{ type: i0.ContentChild, args: [i0.forwardRef(() => NoRecordsTemplateDirective), { isSignal: true }] }], detailTemplate: [{ type: i0.ContentChild, args: [i0.forwardRef(() => DetailTemplateDirective), { isSignal: true }] }] } });

/**
 * Cột chuẩn của grid — selector `kendo-grid-column`.
 *
 * ```html
 * <kendo-grid-column field="ProductName" title="Tên sản phẩm" width="200">
 *   <ng-template kendoGridCellTemplate let-dataItem>{{ dataItem.ProductName }}</ng-template>
 * </kendo-grid-column>
 * ```
 */
class ColumnComponent extends ColumnBase {
    /**
     * Tên field trong dataItem (hỗ trợ path lồng nhau 'a.b.c').
     */
    field = undefined;
    /**
     * Định dạng giá trị khi hiển thị (số/ngày) — apply v1.1.
     */
    format;
    /**
     * Cho phép sort theo cột này + settings riêng.
     */
    sortable = true;
    /**
     * Cho phép group theo cột này (v1.1).
     */
    groupable = true;
    /**
     * Kiểu editor khi editing (v1.2).
     */
    editor;
    /**
     * Kiểu filter cell hiển thị (v1.1).
     */
    filter;
    /**
     * Cho phép filter theo cột này.
     */
    filterable = true;
    /**
     * Cho phép edit cột này (v1.2).
     */
    editable = true;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: ColumnComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.28", type: ColumnComponent, isStandalone: true, selector: "smart-grid-column, kendo-grid-column", inputs: { field: "field", format: "format", sortable: "sortable", groupable: "groupable", editor: "editor", filter: "filter", filterable: "filterable", editable: "editable" }, providers: [{ provide: ColumnBase, useExisting: ColumnComponent }], usesInheritance: true, ngImport: i0, template: '<ng-content />', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: ColumnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'smart-grid-column, kendo-grid-column',
                    standalone: true,
                    template: '<ng-content />',
                    providers: [{ provide: ColumnBase, useExisting: ColumnComponent }],
                }]
        }], propDecorators: { field: [{
                type: Input
            }], format: [{
                type: Input
            }], sortable: [{
                type: Input
            }], groupable: [{
                type: Input
            }], editor: [{
                type: Input
            }], filter: [{
                type: Input
            }], filterable: [{
                type: Input
            }], editable: [{
                type: Input
            }] } });

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
class ColumnGroupComponent extends ColumnBase {
    children;
    isColumnGroup() {
        return true;
    }
    /** Các cột con không bị hidden. */
    visibleChildren() {
        return this.children.toArray().filter((c) => !c.hidden);
    }
    /** Flatten tất cả cột lá (không bị hidden) dưới group này. */
    leafColumns() {
        const leaves = [];
        for (const child of this.visibleChildren()) {
            if (child.isColumnGroup()) {
                leaves.push(...child.leafColumns());
            }
            else {
                leaves.push(child);
            }
        }
        return leaves;
    }
    /** Số cell header chiếm dụng (số cột lá visible). */
    get colspan() {
        return this.leafColumns().length;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: ColumnGroupComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.28", type: ColumnGroupComponent, isStandalone: true, selector: "smart-grid-column-group, kendo-grid-column-group", providers: [{ provide: ColumnBase, useExisting: ColumnGroupComponent }], queries: [{ propertyName: "children", predicate: ColumnBase }], usesInheritance: true, ngImport: i0, template: '<ng-content />', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: ColumnGroupComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'smart-grid-column-group, kendo-grid-column-group',
                    standalone: true,
                    template: '<ng-content />',
                    providers: [{ provide: ColumnBase, useExisting: ColumnGroupComponent }],
                }]
        }], propDecorators: { children: [{
                type: ContentChildren,
                args: [ColumnBase]
            }] } });

/**
 * Cột command cho row-edit — selector `kendo-grid-command-column`.
 *
 * ```html
 * <kendo-grid-command-column title="Actions" width="120"></kendo-grid-command-column>
 * ```
 */
class CommandColumnComponent extends ColumnBase {
    field = undefined;
    sortable = false;
    filterable = false;
    resizable = false;
    width = 180;
    edit = true;
    remove = true;
    save = true;
    cancel = true;
    isCommandColumn() {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: CommandColumnComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.28", type: CommandColumnComponent, isStandalone: true, selector: "smart-grid-command-column, kendo-grid-command-column", inputs: { field: "field", sortable: "sortable", filterable: "filterable", resizable: "resizable", width: "width", edit: "edit", remove: "remove", save: "save", cancel: "cancel" }, providers: [{ provide: ColumnBase, useExisting: CommandColumnComponent }], usesInheritance: true, ngImport: i0, template: '<ng-content />', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: CommandColumnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'smart-grid-command-column, kendo-grid-command-column',
                    standalone: true,
                    template: '<ng-content />',
                    providers: [{ provide: ColumnBase, useExisting: CommandColumnComponent }],
                }]
        }], propDecorators: { field: [{
                type: Input
            }], sortable: [{
                type: Input
            }], filterable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], width: [{
                type: Input
            }], edit: [{
                type: Input
            }], remove: [{
                type: Input
            }], save: [{
                type: Input
            }], cancel: [{
                type: Input
            }] } });

/**
 * Cột checkbox cho row selection — selector `kendo-grid-checkbox-column`.
 *
 * ```html
 * <kendo-grid-checkbox-column title="Chọn" width="60"></kendo-grid-checkbox-column>
 * ```
 */
class CheckboxColumnComponent extends ColumnBase {
    field = undefined;
    sortable = false;
    filterable = false;
    resizable = false;
    columnMenu = false;
    /** Hiển thị checkbox select-all ở header cell. */
    showSelectAll = true;
    isCheckboxColumn() {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: CheckboxColumnComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.28", type: CheckboxColumnComponent, isStandalone: true, selector: "smart-grid-checkbox-column, kendo-grid-checkbox-column", inputs: { field: "field", sortable: "sortable", filterable: "filterable", resizable: "resizable", columnMenu: "columnMenu", showSelectAll: "showSelectAll" }, providers: [{ provide: ColumnBase, useExisting: CheckboxColumnComponent }], usesInheritance: true, ngImport: i0, template: '<ng-content />', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: CheckboxColumnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'smart-grid-checkbox-column, kendo-grid-checkbox-column',
                    standalone: true,
                    template: '<ng-content />',
                    providers: [{ provide: ColumnBase, useExisting: CheckboxColumnComponent }],
                }]
        }], propDecorators: { field: [{
                type: Input
            }], sortable: [{
                type: Input
            }], filterable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], columnMenu: [{
                type: Input
            }], showSelectAll: [{
                type: Input
            }] } });

/**
 * Cột radio cho single selection — selector `kendo-grid-radio-column`.
 *
 * ```html
 * <kendo-grid-radio-column title="Chọn" width="60"></kendo-grid-radio-column>
 * ```
 */
class RadioColumnComponent extends ColumnBase {
    field = undefined;
    sortable = false;
    filterable = false;
    resizable = false;
    columnMenu = false;
    isRadioColumn() {
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: RadioColumnComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.28", type: RadioColumnComponent, isStandalone: true, selector: "smart-grid-radio-column, kendo-grid-radio-column", inputs: { field: "field", sortable: "sortable", filterable: "filterable", resizable: "resizable", columnMenu: "columnMenu" }, providers: [{ provide: ColumnBase, useExisting: RadioColumnComponent }], usesInheritance: true, ngImport: i0, template: '<ng-content />', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: RadioColumnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'smart-grid-radio-column, kendo-grid-radio-column',
                    standalone: true,
                    template: '<ng-content />',
                    providers: [{ provide: ColumnBase, useExisting: RadioColumnComponent }],
                }]
        }], propDecorators: { field: [{
                type: Input
            }], sortable: [{
                type: Input
            }], filterable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], columnMenu: [{
                type: Input
            }] } });

/**
 * `<ng-template kendoGridSpanCellTemplate let-dataItem>` — template cho merged cell
 * của span column. Context: `$implicit` = dataItem.
 */
class SpanCellTemplateDirective {
    templateRef = inject(TemplateRef);
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: SpanCellTemplateDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: SpanCellTemplateDirective, isStandalone: true, selector: "[smartGridSpanCellTemplate], [kendoGridSpanCellTemplate]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: SpanCellTemplateDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[smartGridSpanCellTemplate], [kendoGridSpanCellTemplate]',
                    standalone: true,
                }]
        }] });

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
class SpanColumnComponent extends ColumnBase {
    children;
    sortable = false;
    filterable = false;
    resizable = false;
    columnMenu = false;
    spanCellTemplateDirective;
    isSpanColumn() {
        return true;
    }
    /** TemplateRef của `<ng-template kendoGridSpanCellTemplate>` (nếu có). */
    get spanCellTemplateRef() {
        return this.spanCellTemplateDirective?.templateRef ?? null;
    }
    /** Các cột con không bị hidden. */
    visibleChildren() {
        return this.children.toArray().filter((c) => !c.hidden);
    }
    /** Flatten tất cả cột lá dưới span column (tính colspan + colgroup). */
    leafColumns() {
        const leaves = [];
        for (const child of this.visibleChildren()) {
            if (child.isColumnGroup()) {
                leaves.push(...child.leafColumns());
            }
            else if (child.isSpanColumn()) {
                leaves.push(...child.leafColumns());
            }
            else {
                leaves.push(child);
            }
        }
        return leaves;
    }
    /** Số cột body cell chiếm dụng trong merged cell. */
    get colspan() {
        return this.leafColumns().length;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: SpanColumnComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "20.3.28", type: SpanColumnComponent, isStandalone: true, selector: "smart-grid-span-column, kendo-grid-span-column", inputs: { sortable: "sortable", filterable: "filterable", resizable: "resizable", columnMenu: "columnMenu" }, providers: [{ provide: ColumnBase, useExisting: SpanColumnComponent }], queries: [{ propertyName: "spanCellTemplateDirective", first: true, predicate: SpanCellTemplateDirective, descendants: true }, { propertyName: "children", predicate: ColumnBase }], usesInheritance: true, ngImport: i0, template: '<ng-content />', isInline: true });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: SpanColumnComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'smart-grid-span-column, kendo-grid-span-column',
                    standalone: true,
                    template: '<ng-content />',
                    providers: [{ provide: ColumnBase, useExisting: SpanColumnComponent }],
                }]
        }], propDecorators: { children: [{
                type: ContentChildren,
                args: [ColumnBase]
            }], sortable: [{
                type: Input
            }], filterable: [{
                type: Input
            }], resizable: [{
                type: Input
            }], columnMenu: [{
                type: Input
            }], spanCellTemplateDirective: [{
                type: ContentChild,
                args: [SpanCellTemplateDirective]
            }] } });

const isGridDataResult = (source) => Array.isArray(source) === false;
/** @hidden — iterator nội bộ (khớp contract .d.ts DataResultIterator) */
class DataResultIterator {
    source;
    isGridDataResultFlag;
    constructor(source, skip = 0) {
        this.source = source;
        this.isGridDataResultFlag = isGridDataResult(source);
        // skip áp cho data thực bên trong GridDataResult/array
        this.source = this.isGridDataResultFlag
            ? { data: source.data.slice(skip), total: source.total }
            : source.slice(skip);
    }
    get total() {
        return this.isGridDataResultFlag
            ? this.source.total
            : this.source.length;
    }
    get data() {
        return this.isGridDataResultFlag ? this.source.data : this.source;
    }
    map(fn) {
        return this.data.map(fn);
    }
    filter(fn) {
        return this.data.filter(fn);
    }
    reduce(fn, init) {
        return this.data.reduce(fn, init);
    }
    forEach(fn) {
        this.data.forEach(fn);
    }
    some(fn) {
        return this.data.some(fn);
    }
    toString() {
        return this.data.toString();
    }
}
/**
 * DataCollection — wrapper read-only quanh iterator (khớp contract .d.ts,
 * dùng làm data source cho grid rendering / virtualization).
 */
class DataCollection {
    accessor;
    constructor(accessor) {
        this.accessor = accessor;
    }
    get total() {
        return this.accessor().total;
    }
    get length() {
        return this.accessor().data.length;
    }
    get first() {
        return this.accessor().data[0];
    }
    get last() {
        const data = this.accessor().data;
        return data[data.length - 1];
    }
    at(index) {
        return this.accessor().data[index];
    }
    map(fn) {
        return this.accessor().map(fn);
    }
    filter(fn) {
        return this.accessor().filter(fn);
    }
    reduce(fn, init) {
        return this.accessor().reduce(fn, init);
    }
    forEach(fn) {
        this.accessor().forEach(fn);
    }
    some(fn) {
        return this.accessor().some(fn);
    }
    toString() {
        return this.accessor().toString();
    }
}
/** Tiện ích: tạo DataCollection từ data source + vị trí skip. */
function toCollection(data, skip = 0) {
    return new DataCollection(() => new DataResultIterator(data, skip));
}

/**
 * Data Binding directive (khớp contract Kendo `kendoGridDataBinding`).
 *
 * Gắn lên `<kendo-grid>` để grid tự fetch khi user thay đổi state (sort/filter/page/group):
 *
 * ```html
 * <kendo-grid [kendoGridDataBinding]="fetchProducts" [pageable]="true"></kendo-grid>
 * ```
 */
class DataBindingDirective {
    grid;
    /** Hàm fetch dữ liệu (xem `DataBindingFetch`). Alias giữ tương thích với Kendo + branding mới. */
    set kendoGridDataBinding(value) {
        this.dataBinding = value;
    }
    set smartGridDataBinding(value) {
        this.dataBinding = value;
    }
    dataBinding;
    destroy$ = new Subject();
    constructor(grid) {
        this.grid = grid;
    }
    ngAfterViewInit() {
        if (!this.dataBinding) {
            return;
        }
        this.rebind(this.grid.getGridState());
        outputToObservable(this.grid.dataStateChange)
            .pipe(takeUntil(this.destroy$))
            .subscribe((state) => this.rebind(state));
    }
    /** Kendo-compatible: nạp lại dữ liệu với state hiện tại của grid. */
    reload() {
        this.rebind(this.grid.getGridState());
    }
    rebind(state) {
        const result = this.dataBinding?.(state);
        if (result === undefined) {
            return;
        }
        this.toObservable(result)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => this.grid.setData(data));
    }
    toObservable(result) {
        if (isObservable(result)) {
            return result;
        }
        if (result instanceof Promise || (typeof result === 'object' && result !== null && 'then' in result)) {
            return from(result);
        }
        return of(result);
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: DataBindingDirective, deps: [{ token: GridComponent }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "20.3.28", type: DataBindingDirective, isStandalone: true, selector: "[smartGridDataBinding], [kendoGridDataBinding]", inputs: { kendoGridDataBinding: "kendoGridDataBinding", smartGridDataBinding: "smartGridDataBinding" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: DataBindingDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[smartGridDataBinding], [kendoGridDataBinding]',
                    standalone: true,
                }]
        }], ctorParameters: () => [{ type: GridComponent }], propDecorators: { kendoGridDataBinding: [{
                type: Input,
                args: ['kendoGridDataBinding']
            }], smartGridDataBinding: [{
                type: Input,
                args: ['smartGridDataBinding']
            }] } });

/**
 * Types tương đương API của `@progress/kendo-data-query` (clean-room).
 * Contract chốt từ SPEC.md §6 (đã verify chéo 3 agents vs .d.ts).
 */
/** 16 string values khớp enum Kendo (SPEC §5.3) */
var FilterOperator;
(function (FilterOperator) {
    FilterOperator["Contains"] = "contains";
    FilterOperator["DoesNotContain"] = "doesnotcontain";
    FilterOperator["DoesNotEndWith"] = "doesnotendwith";
    FilterOperator["DoesNotStartWith"] = "doesnotstartwith";
    FilterOperator["EndsWith"] = "endswith";
    FilterOperator["EqualTo"] = "eq";
    FilterOperator["GreaterThan"] = "gt";
    FilterOperator["GreaterThanOrEqual"] = "gte";
    FilterOperator["IsEmpty"] = "isempty";
    FilterOperator["IsNotEmpty"] = "isnotempty";
    FilterOperator["IsNotNull"] = "isnotnull";
    FilterOperator["IsNull"] = "isnull";
    FilterOperator["LessThan"] = "lt";
    FilterOperator["LessThanOrEqual"] = "lte";
    FilterOperator["NotEqualTo"] = "neq";
    FilterOperator["StartsWith"] = "startswith";
})(FilterOperator || (FilterOperator = {}));

const COMPONENTS = [
    GridComponent,
    ColumnComponent,
    ColumnGroupComponent,
    CommandColumnComponent,
    CheckboxColumnComponent,
    RadioColumnComponent,
    SpanColumnComponent,
    CellTemplateDirective,
    HeaderTemplateDirective,
    FooterTemplateDirective,
    NoRecordsTemplateDirective,
    DetailTemplateDirective,
    SpanCellTemplateDirective,
    DataBindingDirective,
];
/**
 * SmartGridModule — import một lần, dùng mọi component/directive của smart-grid.
 *
 * ```ts
 * @Component({
 *     imports: [SmartGridModule],
 *     template: `<smart-grid [data]="items"><smart-grid-column field="name" /></smart-grid>`
 * })
 * export class MyComponent {}
 * ```
 */
class SmartGridModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: SmartGridModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "20.3.28", ngImport: i0, type: SmartGridModule, imports: [GridComponent,
            ColumnComponent,
            ColumnGroupComponent,
            CommandColumnComponent,
            CheckboxColumnComponent,
            RadioColumnComponent,
            SpanColumnComponent,
            CellTemplateDirective,
            HeaderTemplateDirective,
            FooterTemplateDirective,
            NoRecordsTemplateDirective,
            DetailTemplateDirective,
            SpanCellTemplateDirective,
            DataBindingDirective], exports: [GridComponent,
            ColumnComponent,
            ColumnGroupComponent,
            CommandColumnComponent,
            CheckboxColumnComponent,
            RadioColumnComponent,
            SpanColumnComponent,
            CellTemplateDirective,
            HeaderTemplateDirective,
            FooterTemplateDirective,
            NoRecordsTemplateDirective,
            DetailTemplateDirective,
            SpanCellTemplateDirective,
            DataBindingDirective] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: SmartGridModule });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.28", ngImport: i0, type: SmartGridModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [...COMPONENTS],
                    exports: [...COMPONENTS],
                }]
        }] });

/*
 * Public API Surface of smart-grid
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CellTemplateDirective, CheckboxColumnComponent, ColumnBase, ColumnComponent, ColumnGroupComponent, CommandColumnComponent, DataBindingDirective, DataCollection, DataResultIterator, DetailTemplateDirective, FilterOperator, FooterTemplateDirective, GridComponent, HeaderTemplateDirective, NoRecordsTemplateDirective, RadioColumnComponent, SmartGridModule, SpanCellTemplateDirective, SpanColumnComponent, aggregatesFor, filterBy, operators as filterOperators, getValue, getter, groupBy, orderBy, process, slicePage, toCollection };
//# sourceMappingURL=smart-grid.mjs.map
