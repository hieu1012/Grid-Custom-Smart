import { Component, computed, signal, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
    SmartGridModule,
    process,
    type AggregateDescriptor,
    type DataBindingFetch,
    type DataStateChangeEvent,
    type EditEvent,
    type GridDataResult,
    type GroupDescriptor,
    type GridComponent,
    type RowSelectedArgs,
    type SelectionEvent,
} from 'smart-grid';

interface Product {
    ProductID: number;
    ProductName: string;
    UnitPrice: number;
    Discontinued: boolean;
    Category: { Name: string };
}

const PRODUCTS: Product[] = [
    { ProductID: 1, ProductName: 'Chai', UnitPrice: 18, Discontinued: false, Category: { Name: 'Beverages' } },
    { ProductID: 2, ProductName: 'Chang', UnitPrice: 19, Discontinued: true, Category: { Name: 'Beverages' } },
    { ProductID: 3, ProductName: 'Aniseed Syrup', UnitPrice: 10, Discontinued: false, Category: { Name: 'Condiments' } },
    { ProductID: 4, ProductName: 'Chef Anton Cajun Seasoning', UnitPrice: 22, Discontinued: false, Category: { Name: 'Condiments' } },
    { ProductID: 5, ProductName: 'Chef Anton Gumbo Mix', UnitPrice: 21.35, Discontinued: true, Category: { Name: 'Condiments' } },
    { ProductID: 6, ProductName: 'Grandma Boysenberry Spread', UnitPrice: 25, Discontinued: false, Category: { Name: 'Condiments' } },
    { ProductID: 7, ProductName: 'Uncle Bob Dried Pears', UnitPrice: 30, Discontinued: false, Category: { Name: 'Produce' } },
    { ProductID: 8, ProductName: 'Northwoods Cranberry Sauce', UnitPrice: 40, Discontinued: false, Category: { Name: 'Condiments' } },
    { ProductID: 9, ProductName: 'Mishi Kobe Niku', UnitPrice: 97, Discontinued: true, Category: { Name: 'Meat/Poultry' } },
    { ProductID: 10, ProductName: 'Ikura', UnitPrice: 31, Discontinued: false, Category: { Name: 'Seafood' } },
    { ProductID: 11, ProductName: 'Queso Cabrales', UnitPrice: 21, Discontinued: false, Category: { Name: 'Dairy Products' } },
    { ProductID: 12, ProductName: 'Tofu', UnitPrice: 23.25, Discontinued: false, Category: { Name: 'Produce' } },
];

