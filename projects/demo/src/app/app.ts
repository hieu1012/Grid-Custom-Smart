import { Component, computed, signal, viewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import {
    CellTemplateDirective,
    CheckboxColumnComponent,
    ColumnComponent,
    ColumnGroupComponent,
    CommandColumnComponent,
    DataBindingDirective,
    DetailTemplateDirective,
    FooterTemplateDirective,
    GridComponent,
    HeaderTemplateDirective,
    NoRecordsTemplateDirective,
    RadioColumnComponent,
    SpanCellTemplateDirective,
    SpanColumnComponent,
    process,
    type AggregateDescriptor,
    type DataBindingFetch,
    type DataStateChangeEvent,
    type EditEvent,
    type GridDataResult,
    type GroupDescriptor,
    type RowSelectedArgs,
    type SelectionEvent,
} from 'emi-grid';

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
    imports: [
        GridComponent,
        ColumnComponent,
        ColumnGroupComponent,
        CommandColumnComponent,
        CheckboxColumnComponent,
        RadioColumnComponent,
        SpanColumnComponent,
        CellTemplateDirective,
        HeaderTemplateDirective,
        NoRecordsTemplateDirective,
        DetailTemplateDirective,
        SpanCellTemplateDirective,
        FooterTemplateDirective,
        DataBindingDirective,
        DecimalPipe,
    ],
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