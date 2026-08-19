# emi-grid

Grid component cho Angular — standalone, không dependency Kendo UI (chỉ dùng theme class names + `@progress/kendo-svg-icons` cho icons). Implement theo contract `kendo-grid` (Kendo UI for Angular) nên có thể thay thế trực tiếp.

## Demo online

👉 **https://hieu1012.github.io/Grid-Custom-Smart/** — 23 sections showcase từng tính năng (sort, group, filter, selection, row edit, locked, span column, footer aggregates, column chooser...), mỗi section có event log hiển thị output thật.

## Hướng dẫn chi tiết

📖 **[docs/USAGE.md](docs/USAGE.md)** — cài đặt, cách dùng từng loại cột, templates, inputs/events, tính năng nâng cao (server-driven, state persistence, aggregates, responsive) và cách customize grid (CSS variables, rowClass, ví dụ hoàn chỉnh).

## Cài đặt

Từ GitHub (dùng cho Angular 20 / 21 / 22 — npm tự build lib khi cài):

```bash
npm i https://github.com/hieu1012/Grid-Custom-Smart.git
```

Ngoài ra cần `@progress/kendo-svg-icons` (peer dependency — npm tự cài khi cần):

```bash
npm i @progress/kendo-svg-icons
```

**Theme CSS** — grid dùng class names của Kendo theme, thêm vào `styles.scss` của app:

```scss
@import '@progress/kendo-theme-default/dist/all.css';
```

## Sử dụng

Import `GridComponent` và các column component trong component của bạn:

```ts
import { Component } from '@angular/core';
import { GridComponent, ColumnComponent } from 'emi-grid';

@Component({
    selector: 'app-products',
    imports: [GridComponent, ColumnComponent],
    template: `
        <kendo-grid [data]="products" [sortable]="true" [pageable]="true" [pageSize]="5" [height]="300">
            <kendo-grid-column field="ProductID" title="ID" width="70" />
            <kendo-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
            <kendo-grid-column field="UnitPrice" title="Đơn giá" width="140" />
        </kendo-grid>
    `,
})
export class ProductsComponent {
    products = [
        { ProductID: 1, ProductName: 'Chai', UnitPrice: 18 },
        { ProductID: 2, ProductName: 'Chang', UnitPrice: 19 },
    ];
}
```

## Tính năng

- Sort / paging / filter row / group (kèm aggregates ở group footer)
- Selection (checkbox / radio column, select-all)
- Master detail, custom cell/header/no-records/detail templates
- Row editing (inline cell edit + command column row edit)
- Locked columns, column reorder, resizable, column menu, column chooser
- Server-driven data binding (`kendoGridDataBinding`)
- State persistence (`getGridState()` / `setGridState()`)
- `autoGenerateColumns`, span column, column group (header multi-level)
- Grid footer aggregates (`[aggregates]` + `kendoGridFooterTemplate`)
- Responsive: ẩn/hiện cột theo media query (`[media]` trên column)

## Demo local

```bash
git clone https://github.com/hieu1012/Grid-Custom-Smart.git
cd Grid-Custom-Smart
npm i
npx ng serve demo
# mở http://localhost:4200 — showcase 23 sections
```

## Build & test

```bash
npx ng build emi-grid   # output vào dist/emi-grid (đã commit cho git install)
npx ng test emi-grid --watch=false --browsers=ChromeHeadless
```

## Structure

- `projects/emi-grid/src/lib/` — source của thư viện
- `projects/emi-grid/src/lib/query/` — sort / filter / group / paging / aggregates (port từ Kendo)
- `projects/demo/` — demo app showcase

## License

Private — dùng nội bộ.
