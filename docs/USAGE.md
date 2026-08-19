# emi-grid — Hướng dẫn cài đặt & sử dụng

## Demo online

👉 **https://hieu1012.github.io/Grid-Custom-Smart/** — 23 sections showcase từng tính năng (kèm event log hiển thị output thật).

Chạy demo local:

```bash
git clone https://github.com/hieu1012/Grid-Custom-Smart.git
cd Grid-Custom-Smart
npm i
npx ng serve demo
# mở http://localhost:4200
```

---

## 1. Cài đặt

### Yêu cầu

- Node.js ≥ 22.22 (Angular CLI requirement)
- Angular project 20 / 21 / 22

### Cài từ GitHub

```bash
npm i https://github.com/hieu1012/Grid-Custom-Smart.git
npm i @progress/kendo-svg-icons
```

### Theme CSS

Grid dùng class names của Kendo theme — thêm vào `src/styles.scss`:

```scss
@import '@progress/kendo-theme-default/dist/all.css';
```

Cài theme nếu chưa có: `npm i @progress/kendo-theme-default`

---

## 2. Sử dụng cơ bản

```ts
import { Component } from '@angular/core';
import { GridComponent, ColumnComponent } from 'emi-grid';

@Component({
    selector: 'app-products',
    imports: [GridComponent, ColumnComponent],
    template: `
        <kendo-grid
            [data]="products"
            [sortable]="true"
            [pageable]="true"
            [pageSize]="5"
            [height]="300"
        >
            <kendo-grid-column field="ProductID" title="ID" width="70" />
            <kendo-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
            <kendo-grid-column field="UnitPrice" title="Đơn giá" width="140" />
            <kendo-grid-column field="Discontinued" title="Trạng thái" width="110" />
        </kendo-grid>
    `,
})
export class ProductsComponent {
    products = [
        { ProductID: 1, ProductName: 'Chai', UnitPrice: 18, Discontinued: false },
        // ...
    ];
}
```

Cột field có thể truy cập lồng nhau: `field="Category.Name"`.

---

## 3. Các loại cột

### 3.1 Cột thường — `kendo-grid-column`

| Input | Type | Mô tả |
|---|---|---|
| `field` | string | Field trong data (hỗ trợ `a.b.c`) |
| `title` | string | Tiêu đề cột (mặc định = field) |
| `width` | number \| string | Độ rộng (px hoặc %) |
| `sortable` | boolean \| object | Bật sort riêng cho cột |
| `filterable` | boolean | Bật filter row riêng |
| `resizable` | boolean | Bật resize riêng |
| `locked` | boolean | Cột cố định khi cuộn ngang |
| `hidden` | boolean | Ẩn cột |
| `includeInChooser` | boolean | Hiện trong column chooser/menu (mặc định true) |
| `media` | string | Media query — ẩn cột khi không khớp (vd `(min-width: 600px)`) |
| `reorderable` | boolean | Cho phép kéo thả cột này (mặc định true) |
| `minResizableWidth` | number | Width tối thiểu khi resize (mặc định 10) |
| `style` | object | CSS cho cell |
| `headerStyle` | object | CSS cho header cell |
| `footerStyle` / `footerClass` | object/string | CSS cho footer cell |
| `cssClass` | string | Class cho cell |
| `headerClass` | string | Class cho header |

### 3.2 Column group — header nhiều tầng

```html
<kendo-grid-column-group title="Kinh doanh">
    <kendo-grid-column-group title="Giá">
        <kendo-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    </kendo-grid-column-group>
    <kendo-grid-column field="Discontinued" title="Trạng thái" width="110" />
</kendo-grid-column-group>
```

### 3.3 Span column — gom cột con thành 1 cell

```html
<kendo-grid-span-column title="Sản phẩm">
    <kendo-grid-column field="ProductName" title="Tên" width="240" />
    <kendo-grid-column field="Category.Name" title="Danh mục" width="160" />
    <ng-template kendoGridSpanCellTemplate let-dataItem>
        <strong>{{ dataItem.ProductName }}</strong>
        <span style="color:#888">{{ dataItem.Category.Name }}</span>
    </ng-template>
</kendo-grid-span-column>
```

Không khai báo template → các giá trị tự xếp dọc. Body cell colspan = số cột con.

### 3.4 Checkbox column — chọn nhiều

```html
<kendo-grid [data]="products" (selectionChange)="onSelection($event)">
    <kendo-grid-checkbox-column title="Chọn" width="60" showSelectAll="true" />
    <!-- ...các cột khác -->
</kendo-grid>
```

Header checkbox chọn tất cả trang hiện tại (có indeterminate state).

### 3.5 Radio column — chọn 1

```html
<kendo-grid-radio-column title="Chọn 1" width="70" />
```

Chọn row mới sẽ thay thế toàn bộ selection hiện tại.

### 3.6 Command column — row edit

