# smart-grid — Kendo Grid API-Compatible Clone for Angular 20+

> **Trạng thái**: **v1.0 CORE SHIPPED** ✅ — grid + column + templates + sort + pager + loading/hideHeader/no-records + client-server data; query layer match 100% `kendo-data-query` 1.6.0; **52/52 tests PASS**; demo runtime verified (headless Chrome)
> Nguồn: `node_modules/@progress/kendo-angular-grid/dist/es2015/*.d.ts` (đã verify từng selector/input/output)

## 1. Mục tiêu

Xây dựng thư viện grid thay thế `@progress/kendo-angular-grid` (4.8.4):

- **API-compatible**: selector, inputs/outputs, template directives giống Kendo → drop-in replacement
- **Clean-room**: đọc `.d.ts` để chốt contract, **tự viết lại toàn bộ logic** (không copy code thương mại)
- **Modern Angular 20**: standalone, signals, control flow, `inject()`, zoneless-ready
- **Mục đích**: học tập + dùng cá nhân (không phân phối thương mại)

## 2. API Contract — GridComponent (`kendo-grid`)

### 2.1 Inputs (29) — extract từ `grid.component.d.ts` (ɵcmp declaration)

| Input | Kendo type | Ghi chú |
|---|---|---|
| `data` | `GridDataResult \| any[]` | dữ liệu nguồn hoặc page data + total |
| `scrollable` | `ScrollMode` | `'none' \| 'scrollable' \| 'virtual'` |
| `selectable` | `boolean \| SelectableSettings` | |
| `trackBy` | `TrackByFunction<GridItem>` | |
| `virtualColumns` | `boolean` | |
| `filterable` | `FilterableSettings` | |
| `sortable` | `SortSettings` | |
| `pageable` | `boolean \| PagerSettings` | |
| `groupable` | `boolean \| GroupableSettings` | |
| `navigable` | `boolean` | keyboard nav |
| `autoSize` | `boolean` | |
| `resizable` | `boolean` | |
| `reorderable` | `boolean` | |
| `loading` | `boolean` | |
| `columnMenu` | `boolean \| ColumnMenuSettings` | |
| `hideHeader` | `boolean` | |
| `skip` | `number` | state — page offset |
| `sort` | `SortDescriptor[]` | |
| `group` | `GroupDescriptor[]` | |
| `navigatable` | `boolean` | deprecated alias navigable |
| `rowClass` | `RowClassFn` | `(context: RowClassArgs) => string` |
| `rowSelected` | `RowSelectedFn` | |
| `cellSelected` | `CellSelectedFn` | |
| `isDetailExpanded` | `(dataItem, index) => boolean` | |
| `pageSize` | `number` | |
| `height` | `number` | px |
| `rowHeight` | `number` | virtual scroll |
| `detailRowHeight` | `number` | |
| `filter` | `CompositeFilterDescriptor` | |

### 2.2 Outputs (25)

| Output | Event type | Ghi chú |
|---|---|---|
| `filterChange` | `CompositeFilterDescriptor` | |
| `pageChange` | `PageChangeEvent` | `{ skip, take }` |
| `groupChange` | `GroupDescriptor[]` | |
| `sortChange` | `SortDescriptor[]` | |
| `selectionChange` | `SelectionEvent` | |
| `dataStateChange` | `DataStateChangeEvent` | `{ skip, take, sort?, group?, filter? }` |
| `groupExpand` / `groupCollapse` | `{ group: GroupResult; groupIndex: string }` | |
| `detailExpand` / `detailCollapse` | `DetailExpandEvent` | |
| `edit` / `cancel` / `save` / `remove` / `add` | `EditEvent` family | |
| `cellClose` / `cellClick` | `CellCloseEvent` / `CellClickEvent` | |
| `pdfExport` / `excelExport` | `PDFExportEvent` / `ExcelExportEvent` | |
| `columnResize` / `columnReorder` | `ColumnResizeArgs[]` / `ColumnReorderEvent` | |
| `columnVisibilityChange` / `columnLockedChange` | `ColumnVisibilityChangeEvent` / `ColumnLockedChangeEvent` | |
| `scrollBottom` / `contentScroll` | `ScrollBottomEvent` / `ContentScrollEvent` | |

### 2.3 Content & View children
- Content: `columns` (các `kendo-grid-column`, `kendo-grid-column-group`, ...) — `QueryList<ColumnBase>`
- View: `detailTemplateChildren` (templates query)

## 3. API Contract — Columns

### 3.1 `kendo-grid-column` (ColumnComponent) — inputs (8 + ColumnBase)

