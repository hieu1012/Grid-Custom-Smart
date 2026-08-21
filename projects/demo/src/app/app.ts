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
    /** Bản sao có thể chỉnh sửa (row-edit: save mutate tại chỗ, remove lọc bớt). */
    protected readonly editProducts = signal<Product[]>(PRODUCTS.map((p) => ({ ...p })));
    protected readonly emptyData = signal<Product[]>([]);
    protected readonly loading = signal(false);
    protected readonly serverLoading = signal(false);
    protected readonly hideHeader = signal(false);
    protected readonly highlightDiscontinued = signal(false);
    protected readonly lastEvent = signal('');
    protected readonly groups = signal<GroupDescriptor[]>([]);
    protected readonly guardedUnits = signal(0);
    /** Grid state đã lưu (state persistence — section 14). */
    protected savedState: DataStateChangeEvent | null = null;
    protected readonly persistGrid = viewChild<GridComponent>('persistGrid');

    /** UI state cho sidebar + code toggle. */
    protected readonly showSidebar = signal(false);
    protected readonly expandedSections = signal<Record<number, boolean>>({ 1: true, 2: true, 3: true });
    protected readonly codeVisible = signal<Record<number, boolean>>({});

    protected readonly sectionTitles: string[] = [
        'Grid cơ bản — sort + pager',
        'Custom templates — cell + header',
        'No-records template',
        'rowClass + rowSelected',
        'Loading mask + hideHeader',
        'Master detail',
        'Grouping — group theo cột',
        'Filter row — lọc theo cột',
        'Selection — checkbox chọn dòng',
        'Resizable — kéo mép cột',
        'Column menu — sort + ẩn/hiện',
        'Inline editing — double-click',
        'Server-driven data binding',
        'State persistence',
        'autoGenerateColumns',
        'Column group — header nhiều tầng',
        'Locked columns — cột cố định',
        'Column reorder — kéo thả',
        'Command column — row edit',
        'Checkbox / radio column',
        'Span column — gom cột con',
        'Grid footer — aggregates',
        'Column chooser — ẩn/hiện cột',
    ];

    /** Code examples for each section — stored as TS strings to avoid Angular template parsing of `{`/`}`. */
    protected readonly codeExamples: Record<number, string> = {
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
                <li>Trạng thái: {{ '{{' }} dataItem.Discontinued ? 'Ngừng bán' : 'Đang bán' {{ '}}' }}</li>
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
    // hoặc trả Promise / Observable / GridDataResult trực tiếp
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
        20: `<!-- Checkbox: chọn nhiều -->
<smart-grid [data]="products()" [height]="320"
    (selectionChange)="onSelectionChange($event)">
    <smart-grid-checkbox-column title="Chọn" width="60" />
    <smart-grid-column field="ProductID" title="ID" width="70" />
    <smart-grid-column field="ProductName" title="Tên sản phẩm" width="260" />
    <smart-grid-column field="UnitPrice" title="Đơn giá" width="140" />
    <smart-grid-column field="Discontinued" title="Trạng thái" width="110" />
</smart-grid>

<!-- Radio: chọn 1 -->
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
        22: `<!-- Component: -->
aggregates: AggregateDescriptor[] = [
    { field: 'ProductID', aggregate: 'count' },
    { field: 'UnitPrice', aggregate: 'sum' },
];

<!-- Template: -->
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
    };

    protected toggleSidebar(): void {
        this.showSidebar.update((v) => !v);
    }

    protected setSection(n: number): void {
        this.expandedSections.update((s) => ({ ...s, [n]: true }));
        this.showSidebar.set(false);
        setTimeout(() => {
            document.getElementById(`section-${n}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    protected toggleSection(n: number): void {
        this.expandedSections.update((s) => ({ ...s, [n]: !s[n] }));
    }

    protected isExpanded(n: number): boolean {
        return this.expandedSections()[n] ?? false;
    }

    protected toggleCode(n: number): void {
        this.codeVisible.update((s) => ({ ...s, [n]: !s[n] }));
    }

    protected isCodeVisible(n: number): boolean {
        return this.codeVisible()[n] ?? false;
    }

    /** Aggregates cho grid footer (section 22). */
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

    /* ── Section 13: server-driven data binding ──────────────────────── */

    /** Giả lập server: trả về Promise sau 400ms, áp sort/filter/group/page local. */
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

    /* ── Section 14: state persistence ───────────────────────────────── */

    protected saveGridState(): void {
        this.savedState = this.persistGrid()?.getGridState() ?? null;
        this.lastEvent.set(`state saved: ${JSON.stringify(this.savedState)}`);
    }

    protected restoreGridState(): void {
        if (this.savedState) {
            this.persistGrid()?.setGridState(this.savedState);
        }
    }

    /* ── Section 19: command column — row edit ──────────────────────── */

    protected onRowEdit(name: string, event: EditEvent): void {
        this.lastEvent.set(`${name}: ${JSON.stringify(event.dataItem)}`);
    }

    protected onRemove(event: EditEvent): void {
        this.editProducts.update((list) => list.filter((p) => p.ProductID !== (event.dataItem as Product).ProductID));
        this.lastEvent.set(`remove: ${JSON.stringify(event.dataItem)}`);
    }
}