# Smart Grid — Kiến trúc & Cách thư viện hoạt động

> **Mục đích:** Giải thích từ A-Z cách thư viện `smart-grid` được tạo ra,
> từng phần logic hoạt động thế nào, để bạn có thể tự hiểu và phát triển thêm.

---

## Table of Contents

1. [Tổng quan dự án](#1-tổng-quan-dự-án)
2. [Thuật ngữ quan trọng](#2-thuật-ngữ-quan-trọng)
3. [Cấu trúc thư mục](#3-cấu-trúc-thư-mục)
4. [Luồng dữ liệu tổng quát](#4-luồng-dữ-liệu-tổng-quát)
5. [Các phần chính của thư viện](#5-các-phần-chính-của-thư-viện)
   - 5.1 [GridComponent — Trung tâm](#51-gridcomponent—trung-tâm)
   - 5.2 [GridColumnComponent — Cột](#52-gridcolumncomponent—cột)
   - 5.3 [Các Column特殊 types](#53-các-column-đặc-thù)
   - 5.4 [Các Directive](#54-các-directive)
   - 5.5 [Các Template](#55-các-template)
   - 5.6 [Sort Service](#56-sort-service)
6. [Tính năng chi tiết](#6-tính-năng-chi-tiết)
7. [Cách thêm tính năng mới](#7-cách-thêm-tính-năng-mới)
8. [FAQ & Gợi ý học tập](#8-faq--gợi-ý-học-tập)

---

## 1. Tổng quan dự án

**Smart Grid** là một thư viện Angular component — nó không phải website hoàn chỉnh,
mà là một "hộp công cụ" mà các website khác có thể mượn và dùng lại.

Tương tự cách bạn mua một bộ Lego — thư viện cung cấp các khối ghép
(Grid, Column, Template, Directive) để người dùng ghép thành bảng dữ liệu theo ý họ.

**Công nghệ sử dụng:**
- **Angular** — framework JavaScript để xây dựng giao diện web
- **Kendo UI** — thư viện UI bên ngoài, cung cấp CSS styling (màu sắc, viền, hover)
- **TypeScript** — ngôn ngữ lập trình (JavaScript có kiểu dữ liệu)

---

## 2. Thuật ngữ quan trọng

Trước khi đi vào chi tiết, hãy hiểu các từ thường gặp:

| Thuật ngữ | Nghĩa đơn giản |
|-----------|----------------|
| **Component** | Một khối giao diện nhỏ, tự chứa HTML + logic + styling. Ví dụ: `<smart-grid>`, `<smart-grid-column>` |
| **Directive** | Một "mệnh lệnh" thêm vào HTML để thay đổi hành vi. Ví dụ: `[sortable]` bật tính năng sắp xếp |
| **Input (`[]`)** | Props truyền từ ngoài vào component. Ví dụ: `[data]="myProducts"` |
| **Output (`()`)** | Sự kiện component phát ra khi có gì đó xảy ra. Ví dụ: `(sortChange)="handleSort($event)"` |
| **Signal** | Biến đặc biệt trong Angular — khi giá trị thay đổi, giao diện tự cập nhật |
| **Template** | HTML được nhúng trong component |
| **Content Projection** | Cho phép component chứa "nội dung con" bên trong nó. Ví dụ: `<smart-grid>...(nội dung con)...</smart-grid>` |
| **ng-template** | "Mẫu" HTML dùng nhiều lần, được render theo điều kiện |
| **Provider** | Cách khai báo service (dịch vụ) có thể inject (tiêm) vào component |

---

## 3. Cấu trúc thư mục

```
projects/smart-grid/src/
├── lib/                          ← Toàn bộ code của thư viện
│   ├── grid.component.ts        ← COMPONENT CHÍNH — ô chứa bảng
│   ├── grid.component.html      ← HTML template của grid
│   ├── grid.component.scss      ← CSS styling của grid
│   ├── grid.module.ts           ← SmartGridModule — Export tất cả
│   │
│   ├── column/                  ← Các component cột
│   │   ├── column.component.ts  ← Cột thường
│   │   ├── column-group.component.ts  ← Nhóm cột (header lồng nhau)
│   │   ├── command-column.component.ts ← Cột nút lệnh (edit/remove)
│   │   ├── checkbox-column.component.ts ← Cột checkbox
│   │   ├── radio-column.component.ts    ← Cột radio
│   │   └── span-column.component.ts     ← Cột gộp nhiều cột con
│   │
│   ├── templates/               ← Các template directive
│   │   ├── header-template.directive.ts  ← Template header tùy chỉnh
│   │   ├── cell-template.directive.ts    ← Template cell tùy chỉnh
│   │   ├── detail-template.directive.ts  ← Template hàng chi tiết
│   │   ├── no-records-template.directive.ts ← Template khi data rỗng
│   │   ├── footer-template.directive.ts  ← Template footer (aggregates)
│   │   └── span-cell-template.directive.ts ← Template cell span-column
│   │
│   └── common/                  ← Service & type definitions
│       └── sort.service.ts      ← Logic sắp xếp
│
├── public-api.ts                ← File export public — cái gì bên ngoài dùng được
└── index.ts                     ← Entry point
```

---

## 4. Luồng dữ liệu tổng quát

Khi người dùng viết thế này trong template:

```html
<smart-grid [data]="products()" [sortable]="true" [pageable]="true">
    <smart-grid-column field="Name" title="Tên" />
    <smart-grid-column field="Price" title="Giá" />
</smart-grid>
```

**Thứ tự xảy ra:**

```
┌─────────────────────────────────────────────────────┐
│ 1. Angular解析 template                             │
│    → Thấy <smart-grid>, <smart-grid-column>         │
│    → Tạo GridComponent, ColumnComponent instances   │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│ 2. Inputs truyền vào                                │
│    data = [{ Name: "Chai", Price: 18 }, ...]       │
│    sortable = true                                  │
│    pageable = true                                  │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│ 3. GridComponent处理 data                           │
│    → Gọi process() function (Kendo)                 │
│    → Áp dụng sort, filter, group, page              │
│    → Tạo GridDataResult { data, total }             │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│ 4. Grid render HTML table                           │
│    → Đọc ColumnComponents từ ContentChildren        │
│    → Render <thead> từ column titles                │
│    → Render <tbody> từ processed data               │
│    → Mỗi row có cell cho mỗi column                │
└──────────────────────────┬──────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────┐
│ 5. User interaction                                 │
│    → Click header → Sort → Phát event sortChange    │
│    → Click pager → Page → Phát event pageChange     │
│    → Double-click cell → Edit → Phát event edit     │
└─────────────────────────────────────────────────────┘
```

---

## 5. Các phần chính của thư viện

### 5.1 GridComponent — Trung tâm

**File:** `grid.component.ts` (~800 dòng)

Đây là "bộ não" của toàn bộ thư viện. GridComponent:

**a) Nhận data từ ngoài vào:**

```typescript
// Có 2 cách truyền data:

// Cách 1: Truyền trực tiếp (simple)
data = signal<Product[]>(PRODUCTS);

// Cách 2: Server-driven binding
fetchProducts: DataBindingFetch = (state) => {
    return this.http.get('/api/products', { params: state });
};
```

**b) Xử lý data (tính năng chính):**

GridComponent chứa một `computed` signal gọi là `processedData`:

```
raw data
   ↓
[Filter] → Loại bỏ rows không khớp filter
   ↓
[Group] → Nhóm rows theo field, tạo group headers
   ↓
[Sort] → Sắp xếp rows theo sort criteria
   ↓
[Paginate] → Chỉ lấy rows trong page hiện tại
   ↓
GridDataResult { data: [], total: number }
```

Mỗi khi `data`, `sort`, `filter`, `group`, hoặc `page` thay đổi,
`processedData` tự tính lại và grid render lại.

**c) Render HTML:**

Trong `grid.component.html`, có cấu trúc大致 sau:

```html
<div class="k-grid">
  <!-- Loading overlay -->
  @if (loading()) { <div class="k-loading-mask">...</div> }

  <!-- Header -->
  <table>
    <thead>
      <tr>
        @for (column of columns()) {
          <th (click)="onSort(column)">{{ column.title }}</th>
        }
      </tr>
    </thead>

    <!-- Body -->
    <tbody>
      @for (row of processedData().data) {
        <tr [class]="rowClassFn({ dataItem: row })">
          @for (column of columns()) {
            <td>
              <!-- Có template tùy chỉnh không? -->
              @if (column.hasCellTemplate) {
                <ng-container [ngTemplateOutlet]="column.cellTemplate"
                               [ngTemplateOutletContext]="{ $implicit: row }" />
              } @else {
                <!-- Không có → hiển thị text mặc định -->
                {{ getNestedValue(row, column.field) }}
              }
            </td>
          }
        </tr>
      }
    </tbody>
  </table>

  <!-- Pager -->
  @if (pageable()) {
    <div class="k-pager">
      <button (click)="onPage('first')">⏮</button>
      <button (click)="onPage('prev')">◀</button>
      <span>Page {{ currentPage }} / {{ totalPages }}</span>
      <button (click)="onPage('next')">▶</button>
      <button (click)="onPage('last')">⏭</button>
    </div>
  }
</div>
```

**d) Query ColumnComponents:**

GridComponent dùng `@ContentChildren` để lấy tất cả ColumnComponent con:

```typescript
@ContentChildren(GridColumnComponent)
columns = signalComputed<GridColumnComponent[]>(...);
```

Điều này có nghĩa: khi bạn viết `<smart-grid-column>` bên trong `<smart-grid>`,
Angular tự độnginject tất cả column components vào GridComponent.

---

### 5.2 GridColumnComponent — Cột

**File:** `column.component.ts` (~100 dòng)

Mỗi `<smart-grid-column>` là một component đơn giản, chỉ chứa metadata:

```typescript
@Component({ selector: 'smart-grid-column', ... })
export class GridColumnComponent {
    field = input<string>();          // Field name trong data object
    title = input<string>();          // Hiển thị trên header
    width = input<string>();          // Chiều rộng
    locked = input<boolean>();        // Cột dính (sticky)
    sortable = input<boolean>();      // Cho phép sort
    filterable = input<boolean>();    // Cho phép filter
    // ... và nhiều inputs khác
}
```

**Cách hoạt động:**

1. ColumnComponent KHÔNG render bất cứ gì — nó chỉ giữ metadata
2. GridComponent đọc metadata từ columns() để quyết định render gì
3. Ví dụ: grid đọc `column.width` → set `style="width: 100px"` cho `<td>`

---

### 5.3 Các Column đặc biệt

Ngoài cột thường (`smart-grid-column`), còn có:

| Component | Selector | Mục đích |
|-----------|----------|----------|
| `CommandColumnComponent` | `smart-grid-command-column` | Cột có nút Edit/Remove |
| `CheckboxColumnComponent` | `smart-grid-checkbox-column` | Cột checkbox để chọn nhiều |
| `RadioColumnComponent` | `smart-grid-radio-column` | Cột radio để chọn 1 |
| `SpanColumnComponent` | `smart-grid-span-column` | Gộp nhiều cột con thành 1 cell |
| `ColumnGroupComponent` | `smart-grid-column-group` | Nhóm header lồng nhau |

Các component này tương tự `GridColumnComponent` — giữ metadata, grid render theo.

---

### 5.4 Các Directive

Directive là "mệnh lệnh" nhỏ, thêm tính năng cho grid:

| Directive | Selector | Ví dụ |
|-----------|----------|-------|
| `sortable` | `[sortable]` | Click header → sort asc/desc/unsort |
| `pageable` | `[pageable]` | Hiển thị pager, cho phép chuyển trang |
| `filterable` | `[filterable]` | Hàng filter dưới header |
| `selectable` | `[selectable]` | Checkbox selection |
| `resizable` | `[resizable]` | Kéo mép cột đổi width |
| `reorderable` | `[reorderable]` | Kéo thả đổi thứ tự cột |
| `editable` | `[editable]` | Double-click cell để sửa |
| `groupable` | `[groupable]` | Nhóm rows theo field |

**Cách directive hoạt động:**

Khi bạn viết `[sortable]="true"` trên `<smart-grid>`, directive tự:

1. Thêm `(click)` handler lên header
2. Khi click → gọi GridComponent.sort()
3. GridComponent cập nhật sort state → processedData tính lại → grid render lại

---

### 5.5 Các Template

Template cho phép người dùng TỰ ĐỊNH NGHĨA giao diện cho từng phần:

```html
<smart-grid-column field="Name" title="Tên">
    <!-- Template cho HEADER -->
    <ng-template smartGridHeaderTemplate let-column>
        <span style="color: blue">{{ column.title }}</span>
    </ng-template>

    <!-- Template cho CELL -->
    <ng-template smartGridCellTemplate let-dataItem>
        <strong>{{ dataItem.Name }}</strong>
        @if (dataItem.Discontinued) {
            <span class="badge">Ngừng bán</span>
        }
    </ng-template>
</smart-grid-column>
```

**Cách template hoạt động:**

1. ColumnComponent kiểm tra: "có ng-template nào được gắn không?"
2. Nếu có → truyền template reference lên GridComponent
3. GridComponent dùng `ngTemplateOutlet` để render template thay vì text mặc định
4. `let-dataItem` là "tham số" — grid truyền row data vào template

**Các template có sẵn:**

| Directive name | Dùng cho | Context |
|---------------|----------|---------|
| `smartGridHeaderTemplate` | Header cell | `column` (GridColumnComponent) |
| `smartGridCellTemplate` | Data cell | `dataItem` (row data) |
| `smartGridDetailTemplate` | Detail row | `dataItem` (row data) |
| `smartGridNoRecordsTemplate` | Grid rỗng | Không có |
| `smartGridFooterTemplate` | Footer cell | `value` (aggregate result) |
| `smartGridSpanCellTemplate` | Span column cell | `dataItem` (row data) |

---

### 5.6 Sort Service

**File:** `sort.service.ts` (~60 dòng)

Đây là service nhỏ xử lý logic sắp xếp:

```typescript
export class SortService {
    // Nhận data + sort criteria → trả data đã sort
    process(data: any[], sort: SortDescriptor[]): any[] {
        return [...data].sort((a, b) => {
            for (const s of sort) {
                const aVal = this.getNestedValue(a, s.field);
                const bVal = this.getNestedValue(b, s.field);
                const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
                if (cmp !== 0) return s.dir === 'asc' ? cmp : -cmp;
            }
            return 0;
        });
    }
}
```

**Luồng sort:**

```
User click header "Tên"
   ↓
GridComponent.onSort(column)
   ↓
Cập nhật sort state: [{ field: 'ProductName', dir: 'asc' }]
   ↓
SortService.process(data, sort) → data đã sort
   ↓
processedData() tính lại → grid render lại
   ↓
(sortChange) event phát ra → user nhận biết
```

---

## 6. Tính năng chi tiết

### 6.1 Sorting (Sắp xếp)

**Khi bấm header:**

```
Unsorted → Asc (▲) → Desc (▼) → Unsorted
```

GridComponent giữ `sort` signal dạng `SortDescriptor[]`:

```typescript
sort = signal<SortDescriptor[]>([]);
// SortDescriptor = { field: string, dir: 'asc' | 'desc' }
```

Khi click header:
1. Kiểm tra sort hiện tại
2. Nếu chưa sort → thêm `{ field, dir: 'asc' }`
3. Nếu đang asc → đổi thành desc
4. Nếu đang desc → xóa sort

### 6.2 Paging (Phân trang)

GridComponent giữ:

```typescript
page = signal(0);         // Page hiện tại (0-indexed)
pageSize = input(10);     // Số rows/trang
```

`processedData()` tự slice data:

```
total = 100 rows
page = 0, pageSize = 10
→ data.slice(0, 10)  // 10 rows đầu

page = 1, pageSize = 10
→ data.slice(10, 20) // 10 rows tiếp
```

### 6.3 Filtering (Lọc)

Khi `[filterable]="'row'"`, mỗi header có input filter:

```
User gõ "Chai" vào filter input của cột "Tên"
   ↓
FilterService.process(data, filter) → data chỉ còn chứa "Chai"
   ↓
processedData() tính lại → grid render lại
   ↓
(filterChange) event phát ra
```

### 6.4 Grouping (Nhóm)

Khi `[groupable]="true"` và user kéo header xuống vùng group:

```
Data: [Beverages, Beverages, Condiments, Condiments, Condiments]
   ↓ Group theo "Category.Name"
Result:
  └─ Beverages (2 items)
      └─ Chai
      └─ Chang
  └─ Condiments (3 items)
      └─ Aniseed Syrup
      └─ Chef Anton Cajun
      └─ Chef Anton Gumbo
```

GridComponent giữ `group` signal:

```typescript
group = signal<GroupDescriptor[]>([]);
// GroupDescriptor = { field: string, dir: 'asc'|'desc', aggregates?: AggregateDescriptor[] }
```

### 6.5 Inline Editing (Chỉnh sửa trực tiếp)

Khi `[editable]="true"`:

```
Double-click cell
   ↓
Cell chuyển từ <td>text</td> sang <td><input value="text"></td>
   ↓
User sửa xong → Enter hoặc blur
   ↓
(cellChange) event phát ra → user cập nhật data
   ↓
Cell trở về <td>text</td>
```

### 6.6 Selection (Chọn hàng)

**Checkbox selection:**

```html
<smart-grid-checkbox-column title="Chọn" width="60" />
```

```
Header checkbox: Select all / Deselect all
Row checkbox: Toggle selection
   ↓
(selectionChange) event phát ra
   → selectedRows: rows được chọn
   → deselectedRows: rows bị bỏ chọn
```

---

## 7. Cách thêm tính năng mới

### Ví dụ 1: Thêm input mới

Nếu muốn thêm `[striped]="true"` (zebra stripes):

**Bước 1:** Thêm input vào GridComponent:

```typescript
// grid.component.ts
striped = input<boolean>(false);
```

**Bước 2:** Dùng trong template:

```html
<!-- grid.component.html -->
<table [class.k-table-striped]="striped()">
```

**Bước 3:** Thêm CSS:

```scss
// grid.component.scss
.k-table-striped tr:nth-child(even) {
    background-color: #f5f5f5;
}
```

### Ví dụ 2: Thêm template mới

Nếu muốn thêm `smartGridGroupHeaderTemplate`:

**Bước 1:** Tạo directive mới:

```typescript
// group-header-template.directive.ts
@Directive({ selector: '[smartGridGroupHeaderTemplate]', standalone: true })
export class GroupHeaderTemplateDirective {
    templateRef = inject(TemplateRef<any>);
}
```

**Bước 2:** Đăng ký trong GridComponent:

```typescript
// grid.component.ts
@ContentChildren(GroupHeaderTemplateDirective)
groupHeaderTemplates = signalComputed<...>(...);
```

**Bước 3:** Render trong template:

```html
<!-- grid.component.html -->
@if (group().length) {
    <ng-container [ngTemplateOutlet]="getGroupHeaderTemplate()"
                   [ngTemplateOutletContext]="{ $implicit: groupRow }" />
}
```

### Ví dụ 3: Thêm event mới

Nếu muốn phát `(cellDblClick)` event:

**Bước 1:** Tạo output:

```typescript
// grid.component.ts
cellDblClick = output<CellClickEvent>();
```

**Bước 2:** Phát event:

```html
<!-- grid.component.html -->
<td (dblclick)="cellDblClick.emit({ dataItem: row, column: col })">
```

**Bước 3:** User sử dụng:

```html
<smart-grid (cellDblClick)="handleDblClick($event)">
```

---

## 8. FAQ & Gợi ý học tập

### "Tại sao dùng signal mà không dùng plain variable?"

Signal là tính năng mới của Angular — khi giá trị thay đổi, Angular tự
động cập nhật giao diện liên quan. Không cần gọi `this.changeDetectorRef.detectChanges()` thủ công.

### "Tại sao dùng `input()` và `output()` mà không dùng `@Input()` và `@Output()`?"

Đây là Angular syntax mới (v17+), viết ngắn gọn hơn và có type safety tốt hơn.
Nhưng về bản chất, chúng giống nhau.

### "GridComponent quá lớn (~800 dòng), có cách chia nhỏ không?"

Đúng là GridComponent đang làm quá nhiều việc. Trong tương lai có thể tách thành:

```
GridComponent (orchestrator)
├── GridRendererService (render logic)
├── GridStateManagerService (sort/filter/group/page state)
├── GridSelectionService (selection logic)
└── GridEditService (inline edit logic)
```

### "Tôi nên học từ đâu?"

1. **Đọc README.md** —了解 project overview
2. **Đọc file `grid.component.ts`** — Đây là trung tâm, hiểu được nó là hiểu 70%
3. **Đọc `column.component.ts`** — Đơn giản, giúp hiểu data flow
4. **Đọc `public-api.ts`** — Để biết export gì cho bên ngoài
5. **Chạy demo** — `ng serve demo`, click các tính năng, sửa code xem kết quả

### "Các file test (`.spec.ts`) dùng để gì?"

Test file kiểm tra code hoạt động đúng. Ví dụ:

```typescript
it('should sort ascending when header clicked', () => {
    const grid = fixture.componentInstance;
    grid.onSort('ProductName');
    expect(grid.sort()).toEqual([{ field: 'ProductName', dir: 'asc' }]);
});
```

Khi bạn sửa code, chạy test để đảm bảo không làm hỏng tính năng khác.

---

## Tổng kết

```
SmartGridModule
├── GridComponent (trung tâm)
│   ├── Nhận data + inputs
│   ├── Xử lý: sort → filter → group → page
│   └── Render HTML table + pager
│
├── GridColumnComponent (metadata cột)
│   ├── Field, title, width, sortable, ...
│   └── Template references
│
├── Các Column đặc biệt
│   ├── Command, Checkbox, Radio, Span, Group
│   └── Mỗi cái render đặc biệt
│
├── Các Directive
│   ├── sortable, pageable, filterable, selectable, ...
│   └── Thêm hành vi cho grid
│
└── Sort Service
    └── Logic sắp xếp data
```

**Mấu chốt:** GridComponent là "bộ não" — nhận data, xử lý, render.
Các component khác chỉ giữ metadata hoặc thêm template/directive.

Khi bạn muốn thêm tính năng mới, hãy hỏi:
1. **Data nào cần?** → Thêm input
2. **Logic xử lý?** → Thêm method vào GridComponent
3. **Render gì?** → Thêm HTML vào template
4. **Thông báo bên ngoài?** → Thêm output event