```html
<kendo-grid
    [data]="products"
    (edit)="onEdit($event)"
    (save)="onSave($event)"
    (cancel)="onCancel($event)"
    (remove)="onRemove($event)"
>
    <!-- ...các cột khác -->
    <kendo-grid-command-column title="Thao tác" [width]="160" />
</kendo-grid>
```

| Input | Mô tả |
|---|---|
| `edit` | Hiện nút edit (mặc định true) |
| `remove` | Hiện nút xóa (mặc định true) |
| `save` | Hiện nút save khi đang edit (mặc định true) |
| `cancel` | Hiện nút cancel khi đang edit (mặc định true) |

Khi bấm edit → hàng đổi thành input, bấm save/cancel để kết thúc. `EditEvent = { dataItem, isNew, rowIndex? }`. Save mutate dataItem tại chỗ; remove chỉ emit event — bạn tự xóa khỏi array.

---

## 4. Templates tùy biến

### Cell template

```html
<kendo-grid-column field="UnitPrice" title="Đơn giá" width="140">
    <ng-template kendoGridCellTemplate let-dataItem>
        {{ dataItem.UnitPrice | number: '1.2-2' }} ₫
    </ng-template>
</kendo-grid-column>
```

Context: `$implicit` = dataItem, `rowIndex`, `column`.

### Header template

```html
<ng-template kendoGridHeaderTemplate let-column>
    <span style="color:#1a73e8">{{ column.title }}</span>
</ng-template>
```

### Footer template (grid footer / group footer)

```html
<kendo-grid-column field="UnitPrice" title="Đơn giá" width="180">
    <ng-template kendoGridFooterTemplate let-value>
        Sum: {{ value.sum | number: '1.2-2' }} ₫
    </ng-template>
</kendo-grid-column>
```

Context: `$implicit` = aggregate result của field, `column`, `aggregates`.

### No-records template

```html
<ng-template kendoGridNoRecordsTemplate>
    <div class="empty-box">Không có dữ liệu</div>
</ng-template>
```

### Detail template (master detail)

```html
<kendo-grid [data]="products" detailExpandBy="'ProductID'">
    <ng-template kendoGridDetailTemplate let-dataItem>
        <p>Chi tiết của {{ dataItem.ProductName }}</p>
    </ng-template>
</kendo-grid>
```

`detailExpandBy` giữ trạng thái expand khi đổi trang/sort.

---

## 5. Grid inputs & events

### Inputs chính

| Input | Mô tả |
|---|---|
| `data` | `GridDataResult \| any[] \| null` |
| `sortable` | boolean \| `{ mode: 'single'\|'multiple', allowUnsort, showIndexes }` |
| `pageable` | boolean \| PagerSettings + `pageSize` |
| `groupable` | boolean + `group` (GroupDescriptor[]) |
| `filterable` | boolean \| `'row'` \| `'menu'` \| `'menu, row'` |
| `selectable` | boolean \| `{ enabled, checkboxOnly, mode }` |
| `resizable` | boolean |
| `reorderable` | boolean |
| `columnMenu` | boolean |
| `columnChooser` | boolean |
| `autoGenerateColumns` | boolean — tự sinh cột theo data |
| `editable` | boolean — inline edit bằng dblclick |
| `aggregates` | AggregateDescriptor[] — grid footer |
| `height` / `rowHeight` / `detailRowHeight` | Kích thước |
| `loading` | boolean — loading mask |
| `hideHeader` | boolean |
| `navigable` | boolean — keyboard nav |
| `scrollable` | `'none' \| 'scrollable' \| 'virtual'` |
| `virtualColumns` | boolean |
| `rowClass` / `rowSelected` / `cellSelected` | Function highlight |
| `trackBy` | Function trackBy |

### Events chính

| Event | Payload |
|---|---|
| `sortChange` | SortDescriptor[] |
| `pageChange` | `{ skip, take }` |
| `groupChange` | GroupDescriptor[] |
| `filterChange` | CompositeFilterDescriptor |
| `dataStateChange` | DataStateChangeEvent (skip/take/sort/group/filter) |
| `selectionChange` | `{ selectedRows, deselectedRows }` |
| `columnReorder` | `{ column, oldIndex, newIndex, columns }` |
| `edit` / `save` / `cancel` / `remove` | EditEvent |
| `cellChange` / `cellClose` | Inline edit events |
| `detailExpand` / `detailCollapse` | `{ dataItem, index, expand }` |
| `groupExpand` / `groupCollapse` | `{ group, groupIndex }` |
| `stateChange` | DataStateChangeEvent (khi `setGridState()`) |

---

## 6. Tính năng nâng cao

### 6.1 Server-driven data binding

```ts
import { GridDataResult, DataStateChangeEvent, DataBindingFetch, process } from 'emi-grid';

fetchProducts: DataBindingFetch = (state: DataStateChangeEvent) => {
    return this.http.get<GridDataResult>('/api/products', { params: state });
    // hoặc trả Promise / Observable / GridDataResult trực tiếp
};
```

```html
<kendo-grid [kendoGridDataBinding]="fetchProducts" [sortable]="true" [pageable]="true" [pageSize]="5">
</kendo-grid>
```