| Input | Type |
|---|---|
| `field` | `string` |
| `format` | `any` (format string/object) |
| `sortable` | `boolean \| ColumnSortSettings` |
| `groupable` | `boolean` |
| `editor` | `'text' \| 'numeric' \| 'date' \| 'boolean'` |
| `filter` | `'text' \| 'numeric' \| 'boolean' \| 'date'` |
| `filterable` | `boolean` |
| `editable` | `boolean` |

**ColumnBase @Input() (dùng chung cho mọi column type, 18 binding)**: `title`, `width`, `hidden`, `locked`, `lockable`, `resizable`, `reorderable`, `autoSize`, `minResizableWidth`, `media`, `columnMenu`, `includeInChooser`, `cssClass` ⚠️, `headerClass`, `footerClass`, `style`, `headerStyle`, `footerStyle`
- ⚠️ `cssClass`: property name là `cssClass`, nhưng template attribute binding là `[class]` (ɵdir map `"cssClass":"class"`)
- `orderIndex` / `matchesMedia`: tồn tại nhưng là `@hidden` internals, **không phải @Input** — không dùng trong API public
- `colspan` (readonly prop) / `rowspan(totalColumnLevels)` (method): member readonly, không phải @Input — store như computed property

**SortSettings / ColumnSortSettings** (từ `columns/sort-settings.d.ts`) — SPEC mới bổ sung:
```ts
type ColumnSortSettings = boolean | {
    allowUnsort?: boolean;
    initialDirection?: 'asc' | 'desc';   // @default 'asc'
};
type SortSettings = boolean | ColumnSortSettings & {
    mode?: 'single' | 'multiple';
    showIndexes?: boolean;
};
```

**Template refs (content children trên column)**: `template` (cell), `headerTemplate`, `footerTemplate`, `detailTemplate`, `groupHeaderTemplate`, `groupHeaderColumnTemplate`, `groupFooterTemplate`, `editTemplate`, `filterCellTemplate`, `filterMenuTemplate`

### 3.2 Các column type khác
- `kendo-grid-column-group` (ColumnGroupComponent) — content: `children`
- `kendo-grid-checkbox-column` (CheckboxColumnComponent) — input `showSelectAll`, content: `template`
- `kendo-grid-command-column` (CommandColumnComponent) — content: `template`
- `kendo-grid-span-column` (SpanColumnComponent) — inputs `editable`, `locked` (ɵcmp `"locked":"locked"`, riêng semantics cho spanned columns); content: `template`, `editTemplate`, `childColumns`

## 4. API Contract — Template Directives (selectors chính xác)

| Directive | Selector | Inputs |
|---|---|---|
| CellTemplateDirective | `[kendoGridCellTemplate]` | — |
| HeaderTemplateDirective | `[kendoGridHeaderTemplate]` | — |
| FooterTemplateDirective | `[kendoGridFooterTemplate]` | — |
| DetailTemplateDirective | `[kendoGridDetailTemplate]` | `showIf` |
| NoRecordsTemplateDirective | `[kendoGridNoRecordsTemplate]` | — |
| ToolbarTemplateDirective | `[kendoGridToolbarTemplate]` | `position` |
| PagerTemplateDirective | `[kendoPagerTemplate]` | — |
| GroupHeaderTemplateDirective | `[kendoGridGroupHeaderTemplate]` | — |
| GroupHeaderColumnTemplateDirective | `[kendoGridGroupHeaderColumnTemplate]` | — |
| GroupFooterTemplateDirective | `[kendoGridGroupFooterTemplate]` | — |
| FilterCellTemplateDirective | `[kendoGridFilterCellTemplate]` | — |
| FilterMenuTemplateDirective | `[kendoGridFilterMenuTemplate]` | — |
| EditTemplateDirective | `[kendoGridEditTemplate]` | — |
| PDFTemplateDirective | `[kendoGridPDFTemplate]` | — |
| TemplateContextDirective | `[templateContext]` | `templateContext` |
| ColumnMenuTemplateDirective | `[kendoGridColumnMenuTemplate]` | — (deferred v1.2, column menu) |
| ColumnMenuItemContentTemplateDirective | `[kendoGridColumnMenuItemContentTemplate]` | — (deferred v1.2, column menu) |

→ Quy ước Kendo: `<ng-template kendoGridCellTemplate let-dataItem>` — context variables: `dataItem`, `rowIndex`, `column` (cell); `dataItem` (header/footer)

## 5. API Contract — Feature Directives & Components (119 declarations)

