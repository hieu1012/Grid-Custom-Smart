import {
    Component,
    TemplateRef,
    ElementRef,
    contentChild,
    contentChildren,
    computed,
    effect,
    inject,
    input,
    output,
    signal,
    ChangeDetectionStrategy,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
    chevronDoubleLeftIcon,
    chevronDoubleRightIcon,
    chevronDownIcon,
    chevronLeftIcon,
    chevronRightIcon,
    checkIcon,
    columnsIcon,
    groupIcon,
    pencilIcon,
    sortAscSmallIcon,
    sortDescSmallIcon,
    trashIcon,
    xIcon,
    SVGIcon,
} from '@progress/kendo-svg-icons';
import { ColumnBase } from './columns/column-base';
import { CheckboxColumnComponent } from './columns/checkbox-column.component';
import { ColumnGroupComponent } from './columns/column-group.component';
import { CommandColumnComponent } from './columns/command-column.component';
import { RadioColumnComponent } from './columns/radio-column.component';
import { SpanColumnComponent } from './columns/span-column.component';
import { NoRecordsTemplateDirective } from './rendering/no-records-template.directive';
import { DetailTemplateDirective } from './rendering/detail-template.directive';
import { GridDataResult } from './data/grid-data-result';
import { DataStateChangeEvent, PageChangeEvent } from './data/change-event-args';
import { process } from './query/paging';
import {
    CompositeFilterDescriptor,
    FilterableSettings,
    FilterDescriptor,
    GroupDescriptor,
    GroupResult,
    GroupableSettings,
    PagerSettings,
    ScrollMode,
    SelectableSettings,
    SortDescriptor,
    SortOrder,
    SortSettings,
} from './query/types';
import {
    CellSelectedFn,
    ColumnMenuSettings,
    ColumnReorderEvent,
    DetailExpandEvent,
    EditEvent,
    GridItem,
    GroupExpandCollapseEvent,
    RowClassFn,
    RowSelectedFn,
    SelectionEvent,
} from './types';
import { getValue } from './utils/getter';
import { aggregatesFor } from './query/grouping';
import { filterBy } from './query/filtering';
import { AggregateDescriptor, AggregateResult, AggregateResultValue } from './query/types';

const EMPTY_RESULT = { data: [] as any[], total: 0 };

type GridViewRow =
    | { type: 'group'; group: GroupResult; index: string }
    | { type: 'footer'; group: GroupResult; index: string }
    | { type: 'data'; dataItem: any; dataIndex: number; index: string };

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
@Component({
    selector: 'kendo-grid',
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
})
export class GridComponent {
    /* ── Icons (kendo-svg-icons) ───────────────────────────────────── */

    public readonly sortAscIcon: SVGIcon = sortAscSmallIcon;
    public readonly sortDescIcon: SVGIcon = sortDescSmallIcon;
    public readonly firstIcon: SVGIcon = chevronDoubleLeftIcon;
    public readonly prevIcon: SVGIcon = chevronLeftIcon;
    public readonly nextIcon: SVGIcon = chevronRightIcon;
    public readonly lastIcon: SVGIcon = chevronDoubleRightIcon;
    public readonly expandOpenIcon: SVGIcon = chevronDownIcon;
    public readonly expandClosedIcon: SVGIcon = chevronRightIcon;
    public readonly groupButtonIcon: SVGIcon = groupIcon;
    public readonly columnsMenuIcon: SVGIcon = columnsIcon;
    public readonly menuSortAscIcon: SVGIcon = sortAscSmallIcon;
    public readonly menuSortDescIcon: SVGIcon = sortDescSmallIcon;
    public readonly editCmdIcon: SVGIcon = pencilIcon;
    public readonly trashCmdIcon: SVGIcon = trashIcon;
    public readonly saveCmdIcon: SVGIcon = checkIcon;
    public readonly cancelCmdIcon: SVGIcon = xIcon;