Directive tự gọi lại khi user đổi sort/page/filter/group. Có `reload()` public method.

### 6.2 State persistence

```html
<kendo-grid #grid [data]="products" (stateChange)="onStateChange($event)">
</kendo-grid>
```

```ts
// lưu
const state = grid.getGridState();   // { skip, take, sort, group, filter }
localStorage.setItem('grid-state', JSON.stringify(state));

// khôi phục
grid.setGridState(savedState);       // phát stateChange
```

### 6.3 Grouping + aggregates

```ts
groups = [
    {
        field: 'Category.Name',
        dir: 'asc',
        aggregates: [
            { field: 'UnitPrice', aggregate: 'sum' },
            { field: 'UnitPrice', aggregate: 'count' },
        ],
    },
];
```

Group footer tự hiển thị aggregate theo cột. Aggregate hỗ trợ: `count`, `sum`, `min`, `max`, `average`.

### 6.4 Grid footer aggregates

```html
<kendo-grid [data]="products" [aggregates]="aggregates">
</kendo-grid>
```

```ts
aggregates: AggregateDescriptor[] = [
    { field: 'ProductID', aggregate: 'count' },
    { field: 'UnitPrice', aggregate: 'sum' },
];
```

### 6.5 Responsive — ẩn cột theo media query

```html
<kendo-grid-column field="UnitPrice" title="Đơn giá" width="140" media="(min-width: 600px)" />
```

Cột tự ẩn/hiện khi viewport thay đổi.

### 6.6 autoGenerateColumns

```html
<kendo-grid [data]="products" [autoGenerateColumns]="true"></kendo-grid>
```

Tự tạo cột theo fields của object đầu tiên trong data.

---

## 7. Customize grid

### Styling bằng CSS variables

Grid dùng class names Kendo chuẩn (`k-grid`, `k-table`, `k-header`...) — override thoải mái:

```scss
kendo-grid {
    --kendo-color-primary: #1a73e8;   /* màu chính (sort active, selection...) */
    --kendo-color-surface: #ffffff;   /* nền */
    border-radius: 8px;
    border: 1px solid #ddd;
}

/* header */
kendo-grid .k-header {
    background: #f8f9fa;
    font-weight: 600;
}

/* cell */
kendo-grid .k-table-td {
    border-bottom: 1px solid #eee;
}

/* selection */
kendo-grid .k-selected {
    background: rgba(26, 115, 232, 0.12);
}

/* loading mask */
kendo-grid .k-loading-text {
    color: #1a73e8;
}
```

### rowClass / rowSelected — highlight theo điều kiện

```ts
rowClassFn = ({ dataItem }) => dataItem.Discontinued ? 'row-discontinued' : '';

rowSelectedFn = ({ dataItem }) => dataItem.UnitPrice > 50;
```

```html
<kendo-grid [data]="products" [rowClass]="rowClassFn" [rowSelected]="rowSelectedFn"></kendo-grid>
```

```scss
.row-discontinued { opacity: 0.45; }
```

### Kết hợp mọi thứ — ví dụ hoàn chỉnh

```html
<kendo-grid
    [data]="products"
    [sortable]="true"
    [pageable]="true"
    [pageSize]="10"
    [groupable]="true"
    [group]="groups"
    [filterable]="'row'"
    [resizable]="true"
    [reorderable]="true"
    [columnMenu]="true"
    [columnChooser]="true"
    [selectable]="true"
    [aggregates]="aggregates"
    [height]="400"
    [loading]="loading()"
    (selectionChange)="onSelection($event)"
    (dataStateChange)="onStateChange($event)"
>
    <kendo-grid-checkbox-column title="Chọn" width="50" />
    <kendo-grid-column field="ProductID" title="ID" width="70" [locked]="true" />
    <kendo-grid-column field="ProductName" title="Tên" width="220">
        <ng-template kendoGridCellTemplate let-dataItem>
            <strong>{{ dataItem.ProductName }}</strong>
        </ng-template>
    </kendo-grid-column>
    <kendo-grid-column field="UnitPrice" title="Đơn giá" width="140" [footerStyle]="{ 'font-weight': '700' }">
        <ng-template kendoGridCellTemplate let-dataItem>
            {{ dataItem.UnitPrice | number: '1.2-2' }} ₫
        </ng-template>
        <ng-template kendoGridFooterTemplate let-value>
            Tổng: {{ value.sum | number: '1.2-2' }} ₫
        </ng-template>
    </kendo-grid-column>
    <kendo-grid-command-column title="Thao tác" [width]="150" />
</kendo-grid>
```

---

## 8. Build & test thư viện

```bash
npx ng build emi-grid        # build lib → dist/emi-grid
npx ng test emi-grid --watch=false --browsers=ChromeHeadless   # 81 tests
npx ng serve demo            # demo local
```

Khi cập nhật lib: rebuild + commit + push → consumer `npm i` lại là nhận bản mới.