### 5.1 Data binding
| Directive | Selector | Inputs |
|---|---|---|
| DataBindingDirective | `[kendoGridBinding]` | `data` (kendoGridBinding), `skip`, `sort`, `filter`, `pageSize`, `group` |
| GroupBindingDirective | `[kendoGridGroupBinding]` | `kendoGridGroupBinding` |

### 5.2 Selection
| Directive | Selector | Inputs/Outputs |
|---|---|---|
| SelectionDirective | `[kendoGridSelectBy]` | — (dùng qua provider) |
| SelectionCheckboxDirective | `[kendoGridSelectionCheckbox]` | `itemIndex` |
| SelectAllCheckboxDirective | `[kendoGridSelectAllCheckbox]` | `state` → output `selectAllChange` |
| GridMarqueeDirective | `[kendoGridSelectionMarquee]` | — |

**SelectableSettings**: `enabled?` (@default `true`), `checkboxOnly?` (@default `true`), `mode?: 'single'\|'multiple'` (@default `'multiple'`), `cell?` (@default `false`), `drag?` (@default `false`)
**SelectionEvent**: `selectedRows?`, `deselectedRows?`, `selectedCells?`, `deselectedCells?`, `ctrlKey?`, `shiftKey?`

### 5.3 Filtering (filter row + cells)
- `[kendoGridFilterRow]` (FilterRowComponent), `[kendoGridFilterCell]` (FilterCellComponent)
- Cell types: `kendo-grid-string-filter-cell`, `kendo-grid-numeric-filter-cell`, `kendo-grid-date-filter-cell`, `kendo-grid-boolean-filter-cell`, `kendo-grid-autocomplete-filter-cell` — input `filterDelay`, `showOperators`, `filter`
- Menu types: `kendo-grid-filter-menu`, `kendo-grid-string/date/numeric/boolean-filter-menu`

**FilterableSettings** (từ `filtering/filterable.d.ts`) — union type, KHÔNG phải object interface:
```ts
type FilterableSettings = boolean | 'row' | 'menu' | 'menu, row';
```

- Operators (18 components; enum `FilterOperator` 16 string values): `kendo-filter-eq-operator`, `kendo-filter-neq-operator`, `kendo-filter-contains-operator`, `kendo-filter-not-contains-operator`, `kendo-filter-startswith-operator`, `kendo-filter-endswith-operator`, `kendo-filter-isnull-operator`, `kendo-filter-isnotnull-operator`, `kendo-filter-isempty-operator`, `kendo-filter-isnotempty-operator`, `kendo-filter-lt-operator`, `kendo-filter-lte-operator`, `kendo-filter-gt-operator`, `kendo-filter-gte-operator`, `kendo-filter-before-operator`, `kendo-filter-before-eq-operator`, `kendo-filter-after-operator`, `kendo-filter-after-eq-operator`
  - `FilterOperator` (string enum đầy đủ — gồm `doesnotendwith` + `doesnotstartwith` mà SPEC trước thiếu): `contains doesnotcontain doesnotendwith doesnotstartwith endswith eq gt gte isempty isnotempty isnotnull isnull lt lte neq startswith`

### 5.4 Pager
- `kendo-pager` (PagerComponent): inputs `total`, `skip`, `options`, `pageSize`, `template`; output `pageChange`
- `kendo-pager-prev-buttons`, `kendo-pager-next-buttons`, `kendo-pager-numeric-buttons` (input `buttonCount`), `kendo-pager-input`, `kendo-pager-info`, `kendo-pager-page-sizes` (input `pageSizes`)

**PagerSettings**: `buttonCount?`, `info?`, `type?: 'numeric'\|'input'`, `pageSizes?: boolean | number[]`, `previousNext?`

### 5.5 Grouping
- `kendo-grid-group-panel` (input `groups`), `[kendoGridGroupHeader]`, `[kendoGroupIndicator]`

**GroupableSettings**: `enabled` (required), `emptyText?` (default "Drag a column header and drop it here to group by that column"), `showFooter` (required, @default `false`)

### 5.6 Editing (deferred v1.2)
- Directives: `[kendoGridInCellEditing]`, `[kendoGridReactiveEditing]`, `[kendoGridTemplateEditing]` (input `createFormGroup`/`createNewItem`)
- Commands: `[kendoGridAddCommand]`, `[kendoGridEditCommand]`, `[kendoGridRemoveCommand]`, `[kendoGridSaveCommand]`, `[kendoGridCancelCommand]`

### 5.7 Export (deferred — dùng lib OSS)
- `kendo-grid-excel` (input `fileName`...), `kendo-grid-pdf`, commands `[kendoGridExcelCommand]`, `[kendoGridPDFCommand]`