    private readonly sanitizer = inject(DomSanitizer);
    private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    /** Render nội dung SVG icon (path) an toàn qua [innerHTML]. */
    public iconHtml(icon: SVGIcon): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(icon.content);
    }

    /** Width cột cho colgroup — number → px, string → giữ nguyên. */
    public colWidthStyle(col: ColumnBase): { width: string } | null {
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
    public readonly data = input<GridDataResult | any[] | null>(null);

    /** Chế độ scroll: 'none' | 'scrollable' | 'virtual'. */
    public readonly scrollable = input<ScrollMode>('scrollable');

    /** Bật/tắt selection (v1: chỉ ảnh hưởng khi có rowSelected). */
    public readonly selectable = input<boolean | SelectableSettings>(false);

    /** Hàm trackBy cho rows (TrackByFunction<GridItem>). */
    public readonly trackBy = input<((index: number, item: GridItem) => any) | undefined>(undefined);

    /** Virtual columns (v2). */
    public readonly virtualColumns = input(false);

    /** Tự sinh cột từ keys của data khi không khai báo cột nào (SPEC §6.1). */
    public readonly autoGenerateColumns = input(false);

    /** Bật/tắt filtering — 'row' | 'menu' | 'menu, row' (filter row UI: v1.1). */
    public readonly filterable = input<FilterableSettings>(false);

    /** Bật/tắt sorting + settings. */
    public readonly sortable = input<SortSettings>(false);

    /** Bật/tắt paging + settings. */
    public readonly pageable = input<boolean | PagerSettings>(false);

    /** Bật/tắt grouping (v1.1). */
    public readonly groupable = input<boolean | GroupableSettings>(false);

    /** Keyboard navigation (deferred). */
    public readonly navigable = input(false);

    /** Auto-resize cột theo nội dung (v1.1). */
    public readonly autoSize = input(false);

    /** Cho phép resize cột (v1.1). */
    public readonly resizable = input(false);

    /** Cho phép reorder cột (v1.1). */
    public readonly reorderable = input(false);

    /** Hiển thị loading overlay. */
    public readonly loading = input(false);

    /** Bật tắt column menu (v1.2). */
    public readonly columnMenu = input<boolean | ColumnMenuSettings>(false);

    /** Aggregates cho grid footer (client-side, tính trên toàn bộ data đã filter). */
    public readonly aggregates = input<AggregateDescriptor[]>([]);

    /** Hiển thị toolbar column chooser (nút Columns toggle visibility các cột). */
    public readonly columnChooser = input(false);

    /** Ẩn header. */
    public readonly hideHeader = input(false);

    /** Skip hiện tại (page offset). */
    public readonly skip = input(0);

    /** Sort descriptors hiện tại. */
    public readonly sort = input<SortDescriptor[]>([]);

    /** Group descriptors hiện tại (v1.1). */
    public readonly group = input<GroupDescriptor[]>([]);

    /** Deprecated alias của `navigable`. */
    public readonly navigatable = input(false);

    /** Hàm trả CSS class cho mỗi row: `(context: RowClassArgs) => string`. */
    public readonly rowClass = input<RowClassFn | undefined>(undefined);

    /** Hàm xác định row được chọn (highlight). */
    public readonly rowSelected = input<RowSelectedFn | undefined>(undefined);

    /** Hàm xác định cell được chọn. */
    public readonly cellSelected = input<CellSelectedFn | undefined>(undefined);

    /** Hàm xác định detail row mở rộng hay không. */
    public readonly isDetailExpanded = input<((dataItem: any, index: number) => boolean) | undefined>(undefined);

    /** Số records mỗi trang. */
    public readonly pageSize = input(20);

    /** Chiều cao grid (px). */
    public readonly height = input<number | undefined>(undefined);

    /** Chiều cao row — virtual scroll (v2). */
    public readonly rowHeight = input(28);

    /** Chiều cao detail row (v1.1). */
    public readonly detailRowHeight = input(0);

    /** Field unique key giữ trạng thái expand qua paging (kendo: detailExpandBy). */
    public readonly detailExpandBy = input<string | undefined>(undefined);

    /** Bật inline editing (double-click cell → input, Enter lưu / Esc hủy). */
    public readonly editable = input(false);

    /** Filter descriptors hiện tại. */
    public readonly filter = input<CompositeFilterDescriptor | null>(null);

    /* ── Outputs — SPEC §2.2 (các sự kiện feature đang active) ──────── */

    /** Phát khi user thay đổi filter (filter row UI: v1.1). */
    public readonly filterChange = output<CompositeFilterDescriptor>();

    /** Phát khi user đổi trang. */
    public readonly pageChange = output<PageChangeEvent>();

    /** Phát khi user thay đổi group (v1.1). */
    public readonly groupChange = output<GroupDescriptor[]>();

    /** Phát khi user click sort header. */
    public readonly sortChange = output<SortDescriptor[]>();

    /** Phát khi user select/deselect (selection: v1.1). */
    public readonly selectionChange = output<SelectionEvent>();

    /** Phát khi bất kỳ state nào (sort/page/filter/group) thay đổi. */
    public readonly dataStateChange = output<DataStateChangeEvent>();

    /** Phát khi `setGridState()` được gọi (state persistence) — khớp Kendo: chỉ set programmatic mới fire. */
    public readonly stateChange = output<DataStateChangeEvent>();

    /** Phát khi user drag header để đổi thứ tự cột. */
    public readonly columnReorder = output<ColumnReorderEvent>();

    /** Phát khi user click Edit (row-edit mode). */
    public readonly edit = output<EditEvent>();

    /** Phát khi user lưu row đang edit. */
    public readonly save = output<EditEvent>();

    /** Phát khi user hủy row-edit. */
    public readonly cancel = output<EditEvent>();

    /** Phát khi user click Remove. */
    public readonly remove = output<EditEvent>();

    /** Phát khi mở detail row. */
    public readonly detailExpand = output<DetailExpandEvent>();

    /** Phát khi đóng detail row. */
    public readonly detailCollapse = output<DetailExpandEvent>();

    /** Phát khi mở group (v1.1). */
    public readonly groupExpand = output<GroupExpandCollapseEvent>();

    /** Phát khi đóng group (v1.1). */
    public readonly groupCollapse = output<GroupExpandCollapseEvent>();

    /** Phát khi nhấn Enter/blur để lưu 1 cell edit. */
    public readonly cellChange = output<{ dataItem: any; field: string; value: any }>();

    /** Phát khi đóng cell editor (lưu hoặc hủy). */
    public readonly cellClose = output<{ dataItem: any; field: string; rowIndex: number }>();

    /* ── Content children ──────────────────────────────────────────── */

    /** Các cột khai báo trong template (`kendo-grid-column`...). */
    public readonly columns = contentChildren(ColumnBase);

    public readonly noRecordsTemplate = contentChild(NoRecordsTemplateDirective);

    /** Detail template (`kendoGridDetailTemplate`) — master detail active khi có. */
    public readonly detailTemplate = contentChild(DetailTemplateDirective);

    /* ── Internal state (writable signals, sync từ inputs) ─────────── */

    private readonly skipState = signal(0);
    private readonly pageSizeState = signal(20);
    private readonly sortState = signal<SortDescriptor[]>([]);
    private readonly filterState = signal<CompositeFilterDescriptor | null>(null);
    private readonly groupState = signal<GroupDescriptor[]>([]);
    private readonly expandedKeys = signal<Set<unknown>>(new Set());

    /** Bump để force re-render khi mutate thuộc tính column (resize/hidden). */
    private readonly layoutVersion = signal(0);

    /** Bump khi có media query của cột đổi trạng thái (responsive columns). */
    private readonly mediaVersion = signal(0);

    /** Thứ tự cột sau khi reorder (null = dùng thứ tự khai báo). */
    private readonly reorderColumns = signal<ColumnBase[] | null>(null);

    /** Các dataItem đang được chọn (identity-based, giữ qua paging). */
    private readonly selectedKeys = signal<Set<any>>(new Set());

    /** Group index đang collapse (vd "0", "0_1"). Rỗng = tất cả expanded. */
    private readonly collapsedGroups = signal<Set<string>>(new Set());

    /** Cell đang edit: { dataItem, field, value } hoặc null. */
    private readonly editState = signal<{ dataItem: any; field: string; value: string } | null>(null);

    /** DataItem đang row-edit (null = không edit row nào). */
    private readonly editRowData = signal<any | null>(null);

    /** Bản copy giá trị row đang edit — commit mới ghi vào dataItem gốc. */
    private readonly editRowBuffer = signal<Record<string, any> | null>(null);

    /** Column đang mở column menu (null = đóng). */
    private readonly menuColumn = signal<ColumnBase | null>(null);

    /** Column chooser đang mở. */
    private readonly chooserOpenSignal = signal(false);

    /** Data đang render (writable interior) — feed từ `data` input hoặc `setData()` (DataBindingDirective). */
    private readonly dataState = signal<GridDataResult | any[] | null>(null);

    private autoGenCache: ColumnBase[] | null = null;
    private autoGenFirst: any = undefined;

    private readonly generatedColumns = computed<ColumnBase[]>(() => {
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
    });

    private buildAutoColumns(sample: any): ColumnBase[] {
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
    public readonly visibleColumns = computed(() => {
        this.layoutVersion();
        const declared = this.columns();
        const base = declared.length > 0 ? declared : this.generatedColumns();
        return (this.reorderColumns() ?? base).filter((col) => !col.hidden && !this.isMediaHidden(col));
    });

    /** Cột bị ẩn bởi media query (`col.media` không khớp viewport hiện tại) — responsive columns. */
    public isMediaHidden(col: ColumnBase): boolean {
        this.mediaVersion();
        if (!col.media) {
            return false;
        }
        return !window.matchMedia(col.media).matches;
    }

    public readonly leafColumns = computed<ColumnBase[]>(() => {
        const leaves: ColumnBase[] = [];
        for (const col of this.visibleColumns()) {
            if (col.isColumnGroup()) {
                leaves.push(...(col as ColumnGroupComponent).leafColumns());
            } else if (col.isSpanColumn()) {
                leaves.push(...(col as SpanColumnComponent).leafColumns());
            } else {
                leaves.push(col);
            }
        }
        return leaves;
    });

    /** Cột body render: group được flatten nhưng span column giữ nguyên (merged cell). */
    public readonly bodyColumns = computed<ColumnBase[]>(() => {
        const cols: ColumnBase[] = [];
        for (const col of this.visibleColumns()) {
            if (col.isColumnGroup()) {
                cols.push(...(col as ColumnGroupComponent).leafColumns());
            } else {
                cols.push(col);
            }
        }
        return cols;
    });

    public readonly headerRows = computed<GridHeaderCell[][]>(() => {
        this.layoutVersion();
        const cols = this.visibleColumns();
        const depth = this.headerDepth(cols);
        const rows: GridHeaderCell[][] = Array.from({ length: depth }, () => []);
        for (const col of cols) {
            this.fillHeaderRows(col, rows, 0, depth);
        }
        return rows;
    });

    private headerDepth(cols: ColumnBase[]): number {
        let depth = 1;
        for (const col of cols) {
            const group = col as ColumnGroupComponent;
            if (col.isColumnGroup() && group.visibleChildren().length > 0) {
                depth = Math.max(depth, 1 + this.headerDepth(group.visibleChildren()));
            }
        }
        return depth;
    }

    private fillHeaderRows(col: ColumnBase, rows: GridHeaderCell[][], level: number, depth: number): void {
        if (col.isColumnGroup()) {
            const group = col as ColumnGroupComponent;
            const leaves = group.leafColumns();
            if (leaves.length === 0) {
                return;
            }
            rows[level].push({ column: col, colspan: leaves.length, rowspan: 1, isGroup: true });
            for (const child of group.visibleChildren()) {
                this.fillHeaderRows(child, rows, level + 1, depth);
            }
        } else {
            rows[level].push({ column: col, colspan: 1, rowspan: depth - level, isGroup: false });
        }
    }

    /** Kết quả query: server-driven → render nguyên trang; client-side → filter+sort+page. */
    public readonly result = computed(() => {
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
    });

    /** Data rows hiển thị trên view. */
    public readonly viewData = computed(() => this.result().data);

    /** Kết quả aggregates cho grid footer (tính trên data đã filter, trước paging). */
    public readonly gridAggregates = computed<AggregateResult>(() => {
        const descriptors = this.aggregates();
        if (!descriptors.length) {
            return {};
        }
        const source = this.dataState();
        const items = Array.isArray(source) ? source : (source?.data ?? []);
        return aggregatesFor(descriptors, filterBy(items, this.filterState() ?? undefined));
    });

    public showGridFooter(): boolean {
        return (
            this.aggregates().length > 0 ||
            this.bodyColumns().some((col) => col.footerTemplateRef !== null)
        );
    }

    /** Aggregate results của 1 field (undefined nếu field rỗng hoặc không có aggregate). */
    public aggregateValueFor(col: ColumnBase, aggregates: AggregateResult | undefined): AggregateResultValue | undefined {
        if (col.field === undefined || !aggregates) {
            return undefined;
        }
        return aggregates[col.field];
    }

    /** Aggregate text cho 1 cột (vd "Sum: 142.50") — rỗng nếu cột không có aggregate. */
    public gridAggregateTextFor(col: ColumnBase): string {
        if (col.field === undefined || col.isSpanColumn()) {
            return '';
        }
        const agg = this.gridAggregates()[col.field];
        if (!agg) {
            return '';
        }
        return Object.keys(agg)
            .map((kind) => `${kind === 'average' ? 'Avg' : kind[0].toUpperCase() + kind.slice(1)}: ${this.formatAggregateValue(agg[kind as keyof AggregateResultValue])}`)
            .join(' | ');
    }

    /** Aggregate text cho group footer của 1 cột — đọc từ `group.aggregates`. */
    public groupAggregateTextFor(col: ColumnBase, group: GroupResult): string {
        if (col.field === undefined || col.isSpanColumn()) {
            return '';
        }
        const agg = group.aggregates?.[col.field];
        if (!agg) {
            return '';
        }
        return Object.keys(agg)
            .map((kind) => `${kind === 'average' ? 'Avg' : kind[0].toUpperCase() + kind.slice(1)}: ${this.formatAggregateValue(agg[kind as keyof AggregateResultValue])}`)
            .join(' | ');
    }

    private formatAggregateValue(value: number | undefined): string {
        return value === undefined ? '' : String(value);
    }

    /** Tổng records (sau filter, trước page) hoặc total của server. */
    public readonly total = computed(() => this.result().total);

    /** Số cột hiển thị (cho colspan của empty row). */
    public readonly columnsCount = computed(() => Math.max(this.leafColumns().length, 1));

    private readonly pageSizeValue = computed(() => Math.max(1, this.pageSizeState()));

    /** Danh sách 0-based page index. */
    public readonly pages = computed(() => {
        const total = this.total();
        if (!total) {
            return [] as number[];
        }
        const count = Math.ceil(total / this.pageSizeValue());
        return Array.from({ length: count }, (_, i) => i);
    });

    /** Page hiện tại (1-based). */
    public readonly currentPage = computed(() => Math.floor(this.skipState() / this.pageSizeValue()) + 1);

    public readonly pagerInfo = computed(
        () => `Page ${this.currentPage()} of ${Math.max(this.pages().length, 1)} (${this.total()} records)`
    );

    /* ── Feature computed (filter row / selection / group / view) ──── */

    public isFilterRow(): boolean {
        const value = this.filterable();
        return typeof value === 'string' ? value.includes('row') : value === true;
    }

    public isSelectionEnabled(): boolean {
        const value = this.selectable();
        if (typeof value === 'boolean') {
            return value;
        }
        return value?.enabled ?? false;
    }

    public isGroupableEnabled(): boolean {
        const value = this.groupable();
        if (typeof value === 'boolean') {
            return value;
        }
        return value?.enabled ?? false;
    }

    public isGrouped(): boolean {
        return this.isGroupableEnabled() && this.groupState().length > 0;
    }

    public isGroupFooterEnabled(): boolean {
        return this.groupState().some((d) => d.aggregates !== undefined && d.aggregates.length > 0);
    }

    public isResizable(): boolean {
        return this.resizable() === true;
    }

    public isColumnMenuEnabled(): boolean {
        const value = this.columnMenu();
        return typeof value === 'boolean' ? value : true;
    }

    /** View rows khi grouping active: flatten (group headers + items + footers) rồi paging. */
    public readonly viewRows = computed<GridViewRow[]>(() => {
        if (!this.isGrouped()) {
            return [];
        }
        const rows: GridViewRow[] = [];
        const dataRef = { v: 0 };
        this.flattenGroups(this.result().data as GroupResult[], rows, '', dataRef);
        const skip = this.skipState();
        const take = this.pageSizeValue();
        if (this.isPageable() && take > 0) {
            return rows.slice(skip, skip + take);
        }
        return rows;
    });

    private flattenGroups(groups: GroupResult[], rows: GridViewRow[], path: string, dataRef: { v: number }): void {
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i];
            const index = path ? `${path}_${i}` : `${i}`;
            rows.push({ type: 'group', group, index });
            if (this.collapsedGroups().has(index)) {
                continue;
            }
            const items = group.items as any[];
            if (items.length > 0 && (items[0] as GroupResult).field !== undefined) {
                this.flattenGroups(items as GroupResult[], rows, index, dataRef);
            } else {
                for (const item of items) {
                    rows.push({ type: 'data', dataItem: item, dataIndex: dataRef.v++, index: `${index}_${dataRef.v - 1}` });
                }
            }
            if (this.isGroupFooterEnabled()) {
                rows.push({ type: 'footer', group, index: `${index}_footer` });
            }
        }
    }

    public groupItemCount(group: GroupResult): number {
        const items = group.items as any[];
        if (items.length > 0 && (items[0] as GroupResult).field !== undefined) {
            return (items as GroupResult[]).reduce((acc, g) => acc + this.groupItemCount(g), 0);
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
            const cleanups: (() => void)[] = [];
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

    public setData(value: GridDataResult | any[] | null): void {
        this.dataState.set(value);
    }

    public getGridState(): DataStateChangeEvent {
        return {
            skip: this.skipState(),
            take: this.pageSizeValue(),
            sort: this.sortState(),
            group: this.groupState(),
            filter: this.filterState() ?? undefined,
        };
    }

    public setGridState(state: DataStateChangeEvent): void {
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

    public isColumnLocked(col: ColumnBase): boolean {
        if (col.locked) {
            return true;
        }
        if (col.isColumnGroup()) {
            const leaves = (col as ColumnGroupComponent).leafColumns();
            return leaves.length > 0 && leaves.every((c) => c.locked);
        }
        if (col.isSpanColumn()) {
            const leaves = (col as SpanColumnComponent).leafColumns();
            return leaves.length > 0 && leaves.every((c) => c.locked);
        }
        return false;
    }

    public spanColspan(col: ColumnBase): number | null {
        if (!col.isSpanColumn()) {
            return null;
        }
        return Math.max((col as SpanColumnComponent).leafColumns().length, 1);
    }

    public spanTemplateRef(col: ColumnBase): TemplateRef<any> | null {
        return col.isSpanColumn() ? (col as SpanColumnComponent).spanCellTemplateRef : null;
    }

    public spanChildren(col: ColumnBase): ColumnBase[] {
        return col.isSpanColumn() ? (col as SpanColumnComponent).leafColumns() : [];
    }

    public lockedOffsetFor(col: ColumnBase): number | null {
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
            const first = (col as ColumnGroupComponent).leafColumns()[0];
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
            const first = (col as SpanColumnComponent).leafColumns()[0];
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

    private columnPixelWidth(col: ColumnBase): number {
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

    private dragState: { col: ColumnBase; fromIndex: number } | null = null;

    public isReorderableColumn(col: ColumnBase): boolean {
        return this.reorderable() && col.reorderable !== false && !col.isColumnGroup() && !col.isSpanColumn();
    }

    public isReorderDragging(col: ColumnBase): boolean {
        return this.dragState?.col === col;
    }

    public startReorder(event: MouseEvent, col: ColumnBase): void {
        if (!this.isReorderableColumn(col)) {
            return;
        }
        const target = event.target as HTMLElement;
        if (target.closest('.k-resize-handle, .k-column-menu-button, .k-grouping-header, .k-column-menu')) {
            return;
        }
        event.preventDefault();
        this.dragState = { col, fromIndex: this.leafColumns().indexOf(col) };
    }

    public onReorderMove(event: MouseEvent): void {
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

    public onReorderEnd(_event: MouseEvent): void {
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

    private reorderTargetIndex(clientX: number): number {
        const ths = this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
            'thead.k-grid-header tr:last-of-type th:not(.k-hierarchy-cell):not(.k-checkbox-cell)'
        );
        for (let i = 0; i < ths.length; i++) {
            const rect = ths[i].getBoundingClientRect();
            if (clientX < rect.left + rect.width / 2) {
                return i;
            }
        }
        return ths.length - 1;
    }

    /* ── Sorting ───────────────────────────────────────────────────── */

    public sortColumn(col: ColumnBase): void {
        if (!this.isGridSortable() || col.isColumnGroup() || col.field === undefined || col.sortable === false) {
            return;
        }
        const field = col.field;
        const current = this.sortState();
        const existing = current.findIndex((d) => d.field === field);
        const settings = this.sortSettings();

        let next: SortDescriptor[];
        if (existing !== -1) {
            const currentDir = current[existing].dir ?? 'asc';
            if (currentDir === 'desc' && settings.allowUnsort) {
                next = current.filter((_, i) => i !== existing);
            } else {
                const dir: SortOrder = currentDir === 'asc' ? 'desc' : 'asc';
                next =
                    settings.mode === 'single'
                        ? [{ field, dir }]
                        : current.map((d) => (d.field === field ? { field, dir } : d));
            }
        } else {
            const dir = settings.initialDirection;
            next = settings.mode === 'single' ? [{ field, dir }] : [...current, { field, dir }];
        }

        this.sortState.set(next);
        this.sortChange.emit(next);
        this.emitDataState();
    }

    /** Sort descriptor đang áp dụng cho 1 cột (null nếu chưa sort). */
    public sortDescriptorFor(col: ColumnBase): SortDescriptor | null {
        if (col.field === undefined) {
            return null;
        }
        return this.sortState().find((d) => d.field === col.field) ?? null;
    }

    public headerClassFor(col: ColumnBase): string {
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

    private isGridSortable(): boolean {
        const value = this.sortable();
        return typeof value === 'boolean' ? value : true;
    }

    private sortSettings(): { mode: 'single' | 'multiple'; allowUnsort: boolean; initialDirection: SortOrder } {
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

    public isPageable(): boolean {
        const value = this.pageable();
        return typeof value === 'boolean' ? value : true;
    }

    public gotoPage(pageIndex: number): void {
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

    public trackItemFn(index: number, dataItem: any): any {
        const item: GridItem = { type: 'data', dataItem, dataRowIndex: index };
        const fn = this.trackBy();
        return fn ? fn(index, item) : dataItem;
    }

    public rowClassFor(dataItem: any, index: number): string {
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

    public getValue(dataItem: any, field: string): any {
        return getValue(dataItem, field);
    }

    /* ── Master detail ─────────────────────────────────────────────── */

    private detailKeyFor(dataItem: any, index: number): unknown {
        const field = this.detailExpandBy();
        return field !== undefined ? getValue(dataItem, field) : index;
    }

    public isRowExpanded(dataItem: any, index: number): boolean {
        const fn = this.isDetailExpanded();
        if (fn) {
            return fn(dataItem, index);
        }
        return this.expandedKeys().has(this.detailKeyFor(dataItem, index));
    }

    public toggleRow(dataItem: any, index: number): void {
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
        } else {
            next.add(key);
        }
        this.expandedKeys.set(next);
        (expanded ? this.detailCollapse : this.detailExpand).emit({ dataItem, index, expand: !expanded });
    }

    /* ── Filter row ────────────────────────────────────────────────── */

    public filterValueFor(col: ColumnBase): string {
        if (col.field === undefined) {
            return '';
        }
        const filters = this.filterState()?.filters as FilterDescriptor[] | undefined;
        const match = filters?.find((f) => !Array.isArray(f) && (f as FilterDescriptor).field === col.field);
        return match ? String((match as FilterDescriptor).value ?? '') : '';
    }

    public applyColumnFilter(col: ColumnBase, event: Event): void {
        if (col.field === undefined) {
            return;
        }
        const value = (event.target as HTMLInputElement).value;
        const existing = this.filterState();
        const filters = (existing?.filters as FilterDescriptor[]) ?? [];
        const rest = filters.filter((f) => !Array.isArray(f) && (f as FilterDescriptor).field !== col.field);

        let next: CompositeFilterDescriptor;
        if (value === '') {
            next = rest.length ? { logic: 'and', filters: rest } : { logic: 'and', filters: [] };
        } else {
            const sample = this.result().data[0];
            const raw = sample !== undefined ? getValue(sample, col.field) : undefined;
            const operator = typeof raw === 'number' ? 'eq' : 'contains';
            const filterValue = typeof raw === 'number' ? Number(value) : value;
            const descriptor: FilterDescriptor = { field: col.field, operator, value: filterValue };
            next = { logic: 'and', filters: [...rest, descriptor] };
        }
        this.filterState.set(next);
        this.skipState.set(0);
        this.filterChange.emit(next);
        this.emitDataState();
    }

    /* ── Selection ─────────────────────────────────────────────────── */

    public isRowSelected(dataItem: any): boolean {
        return this.selectedKeys().has(dataItem);
    }

    public get allSelected(): boolean {
        const view = this.viewData();
        return view.length > 0 && view.every((item) => this.selectedKeys().has(item));
    }

    public get someSelected(): boolean {
        const view = this.viewData();
        return view.some((item) => this.selectedKeys().has(item));
    }

    public toggleAllRows(): void {
        const view = this.viewData();
        const next = new Set(this.selectedKeys());
        const deselectedRows: any[] = [];
        if (this.allSelected) {
            for (const item of view) {
                if (next.delete(item)) {
                    deselectedRows.push(item);
                }
            }
            this.selectedKeys.set(next);
            this.emitSelectionChange([], deselectedRows);
        } else {
            for (const item of view) {
                next.add(item);
            }
            this.selectedKeys.set(next);
            this.emitSelectionChange(view.slice(), []);
        }
    }

    public toggleRowSelection(dataItem: any): void {
        const selectable = this.selectable();
        const single = typeof selectable !== 'boolean' && selectable.mode === 'single';
        const next = new Set(single ? [] : this.selectedKeys());
        let deselected: any[] = [];
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
    public selectRowOnly(dataItem: any): void {
        if (this.isRowSelected(dataItem)) {
            return;
        }
        const deselected = [...this.selectedKeys()];
        this.selectedKeys.set(new Set([dataItem]));
        this.emitSelectionChange([dataItem], deselected);
    }

    public checkboxShowSelectAll(col: ColumnBase): boolean {
        return col.isCheckboxColumn() && (col as CheckboxColumnComponent).showSelectAll === true;
    }

    private emitSelectionChange(selected: any[], deselected: any[]): void {
        this.selectionChange.emit({
            selectedRows: selected.map((dataItem) => ({ type: 'data' as const, dataItem, dataRowIndex: 0 })),
            deselectedRows: deselected.map((dataItem) => ({ type: 'data' as const, dataItem, dataRowIndex: 0 })),
        });
    }

    /* ── Resizable columns ─────────────────────────────────────────── */

    public startResize(event: MouseEvent, col: ColumnBase): void {
        if (!this.isResizable() || col.isColumnGroup() || col.isSpanColumn() || col.isCommandColumn() || col.isCheckboxColumn() || col.isRadioColumn()) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        const startX = event.clientX;
        const startWidth = typeof col.width === 'number' ? col.width : col.width ? parseInt(col.width, 10) : 100;
        const min = col.minResizableWidth;

        const onMove = (moveEvent: MouseEvent) => {
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

    public extraCellsCount(): number {
        return (this.detailTemplate() ? 1 : 0) + (this.isSelectionEnabled() ? 1 : 0);
    }

    public isGroupedBy(col: ColumnBase): boolean {
        return col.field !== undefined && this.groupState().some((d) => d.field === col.field);
    }

    public toggleGroupForColumn(col: ColumnBase): void {
        if (col.field === undefined || !this.isGroupableEnabled()) {
            return;
        }
        const current = this.groupState();
        const existing = current.findIndex((d) => d.field === col.field);
        const next =
            existing !== -1
                ? current.filter((_, i) => i !== existing)
                : [...current, { field: col.field, dir: (this.sortDescriptorFor(col)?.dir ?? 'asc') as SortOrder }];
        this.groupState.set(next);
        this.collapsedGroups.set(new Set());
        this.skipState.set(0);
        this.groupChange.emit(next);
        this.emitDataState();
    }

    public isGroupCollapsed(index: string): boolean {
        return this.collapsedGroups().has(index);
    }

    public toggleGroup(index: string, group: GroupResult): void {
        const next = new Set(this.collapsedGroups());
        const event = { group, groupIndex: index };
        if (next.has(index)) {
            next.delete(index);
            this.groupExpand.emit(event);
        } else {
            next.add(index);
            this.groupCollapse.emit(event);
        }
        this.collapsedGroups.set(next);
    }

    /* ── Column menu ───────────────────────────────────────────────── */

    public isColumnMenuOpen(col: ColumnBase): boolean {
        return this.menuColumn() === col;
    }

    public chooserOpen(): boolean {
        return this.chooserOpenSignal();
    }

    public toggleChooser(): void {
        this.chooserOpenSignal.set(!this.chooserOpenSignal());
    }

    /** Các cột xuất hiện trong column chooser (body columns, không includeInChooser=false). */
    public chooserColumns(): ColumnBase[] {
        return this.bodyColumns().filter((col) => col.includeInChooser);
    }

    public toggleColumnMenu(col: ColumnBase, event?: Event): void {
        if (event) {
            event.stopPropagation();
        }
        this.menuColumn.set(this.menuColumn() === col ? null : col);
    }

    public onDocumentClick(): void {
        this.menuColumn.set(null);
        this.chooserOpenSignal.set(false);
    }

    public closeColumnMenu(): void {
        this.menuColumn.set(null);
    }

    public toggleColumnVisibility(col: ColumnBase): void {
        col.hidden = !col.hidden;
        this.layoutVersion.update((v) => v + 1);
        if (col.hidden && this.menuColumn() === col) {
            this.menuColumn.set(null);
        }
    }

    public isColumnVisible(col: ColumnBase): boolean {
        return !col.hidden;
    }

    public menuSort(col: ColumnBase, dir: SortOrder): void {
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

    public beginEdit(dataItem: any, col: ColumnBase, rowIndex: number): void {
        if (!this.editable() || col.field === undefined || col.isColumnGroup() || this.editRowData() !== null) {
            return;
        }
        this.editState.set({ dataItem, field: col.field, value: String(getValue(dataItem, col.field) ?? '') });
        this.cellClose.emit({ dataItem, field: col.field, rowIndex });
    }

    public isCellEditing(dataItem: any, col: ColumnBase): boolean {
        const edit = this.editState();
        return edit !== null && edit.dataItem === dataItem && edit.field === col.field;
    }

    public editValue(): string {
        return this.editState()?.value ?? '';
    }

    public onEditInput(event: Event): void {
        const edit = this.editState();
        if (edit) {
            this.editState.set({ ...edit, value: (event.target as HTMLInputElement).value });
        }
    }

    public commitEdit(): void {
        const edit = this.editState();
        if (edit) {
            edit.dataItem[edit.field] = edit.value;
            this.cellChange.emit({ dataItem: edit.dataItem, field: edit.field, value: edit.value });
            this.layoutVersion.update((v) => v + 1);
        }
        this.editState.set(null);
    }

    public cancelEdit(): void {
        this.editState.set(null);
    }

    /* ── Row editing (command column) ──────────────────────────────── */

    public isRowEditing(dataItem: any): boolean {
        return this.editRowData() === dataItem;
    }

    public commandVisible(col: ColumnBase, kind: 'edit' | 'remove' | 'save' | 'cancel'): boolean {
        if (!col.isCommandColumn()) {
            return false;
        }
        const cmd = col as CommandColumnComponent;
        return cmd[kind] === true;
    }

    public startRowEdit(dataItem: any): void {
        if (this.editRowData() !== null) {
            return;
        }
        this.editRowData.set(dataItem);
        this.editRowBuffer.set({ ...dataItem });
        this.edit.emit({ dataItem, isNew: false, rowIndex: this.viewData().indexOf(dataItem) });
    }

    public editBufferValueFor(field: string): any {
        return this.editRowBuffer()?.[field];
    }

    public onRowEditInput(field: string, event: Event): void {
        const buffer = this.editRowBuffer();
        if (buffer === null) {
            return;
        }
        buffer[field] = (event.target as HTMLInputElement).value;
        this.editRowBuffer.set(buffer);
    }

    public saveRowEdit(): void {
        const dataItem = this.editRowData();
        if (dataItem === null) {
            return;
        }
        Object.assign(dataItem, this.editRowBuffer());
        this.editRowData.set(null);
        this.editRowBuffer.set(null);
        this.save.emit({ dataItem, isNew: false });
    }

    public cancelRowEdit(): void {
        const dataItem = this.editRowData();
        if (dataItem === null) {
            return;
        }
        this.editRowData.set(null);
        this.editRowBuffer.set(null);
        this.cancel.emit({ dataItem, isNew: false });
    }

    public removeRow(dataItem: any): void {
        this.remove.emit({ dataItem, isNew: false });
    }

    /* ── Data state ────────────────────────────────────────────────── */

    private emitDataState(): void {
        const state: DataStateChangeEvent = {
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
}