@Component({
    selector: 'app-root',
    imports: [SmartGridModule, DecimalPipe],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected readonly products = signal<Product[]>(PRODUCTS);
    protected readonly editProducts = signal<Product[]>(PRODUCTS.map((p) => ({ ...p })));
    protected readonly emptyData = signal<Product[]>([]);
    protected readonly loading = signal(false);
    protected readonly serverLoading = signal(false);
    protected readonly hideHeader = signal(false);
    protected readonly highlightDiscontinued = signal(false);
    protected readonly lastEvent = signal('');
    protected readonly groups = signal<GroupDescriptor[]>([]);
    protected readonly guardedUnits = signal(0);
    protected savedState: DataStateChangeEvent | null = null;
    protected readonly persistGrid = viewChild<GridComponent>('persistGrid');

    protected readonly activeSection = signal(0);
    protected readonly activeTab = signal<'demo' | 'code'>('demo');
    protected readonly showMobileSidebar = signal(false);
    protected readonly copiedIndex = signal<number | null>(null);

    protected readonly playground = signal({
        headerBg: '#f8f9fa',
        headerText: '#1a1a2e',
        headerBorder: '#dee2e6',
        cellBg: '#ffffff',
        cellText: '#212529',
        cellBorder: '#dee2e6',
        borderColor: '#dee2e6',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '0px',
        cellPadding: '8px 12px',
        headerPadding: '10px 12px',
        headerFontWeight: '600',
        alignment: 'left' as 'left' | 'center' | 'right',
        stripedRows: false,
        hoverHighlight: true,
    });

    protected readonly sectionDescriptions: Record<number, string> = {
        1: 'Click header để sort (asc → desc → unsort). Pager có first/prev/next/last. Chiều cao cố định 300px.',
        2: 'Header template (màu xanh), cell template (in đậm + badge, format số, text theo điều kiện).',
        3: 'Khi data rỗng hiển thị template tự định nghĩa thay vì text mặc định.',
        4: 'rowClass: hàng ngừng bán mờ đi. rowSelected: bật highlight nền theo function điều kiện.',
        5: 'Loading: overlay spinner khi [loading]="true". hideHeader: ẩn/hiện thead.',
        6: 'Click mũi tên đầu hàng để mở detail row. detailExpandBy = ProductID giữ trạng thái expand khi đổi trang.',
        7: 'Bật [groupable] → header có nút group. Aggregates (sum/count) ở group footer.',
        8: '[filterable]="\'row\'" → input dưới mỗi header. filterChange + dataStateChange phát mỗi lần lọc.',
        9: '[selectable]="true" → cột checkbox: header select-all, row chọn từng dòng.',
        10: '[resizable]="true" → kéo handle ở mép phải header để đổi width cột.',
        11: '[columnMenu]="true" → nút ⋮ trên header: sort asc/desc + list cột ẩn/hiện.',
        12: '[editable]="true" → dblclick cell để sửa. Enter/blur lưu, Esc hủy.',
        13: '[smartGridDataBinding]="fetch" → grid tự gọi hàm fetch mỗi khi state thay đổi.',
        14: 'getGridState()/setGridState() → lưu/khôi phục toàn bộ state (skip/sort/group/filter).',
        15: '[autoGenerateColumns]="true" → grid tự tạo cột theo fields của data object.',
        16: 'smart-grid-column-group bọc cột con → header lồng nhau (rowspan/colspan tự tính).',
        17: '[locked]="true" → cột dính bên trái (sticky) khi cuộn ngang.',
        18: '[reorderable]="true" → giữ chuột ở header kéo ngang để đổi thứ tự.',
        19: 'smart-grid-command-column → nút edit/remove. Khi edit, hàng đổi thành input + save/cancel.',
        20: 'smart-grid-checkbox-column: chọn nhiều. smart-grid-radio-column: chọn đúng 1.',
        21: 'smart-grid-span-column gộp cột con thành 1 cell (colspan = số cột con).',
        22: '[aggregates] khai báo descriptor → footer row. smartGridFooterTemplate render tùy biến.',
        23: '[columnChooser]="true" → toolbar nút Columns, popup checkbox ẩn/hiện cột.',
    };

    protected readonly sectionTitles: string[] = [
        'Grid cơ bản',
        'Custom templates',
        'No-records template',
        'rowClass + rowSelected',
        'Loading + hideHeader',
        'Master detail',
        'Grouping',
        'Filter row',
        'Selection',
        'Resizable',
        'Column menu',
        'Inline editing',
        'Server-driven binding',
        'State persistence',
        'autoGenerateColumns',
        'Column group',
        'Locked columns',
        'Column reorder',
        'Command column',
        'Checkbox / radio',
        'Span column',
        'Footer aggregates',
        'Column chooser',
    ];

    protected readonly codeExamples: Record<number, string> = {
        0: `# 1. Cài đặt từ GitHub
npm i https://github.com/hieu1012/Grid-Custom-Smart.git

# 2. Peer dependency (tự cài khi cần)
npm i @progress/kendo-svg-icons

# 3. Thêm theme CSS vào styles.scss
@import '@progress/kendo-theme-default/dist/all.css';

# 4. Import trong component
import { SmartGridModule } from 'smart-grid';

@Component({
    imports: [SmartGridModule],
    template: \`
        <smart-grid [data]="products" [sortable]="true"
            [pageable]="true" [pageSize]="5" [height]="300">
            <smart-grid-column field="ID" title="ID" width="70" />
            <smart-grid-column field="Name" title="Tên" width="260" />
            <smart-grid-column field="Price" title="Giá" width="140" />
        </smart-grid>
    \`,
})
export class MyComponent {
    products = [{ ID: 1, Name: 'Chai', Price: 18 }];
}`,
        1: `<smart-grid
    [data]="products()"
    [sortable]="true"
    [pageable]="true"
    [pageSize]="5"
    [height]="300"
    (sortChange)="onEvent('sortChange', $event)"
    (pageChange)="onEvent('pageChange', $event)"
    (dataStateChange)="onEvent('dataStateChange', $event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        2: `<smart-grid [data]="products()" [sortable]="true" [pageable]="true"
    [pageSize]="5" [height]="300">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260">
        <ng-template smartGridHeaderTemplate let-column>
            <span class="header-custom">{{ '{{' }} column.title {{ '}}' }}</span>
        </ng-template>
        <ng-template smartGridCellTemplate let-dataItem>
            <strong>{{ '{{' }} dataItem.ProductName {{ '}}' }}</strong>
            @if (dataItem.Discontinued) { <span class="badge">ngừng</span> }
        </ng-template>
    </smart-grid-column>
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140"
        [style]="{ 'text-align': 'right' }">
        <ng-template smartGridCellTemplate let-dataItem>
            {{ '{{' }} dataItem.UnitPrice | number: '1.2-2' {{ '}}' }} ₫
        </ng-template>
    </smart-grid-column>
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110">
        <ng-template smartGridCellTemplate let-dataItem>
            {{ '{{' }} dataItem.Discontinued ? 'Ngừng bán' : 'Đang bán' {{ '}}' }}
        </ng-template>
    </smart-grid-column>
</smart-grid>`,
        3: `<smart-grid [data]="emptyData()" [height]="220">
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <ng-template smartGridNoRecordsTemplate>
        <div class="empty-box">Không có dữ liệu — no-records template tùy chỉnh.</div>
    </ng-template>
</smart-grid>`,
        4: `<smart-grid [data]="products()" [height]="300"
    [rowClass]="rowClassFn" [rowSelected]="selectedFn()">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>

// Component:
rowClassFn({ dataItem }: { dataItem: Product }): string {
    return dataItem.Discontinued ? 'row-discontinued' : '';
}
selectedFn = computed(() => {
    return this.highlightDiscontinued()
        ? (ctx: RowSelectedArgs) => ctx.dataItem.Discontinued
        : () => false;
});`,
        5: `<smart-grid [data]="products()" [height]="300"
    [loading]="loading()" [hideHeader]="hideHeader()">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
</smart-grid>`,
        6: `<smart-grid [data]="products()" [sortable]="true" [pageable]="true"
    [pageSize]="5" [height]="340" [detailExpandBy]="'ProductID'"
    (detailExpand)="onEvent('detailExpand', $event)"
    (detailCollapse)="onEvent('detailCollapse', $event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
    <ng-template smartGridDetailTemplate let-dataItem>
        <div class="detail-box">
            <strong>{{ '{{' }} dataItem.ProductName {{ '}}' }}</strong>
            <ul>
                <li>Product ID: {{ '{{' }} dataItem.ProductID {{ '}}' }}</li>
                <li>Danh mục: {{ '{{' }} dataItem.Category.Name {{ '}}' }}</li>
                <li>Đơn giá: {{ '{{' }} dataItem.UnitPrice | number: '1.2-2' {{ '}}' }} ₫</li>
            </ul>
        </div>
    </ng-template>
</smart-grid>`,
        7: `<smart-grid [data]="products()" [groupable]="true" [group]="groups()"
    (groupChange)="groupChangeHandler($event)"
    (groupExpand)="onEvent('groupExpand', $event)"
    (groupCollapse)="onEvent('groupCollapse', $event)"
    [height]="320">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        8: `<smart-grid [data]="products()" [filterable]="'row'"
    [pageable]="true" [pageSize]="5" [height]="320"
    (filterChange)="onEvent('filterChange', $event)"
    (dataStateChange)="onEvent('dataStateChange', $event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        9: `<smart-grid [data]="products()" [selectable]="true"
    [pageable]="true" [pageSize]="5" [height]="320"
    (selectionChange)="onSelectionChange($event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        10: `<smart-grid [data]="products()" [resizable]="true" [height]="320">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        11: `<smart-grid [data]="products()" [columnMenu]="true" [sortable]="true"
    [height]="320" (sortChange)="onEvent('sortChange', $event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        12: `<smart-grid [data]="products()" [editable]="true"
    [pageable]="true" [pageSize]="5" [height]="320"
    (cellChange)="onEvent('cellChange', $event)"
    (cellClose)="onEvent('cellClose', $event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        13: `<smart-grid [smartGridDataBinding]="fetchProducts"
    [sortable]="true" [pageable]="true" [pageSize]="5"
    [height]="320" [loading]="serverLoading()">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>

// Component:
fetchProducts: DataBindingFetch = (state: DataStateChangeEvent) => {
    return this.http.get<GridDataResult>('/api/products', { params: state });
};`,
        14: `<smart-grid #persistGrid [data]="products()" [sortable]="true"
    [pageable]="true" [pageSize]="5" [height]="320"
    (stateChange)="onEvent('stateChange', $event)">
    ...
</smart-grid>

// Component:
saveGridState() {
    this.savedState = this.persistGrid()?.getGridState() ?? null;
    localStorage.setItem('grid-state', JSON.stringify(this.savedState));
}
restoreGridState() {
    if (this.savedState) {
        this.persistGrid()?.setGridState(this.savedState);
    }
}`,
        15: `<smart-grid [data]="products()"
    [autoGenerateColumns]="true" [sortable]="true" [height]="320">
</smart-grid>`,
        16: `<smart-grid [data]="products()" [height]="320">
    <smart-grid-column-group title="Thông tin chung">
        <smart-grid-column field="ProductID" title="ID" width="70" />
        <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    </smart-grid-column-group>
    <smart-grid-column-group title="Kinh doanh">
        <smart-grid-column-group title="Giá">
            <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
        </smart-grid-column-group>
        <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
        <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
    </smart-grid-column-group>
</smart-grid>`,
        17: `<smart-grid [data]="products()" [height]="320">
    <smart-grid-column field="ProductID" title="ID" width="80" [locked]="true" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="280" [locked]="true" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="180" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="220" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="160" />
</smart-grid>`,
        18: `<smart-grid [data]="products()" [reorderable]="true" [height]="320"
    (columnReorder)="onEvent('columnReorder', $event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        19: `<smart-grid [data]="editProducts()" [height]="320"
    (edit)="onRowEdit('edit', $event)"
    (save)="onRowEdit('save', $event)"
    (cancel)="onRowEdit('cancel', $event)"
    (remove)="onRemove($event)">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
    <smart-grid-command-column title="Thao tác" [width]="160" />
</smart-grid>`,
        20: `<smart-grid [data]="products()" [height]="320"
    (selectionChange)="onSelectionChange($event)">
    <smart-grid-checkbox-column title="Chọn" width="60" />
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>

<smart-grid [data]="products()" [height]="320"
    (selectionChange)="onSelectionChange($event)">
    <smart-grid-radio-column title="Chọn 1" width="70" />
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
</smart-grid>`,
        21: `<smart-grid [data]="products()" [height]="360">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-span-column title="Sản phẩm">
        <smart-grid-column field="ProductName" title="Tên" width="240" />
        <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
        <ng-template smartGridSpanCellTemplate let-dataItem>
            <div>
                <strong>{{ '{{' }} dataItem.ProductName {{ '}}' }}</strong>
                <span style="color:#888; margin-left:8px">
                    {{ '{{' }} dataItem.Category.Name {{ '}}' }}</span>
            </div>
        </ng-template>
    </smart-grid-span-column>
    <smart-grid-span-column title="Giá & trạng thái">
        <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
        <smart-grid-column field="Discontinued" title="Trạng thái" width="120" />
    </smart-grid-span-column>
</smart-grid>`,
        22: `aggregates: AggregateDescriptor[] = [
    { field: 'ProductID', aggregate: 'count' },
    { field: 'UnitPrice', aggregate: 'sum' },
];

<smart-grid [data]="products()" [aggregates]="aggregates" [height]="360">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="180"
        [style]="{ 'text-align': 'right' }"
        [footerStyle]="{ 'text-align': 'right', 'font-weight': '700' }">
        <ng-template smartGridFooterTemplate let-value>
            Sum: {{ '{{' }} value.sum | number: '1.2-2' {{ '}}' }} ₫
        </ng-template>
    </smart-grid-column>
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>`,
        23: `<smart-grid [data]="products()" [columnChooser]="true" [height]="320">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110"
        [includeInChooser]="false" />
</smart-grid>`,
        24: `/* Playground CSS — copy vào styles.scss của bạn */
.my-grid.k-grid {
    border-color: var(--pg-border-color);
    border-width: var(--pg-border-width);
    border-style: var(--pg-border-style);
    border-radius: var(--pg-border-radius);
}
.my-grid .k-table-th {
    background: var(--pg-header-bg);
    color: var(--pg-header-text);
    border-color: var(--pg-header-border);
    padding: var(--pg-header-padding);
    font-weight: var(--pg-header-font-weight);
    text-align: var(--pg-alignment);
}
.my-grid .k-table-td {
    background: var(--pg-cell-bg);
    color: var(--pg-cell-text);
    border-color: var(--pg-cell-border);
    padding: var(--pg-cell-padding);
    text-align: var(--pg-alignment);
}`,
    };

    protected selectSection(n: number): void {
        this.activeSection.set(n);
        this.activeTab.set('demo');
        this.lastEvent.set('');
        this.showMobileSidebar.set(false);
    }

    protected switchTab(tab: 'demo' | 'code'): void {
        this.activeTab.set(tab);
    }

    protected toggleMobileSidebar(): void {
        this.showMobileSidebar.update((v) => !v);
    }

    protected async copyCode(index: number): Promise<void> {
        const code = this.codeExamples[index];
        if (code) {
            await navigator.clipboard.writeText(code);
            this.copiedIndex.set(index);
            setTimeout(() => this.copiedIndex.set(null), 2000);
        }
    }

    protected updatePlayground(key: string, value: string | boolean): void {
        this.playground.update((p) => ({ ...p, [key]: value }));
    }

    protected get playgroundCss(): Record<string, string> {
        const p = this.playground();
        return {
            '--pg-header-bg': p.headerBg,
            '--pg-header-text': p.headerText,
            '--pg-header-border': p.headerBorder,
            '--pg-cell-bg': p.cellBg,
            '--pg-cell-text': p.cellText,
            '--pg-cell-border': p.cellBorder,
            '--pg-border-color': p.borderColor,
            '--pg-border-width': p.borderWidth,
            '--pg-border-style': p.borderStyle,
            '--pg-border-radius': p.borderRadius,
            '--pg-cell-padding': p.cellPadding,
            '--pg-header-padding': p.headerPadding,
            '--pg-header-font-weight': p.headerFontWeight,
            '--pg-alignment': p.alignment,
        };
    }

    protected readonly installStep3Code = `import { Component } from '@angular/core';
import { SmartGridModule } from 'smart-grid';

@Component({
    selector: 'app-products',
    imports: [SmartGridModule],
    template: \`
        &lt;smart-grid [data]="products" [sortable]="true"
            [pageable]="true" [pageSize]="5" [height]="300"&gt;
            &lt;smart-grid-column field="ID" title="ID" width="70" /&gt;
            &lt;smart-grid-column field="Name" title="Tên" width="260" /&gt;
            &lt;smart-grid-column field="Price" title="Giá" width="140" /&gt;
        &lt;/smart-grid&gt;
    \`,
})
export class ProductsComponent {
    products = [
        { ID: 1, Name: 'Chai', Price: 18 },
        { ID: 2, Name: 'Chang', Price: 19 },
    ];
}`;

    protected readonly installStep4Code = `import { SmartGridModule } from 'smart-grid';
// SmartGridModule đã re-export tất cả components/directives

// Sử dụng:
@Component({
    imports: [SmartGridModule],
    // ...
})
export class MyComponent {}`;

    protected readonly playgroundCode = `<smart-grid [data]="products()" [sortable]="true" [pageable]="true"
    [pageSize]="5" [height]="300" class="my-grid">
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Category.Name" title="Danh mục" width="160" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>

/* styles.scss — custom grid appearance */
.my-grid.k-grid { border-color: var(--pg-border-color); border-width: var(--pg-border-width); border-style: var(--pg-border-style); border-radius: var(--pg-border-radius); }
.my-grid .k-table-th { background: var(--pg-header-bg); color: var(--pg-header-text); border-color: var(--pg-header-border); padding: var(--pg-header-padding); font-weight: var(--pg-header-font-weight); text-align: var(--pg-alignment); }
.my-grid .k-table-td { background: var(--pg-cell-bg); color: var(--pg-cell-text); border-color: var(--pg-cell-border); padding: var(--pg-cell-padding); text-align: var(--pg-alignment); }`;

    protected readonly aggregates: AggregateDescriptor[] = [
        { field: 'ProductID', aggregate: 'count' },
        { field: 'UnitPrice', aggregate: 'sum' },
    ];

    protected readonly groupChangeHandler = (event: GroupDescriptor[]): void => {
        this.groups.set(event);
        this.lastEvent.set(`groupChange: ${JSON.stringify(event)}`);
    };

    protected readonly selectedFn = computed(() => {
        return this.highlightDiscontinued()
            ? (context: RowSelectedArgs) => context.dataItem.Discontinued
            : () => false;
    });

    protected rowClassFn({ dataItem }: { dataItem: Product }): string {
        return dataItem.Discontinued ? 'row-discontinued' : '';
    }

    protected toggleEmpty(): void {
        this.emptyData.set(this.emptyData().length === 0 ? PRODUCTS : []);
    }

    protected toggleLoading(): void {
        this.loading.update((v) => !v);
    }

    protected toggleHeader(): void {
        this.hideHeader.update((v) => !v);
    }

    protected toggleHighlight(): void {
        this.highlightDiscontinued.update((v) => !v);
    }

    protected toggleGroupByCategory(): void {
        this.groups.set(
            this.groups().length
                ? []
                : [
                      {
                          field: 'Category.Name',
                          dir: 'asc',
                          aggregates: [
                              { field: 'UnitPrice', aggregate: 'sum' },
                              { field: 'UnitPrice', aggregate: 'count' },
                          ],
                      },
                  ]
        );
        this.lastEvent.set(`group: ${JSON.stringify(this.groups())}`);
    }

    protected onSelectionChange(event: SelectionEvent): void {
        this.guardedUnits.set(event.selectedRows?.length ?? 0);
        this.lastEvent.set(
            `selectionChange: selected=${event.selectedRows?.length ?? 0}, deselected=${event.deselectedRows?.length ?? 0}`
        );
    }

    protected onEvent(name: string, payload: unknown): void {
        this.lastEvent.set(`${name}: ${JSON.stringify(payload)}`);
    }

    protected readonly fetchProducts: DataBindingFetch = (state: DataStateChangeEvent): Promise<GridDataResult> => {
        this.serverLoading.set(true);
        return new Promise<GridDataResult>((resolve) => {
            setTimeout(() => {
                this.serverLoading.set(false);
                this.lastEvent.set(
                    `server fetch: skip=${state.skip}, take=${state.take}, ` +
                        `sort=${state.sort?.length ?? 0}, filter=${state.filter ? 1 : 0}, group=${state.group?.length ?? 0}`
                );
                resolve(process(this.products(), state));
            }, 400);
        });
    };

    protected saveGridState(): void {
        this.savedState = this.persistGrid()?.getGridState() ?? null;
        this.lastEvent.set(`state saved: ${JSON.stringify(this.savedState)}`);
    }

    protected restoreGridState(): void {
        if (this.savedState) {
            this.persistGrid()?.setGridState(this.savedState);
        }
    }

    protected onRowEdit(name: string, event: EditEvent): void {
        this.lastEvent.set(`${name}: ${JSON.stringify(event.dataItem)}`);
    }

    protected onRemove(event: EditEvent): void {
        this.editProducts.update((list) => list.filter((p) => p.ProductID !== (event.dataItem as Product).ProductID));
        this.lastEvent.set(`remove: ${JSON.stringify(event.dataItem)}`);
    }
}