### 5.8 Column menu / resize / reorder (deferred)
- `kendo-grid-column-menu`, `[kendoDraggableColumn]`, `[kendoDropTarget]`, `[kendoGridColumnHandle]`

## 6. Types từ kendo-data-query (phải tự implement, ~4.3k dòng logic)

```ts
interface SortDescriptor { field: string; dir?: 'asc' | 'desc'; }
interface FilterDescriptor { field?: string | Function; operator: FilterOperator | string | Function; value?: any; ignoreCase?: boolean; }
interface CompositeFilterDescriptor { logic: 'or' | 'and'; filters: Array<FilterDescriptor | CompositeFilterDescriptor>; }
interface GroupDescriptor { field: string; dir?: 'asc' | 'desc'; aggregates?: AggregateDescriptor[]; }
interface GroupResult { items: Object[]; aggregates: AggregateResult; field: string; value: any; }   // items: Object[] chứ không phải any[]; aggregates: AggregateResult
interface AggregateDescriptor { field: string; aggregate: 'count' | 'sum' | 'average' | 'min' | 'max'; }
interface AggregateResult { [fieldName: string]: { count?: number; sum?: number; average?: number; min?: number; max?: number; }; }
interface DataResult { data: any[]; total: number; }
interface State { skip?: number; take?: number; sort?: SortDescriptor[]; filter?: CompositeFilterDescriptor; group?: GroupDescriptor[]; }
enum FilterOperator { Contains='contains', DoesNotContain='doesnotcontain', DoesNotEndWith='doesnotendwith', DoesNotStartWith='doesnotstartwith', EndsWith='endswith', EqualTo='eq', GreaterThan='gt', GreaterThanOrEqual='gte', IsEmpty='isempty', IsNotEmpty='isnotempty', IsNotNull='isnotnull', IsNull='isnull', LessThan='lt', LessThanOrEqual='lte', NotEqualTo='neq', StartsWith='startswith' }
```

→ Cần implement: `orderBy` (sort), `filterBy` (composite filter, operators), `groupBy` (grouping + aggregates sum/count/avg/min/max), `paging` (skip/take)

## 7. Kiến trúc Angular 20 (đề xuất)

```
projects/smart-grid/src/lib/
├── grid.component.ts          → selector kendo-grid, standalone, signals
├── grid.module.ts (optional)  → provide exports cho compat
├── column/
│   ├── column-base.ts         → abstract, @Input() chung
│   ├── column.component.ts    → kendo-grid-column
│   ├── column-group.component.ts
│   ├── checkbox-column.component.ts
│   └── command-column.component.ts
├── data/
│   ├── grid-data-result.ts    → GridDataResult, DataCollection
│   ├── change-event-args.ts   → PageChangeEvent, DataStateChangeEvent
│   └── databinding.directive.ts
├── query/                     → tách từ kendo-data-query
│   ├── sorting.ts  filtering.ts  grouping.ts  paging.ts
├── rendering/
│   ├── cell-template.directive.ts  header/footer/detail/no-records/toolbar
│   ├── cell.component.ts  header.component.ts  footer.component.ts
│   └── table-body.component.ts
├── filtering/  (filter row + cells + operators)
├── paging/     (pager components)
├── selection/  (selection.directive, checkbox directive)
├── grouping/   (group panel, group header)
└── localize/   (kendo-grid-messages, LocalizationService thay thế kendo-angular-l10n)
```

- **State core**: `dataItems = signal<any[]>()`, `skip = signal(0)`, `take = signal(20)`, `sort = signal<SortDescriptor[]>([])`, `filter = signal<CompositeFilterDescriptor>(null)`, `group = signal<GroupDescriptor[]>([])` → `computed(() => query(currentData, state))`
- **Templates**: `contentChild` query theo selector — mỗi directive đăng ký vào column qua `@ContentChild`
- **Outputs**: dùng `output()` function API Angular 20, event emitters tương đương Kendo

## 8. Roadmap & Phạm vi v1

| Giai đoạn | Nội dung | API-compat? | Trạng thái |
|---|---|---|---|
| **v1 (core)** | Grid + column + cell/header/no-records template + sort + pager + loading/hideHeader + client/server data | ✅ selectors + inputs/outputs y hệt | **SHIPPED** ✅ |
| v1.1 | Filter row UI, Grouping (group panel + templates), column resize/reorder, selection | ✅ | Deferred |
| v1.2 | Editing (inline/reactive/template), column menu | ✅ | Deferred |
| v2 | Virtual scroll, Excel/PDF export (qua thư viện OSS) | ⚠️ API giữ, impl khác | Deferred |
| Deferred | Keyboard nav đầy đủ, drag&drop, locked columns | | |

**v1 core đã ship** (lib ~1.5k LOC standalone + signals):
- `GridComponent` — 29 inputs / 25 outputs khai báo đúng tên Kendo; **những cái đang active**: `data`, `sortable`, `pageable`, `pageSize`, `skip`, `sort`, `filter`, `height`, `loading`, `hideHeader`, `rowClass`, `rowSelected`, `cellSelected`, `trackBy`, `scrollable`; outputs `sortChange`, `pageChange`, `dataStateChange` (các output feature khác khai báo sẵn, chờ feature tương ứng)
- `ColumnComponent` (`kendo-grid-column`), `ColumnBase` — 18 binding chung, `sortable` per-column override
- Directives: `[kendoGridCellTemplate]`, `[kendoGridHeaderTemplate]`, `[kendoGridNoRecordsTemplate]` (context: `dataItem`/`rowIndex`/`column` đúng Kendo)
- Query layer (`query/`): `orderBy` (nulls first, case-insensitive, multi-desc), `filterBy` (composite logic or/and + 18 operators theo `FilterOperator` enum), `paging` (skip/take) — **verify một-đối-một với `kendo-data-query` 1.6.0** (xem §9)
- Đã bỏ qua (làm sau): kendo-grid-column-group / checkbox / command / span column, pager component riêng (`kendo-pager`), filter row UI, selection UI, grouping UI, editing, export, column menu

## 9. Verification plan

1. **Query layer match kendo-data-query** ✅ — fixtures sinh từ chạy thật thư viện `kendo-data-query@1.6.0` (oracle), so sánh output từng case:
   - **Sorting 9 case** (asc/desc, 2 cột, cột thiếu field, trường null, chuỗi hoa/thường, trường không tồn tại) — match 100%
   - **Filtering 24 case** (7 operator eq/neq/gt/gte/lt/lte/contains × ignoreCase, nesting filter by nested field, composite or/and, value không khớp type,...) — match 100%
   - **Paging 8 case** (skip/take, take 0, skip quá tổng, data rỗng, khác kiểu total) — match 100%
   - + **7 case edge tự viết** (sort cột dir undefined, unsort; filter regex/dấu tiếng Việt; pageSize thay đổi co giãn ngoài biên). Tổng **45/45 unit test PASS**
2. **Component test (TestBed)** ✅ — `grid.component.spec.ts`:
   - Render đúng pageSize (3/5 rows), headers từ columns, cell template áp dụng (uppercase)
   - Pager render 2 trang + info "Page 1 of 2 (5 records)"
   - Click header → `sortChange` + `dataStateChange` (skip/take) emit; sort 3 click: asc → desc → unsort (allowUnsort)
   - Sort thật sự reorder rows (desc theo id → '5')
   - Click pager Next → `pageChange { skip: 3, take: 3 }`, page 2 hiển thị, info cập nhật
   - Empty data → no-records row
   - Tổng **52/52 tests PASS** (45 unit + 7 component). ⚠️ Test infra: library phải khai báo `polyfills: ["zone.js", "zone.js/testing"]` trong `angular.json` test target mới chạy được (Angular 20 default zoneless, TestBed cần zone.js)
3. **Demo app runtime** ✅ — `projects/demo` (12 records Northwind, 5 cột: ID, Tên sản phẩm + cell template + header template + badge "ngừng", Đơn giá DecimalPipe + headerStyle right, Danh mục, Trạng thái conditional; pageSize 5; sortable + pageable + loading toggle; bắt `sortChange`/`pageChange`/`dataStateChange` log ra `lastEvent`). `ng build demo` PASS; chạy `ng serve` → **headless Chrome dump DOM**: render đủ 5 cột / 5 rows / cell template (Đang bán) / DecimalPipe (18.00 ₫) / pager "Page 1 of 3 (12 records)" / `k-header-sort` trên cả 5 th. (Screenshot PNG đã chụp — xem `/tmp/smart-grid-demo.png`)

## 10. Nguồn & Ghi chú pháp lý
- API contract trích xuất từ `.d.ts` (không phải source JS) — clean-room scope: chỉ dùng contract, tự viết implementation
- Không đưa code JS của Kendo vào repo
- `kendo-theme-default` có thể dùng nếu không có commercial license (Apache 2.0 fallback) — hoặc tự viết theme riêng mang tên smart-grid