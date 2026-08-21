import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { GridComponent } from './grid.component';
import { ColumnComponent } from './columns/column.component';
import { CellTemplateDirective } from './rendering/cell-template.directive';
import { DetailTemplateDirective } from './rendering/detail-template.directive';
import { DataStateChangeEvent, PageChangeEvent } from './data/change-event-args';
import { CompositeFilterDescriptor, GroupDescriptor, SortDescriptor } from './query/types';

@Component({
    standalone: true,
    imports: [GridComponent, ColumnComponent, CellTemplateDirective],
    template: `
        <smart-grid
            [data]="data"
            [sortable]="true"
            [pageable]="true"
            [pageSize]="3"
            (sortChange)="lastSort = $event"
            (pageChange)="lastPage = $event"
            (dataStateChange)="lastDataState = $event"
        >
            <smart-grid-column field="id" title="ID"></smart-grid-column>
            <smart-grid-column field="name" title="Name">
                <ng-template smartGridCellTemplate let-dataItem>
                    {{ dataItem.name.toUpperCase() }}
                </ng-template>
            </smart-grid-column>
        </smart-grid>
    `,
})
class HostComponent {
    public data = [
        { id: 1, name: 'alpha' },
        { id: 2, name: 'beta' },
        { id: 3, name: 'gamma' },
        { id: 4, name: 'delta' },
        { id: 5, name: 'epsilon' },
    ];
    public lastSort: SortDescriptor[] | undefined;
    public lastPage: PageChangeEvent | undefined;
    public lastDataState: DataStateChangeEvent | undefined;
}

describe('GridComponent (TestBed integration)', () => {
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HostComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(HostComponent);
        fixture.detectChanges();
        // flush effects (sync inputs → state signals) rồi render lần cuối
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('render đúng số rows theo pageSize (3/5) + headers + cell template', () => {
        const rows = fixture.nativeElement.querySelectorAll('tbody tr');
        expect(rows.length).toBe(3);
        expect(fixture.nativeElement.querySelectorAll('thead th').length).toBe(2);
        // cell template (uppercase) đã áp dụng
        expect(fixture.nativeElement.textContent).toContain('ALPHA');
        // cột id hiển thị giá trị field
        expect(fixture.nativeElement.textContent).toContain('1');
    });

    it('pager render đúng: 2 trang (total 5, pageSize 3) + info', () => {
        const numbers = fixture.nativeElement.querySelectorAll('.k-pager-numbers-wrap .k-pager-numbers.k-button');
        expect(numbers.length).toBe(2);
        const info = fixture.nativeElement.querySelector('.k-pager-info')?.textContent ?? '';
        expect(info).toContain('Page 1 of 2');
        expect(info).toContain('(5 records)');
    });

    it('click header Name → sort asc + emit sortChange + dataStateChange', () => {
        const header = fixture.nativeElement.querySelectorAll('thead th')[1];
        header.click();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastSort).toEqual([{ field: 'name', dir: 'asc' }]);
        expect(fixture.componentInstance.lastDataState?.sort).toEqual([{ field: 'name', dir: 'asc' }]);
        expect(fixture.componentInstance.lastDataState?.skip).toBe(0);
        expect(fixture.componentInstance.lastDataState?.take).toBe(3);
    });

    it('click sort 3 lần: asc → desc → unsort (allowUnsort default)', () => {
        const header = fixture.nativeElement.querySelectorAll('thead th')[1];
        header.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.lastSort).toEqual([{ field: 'name', dir: 'asc' }]);

        header.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.lastSort).toEqual([{ field: 'name', dir: 'desc' }]);

        header.click();
        fixture.detectChanges();
        expect(fixture.componentInstance.lastSort).toEqual([]);
    });

    it('sort thật sự reorder rows (desc theo id)', () => {
        const idHeader = fixture.nativeElement.querySelectorAll('thead th')[0];
        idHeader.click(); // asc
        fixture.detectChanges();
        idHeader.click(); // desc
        fixture.detectChanges();

        const firstCell = fixture.nativeElement.querySelector('tbody tr td')?.textContent?.trim();
        expect(firstCell).toBe('5');
    });

    it('click pager Next → page 2 (skip 3) + emit pageChange', () => {
        const nextButton = fixture.nativeElement.querySelector('.k-pager-next');
        nextButton.click();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastPage).toEqual({ skip: 3, take: 3 });
        expect(fixture.componentInstance.lastDataState?.skip).toBe(3);
        const firstRowId = fixture.nativeElement.querySelector('tbody tr td')?.textContent?.trim();
        expect(firstRowId).toBe('4');
        // pager info chuyển sang page 2
        const info = fixture.nativeElement.querySelector('.k-pager-info')?.textContent ?? '';
        expect(info).toContain('Page 2 of 2');
    });

    it('empty data → hiển thị no-records row', async () => {
        fixture.componentInstance.data = [];
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const noRecords = fixture.nativeElement.querySelector('.k-grid-norecords');
        expect(noRecords).not.toBeNull();
        expect(fixture.nativeElement.textContent).toContain('No records available.');
    });
});

describe('GridComponent master detail', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent, DetailTemplateDirective],
        template: `
            <smart-grid
                [data]="data"
                [pageable]="true"
                [pageSize]="3"
                [detailExpandBy]="'id'"
                (detailExpand)="lastExpand = $event"
                (detailCollapse)="lastCollapse = $event"
            >
                <smart-grid-column field="id" title="ID"></smart-grid-column>
                <smart-grid-column field="name" title="Name"></smart-grid-column>
                <ng-template smartGridDetailTemplate let-dataItem>
                    DETAIL: {{ dataItem.name }} ({{ dataItem.id }})
                </ng-template>
            </smart-grid>
        `,
    })
    class DetailHostComponent {
        public data = [
            { id: 1, name: 'alpha' },
            { id: 2, name: 'beta' },
            { id: 3, name: 'gamma' },
            { id: 4, name: 'delta' },
            { id: 5, name: 'epsilon' },
        ];
        public lastExpand: any;
        public lastCollapse: any;
    }

    let fixture: ComponentFixture<DetailHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [DetailHostComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(DetailHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('có detail template → render hierarchy header + expand button mỗi row, chưa có detail row', () => {
        expect(fixture.nativeElement.querySelectorAll('thead th.k-hierarchy-cell').length).toBe(1);
        const buttons = fixture.nativeElement.querySelectorAll('button.k-hierarchy-expand');
        expect(buttons.length).toBe(3);
        expect(fixture.nativeElement.querySelectorAll('tr.k-detail-row').length).toBe(0);
    });

    it('click expand → render detail row (template context) + emit detailExpand', () => {
        const button = fixture.nativeElement.querySelector('button.k-hierarchy-expand');
        button.click();
        fixture.detectChanges();

        const detailRows = fixture.nativeElement.querySelectorAll('tr.k-detail-row');
        expect(detailRows.length).toBe(1);
        expect(detailRows[0].textContent).toContain('DETAIL: alpha (1)');
        expect(fixture.componentInstance.lastExpand).toEqual({ dataItem: { id: 1, name: 'alpha' }, index: 0, expand: true });
    });

    it('click 2 lần → collapse + emit detailCollapse', () => {
        const button = fixture.nativeElement.querySelector('button.k-hierarchy-expand');
        button.click();
        fixture.detectChanges();
        button.click();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('tr.k-detail-row').length).toBe(0);
        expect(fixture.componentInstance.lastCollapse).toEqual({
            dataItem: { id: 1, name: 'alpha' },
            index: 0,
            expand: false,
        });
    });

    it('detailExpandBy: state giữ theo key qua paging (expand id=1 → page 2 không bị nhầm)', async () => {
        const button = fixture.nativeElement.querySelector('button.k-hierarchy-expand');
        button.click();
        fixture.detectChanges();

        const next = fixture.nativeElement.querySelector('.k-pager-next');
        next.click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('tr.k-detail-row').length).toBe(0);

        const prev = fixture.nativeElement.querySelector('.k-pager-prev');
        prev.click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('tr.k-detail-row').length).toBe(1);
        expect(fixture.nativeElement.querySelector('tr.k-detail-row').textContent).toContain('DETAIL: alpha (1)');
    });

    it('isDetailExpanded (controlled): state do function quyết định, click vẫn emit nhưng không tự toggle', async () => {
        await TestBed.resetTestingModule();
        @Component({
            standalone: true,
            imports: [GridComponent, ColumnComponent, DetailTemplateDirective],
            template: `
                <smart-grid [data]="data" [isDetailExpanded]="expandedFn" (detailExpand)="lastExpand = $event" (detailCollapse)="lastCollapse = $event">
                    <smart-grid-column field="id" title="ID"></smart-grid-column>
                    <ng-template smartGridDetailTemplate let-dataItem>
                        DETAIL: {{ dataItem.id }}
                    </ng-template>
                </smart-grid>
            `,
        })
        class ControlledHostComponent {
            public data = [{ id: 1, name: 'alpha' }];
            public lastExpand: any;
            public lastCollapse: any;
            public expandedFn = (d: any) => d.id === 1;
        }

        await TestBed.configureTestingModule({ imports: [ControlledHostComponent] }).compileComponents();
        const cf = TestBed.createComponent(ControlledHostComponent);
        cf.detectChanges();
        await cf.whenStable();
        cf.detectChanges();

        expect(cf.nativeElement.querySelectorAll('tr.k-detail-row').length).toBe(1);

        const button = cf.nativeElement.querySelector('button.k-hierarchy-expand');
        button.click();
        cf.detectChanges();

        expect(cf.componentInstance.lastCollapse).toEqual({ dataItem: { id: 1, name: 'alpha' }, index: 0, expand: false });
        expect(cf.nativeElement.querySelectorAll('tr.k-detail-row').length).toBe(1);
    });
});

describe('GridComponent filter row', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent],
        template: `
            <smart-grid
                [data]="data"
                [filterable]="'row'"
                (filterChange)="lastFilter = $event"
                (dataStateChange)="lastState = $event"
            >
                <smart-grid-column field="id" title="ID"></smart-grid-column>
                <smart-grid-column field="name" title="Name"></smart-grid-column>
            </smart-grid>
        `,
    })
    class FilterHostComponent {
        public data = [
            { id: 1, name: 'alpha' },
            { id: 2, name: 'beta' },
            { id: 3, name: 'gamma' },
            { id: 4, name: 'delta' },
            { id: 5, name: 'epsilon' },
        ];
        public lastFilter: CompositeFilterDescriptor | undefined;
        public lastState: DataStateChangeEvent | undefined;
    }

    let fixture: ComponentFixture<FilterHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [FilterHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(FilterHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('filterable row → render .k-filter-row với 1 input mỗi cột (field != undefined)', () => {
        const row = fixture.nativeElement.querySelector('tr.k-filter-row');
        expect(row).not.toBeNull();
        expect(row.querySelectorAll('input.k-input').length).toBe(2);
    });

    it('gõ vào input → emit filterChange (contains) + dataStateChange.filter + lọc client-side', async () => {
        const input = fixture.nativeElement.querySelectorAll('tr.k-filter-row input.k-input')[1];
        input.value = 'alpha';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastFilter).toEqual({
            logic: 'and',
            filters: [{ field: 'name', operator: 'contains', value: 'alpha' }],
        });
        expect(fixture.componentInstance.lastState?.filter).toEqual(
            fixture.componentInstance.lastFilter
        );
        const rows = fixture.nativeElement.querySelectorAll('tbody tr.k-master-row');
        expect(rows.length).toBe(1);
        expect(rows[0].textContent).toContain('alpha');
    });

    it('cột số → operator eq; xóa giá trị → xóa filter, full rows trở lại', async () => {
        const inputs = fixture.nativeElement.querySelectorAll('tr.k-filter-row input.k-input');
        inputs[0].value = '3';
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastFilter).toEqual({
            logic: 'and',
            filters: [{ field: 'id', operator: 'eq', value: 3 }],
        });
        expect(fixture.nativeElement.querySelectorAll('tbody tr.k-master-row').length).toBe(1);

        inputs[0].value = '';
        inputs[0].dispatchEvent(new Event('input', { bubbles: true }));
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastFilter).toEqual({ logic: 'and', filters: [] });
        expect(fixture.nativeElement.querySelectorAll('tbody tr.k-master-row').length).toBe(5);
    });
});

describe('GridComponent selection (checkbox)', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent],
        template: `
            <smart-grid
                [data]="data"
                [selectable]="selectable"
                (selectionChange)="lastSelection = $event"
            >
                <smart-grid-column field="id" title="ID"></smart-grid-column>
                <smart-grid-column field="name" title="Name"></smart-grid-column>
            </smart-grid>
        `,
    })
    class SelectHostComponent {
        public data = [
            { id: 1, name: 'alpha' },
            { id: 2, name: 'beta' },
            { id: 3, name: 'gamma' },
        ];
        public selectable: boolean | { enabled: boolean; mode: 'single' | 'multiple' } = true;
        public lastSelection: any;
    }

    let fixture: ComponentFixture<SelectHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [SelectHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(SelectHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('selectable → render checkbox header + checkbox mỗi row', () => {
        expect(fixture.nativeElement.querySelectorAll('thead th.k-checkbox-cell').length).toBe(1);
        expect(fixture.nativeElement.querySelectorAll('tbody td.k-checkbox-cell input.k-checkbox').length).toBe(3);
    });

    it('click checkbox row → emit selectionChange selectedRows chứa dataItem', async () => {
        const checkbox = fixture.nativeElement.querySelectorAll('tbody td.k-checkbox-cell input.k-checkbox')[1];
        checkbox.click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastSelection.selectedRows.length).toBe(1);
        expect(fixture.componentInstance.lastSelection.selectedRows[0].dataItem).toEqual({ id: 2, name: 'beta' });
        expect(fixture.componentInstance.lastSelection.deselectedRows.length).toBe(0);
        expect(fixture.nativeElement.querySelector('thead th.k-checkbox-cell input.k-checkbox').indeterminate).toBe(true);
    });

    it('click header checkbox → select tất cả rows + emit 3 selected (multi mode)', async () => {
        const header = fixture.nativeElement.querySelector('thead th.k-checkbox-cell input.k-checkbox');
        header.click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastSelection.selectedRows.length).toBe(3);
        expect(header.checked).toBe(true);
        const boxes = fixture.nativeElement.querySelectorAll('tbody td.k-checkbox-cell input.k-checkbox');
        expect((boxes[0] as HTMLInputElement).checked).toBe(true);
        expect((boxes[2] as HTMLInputElement).checked).toBe(true);
    });

    it('single mode: chọn row mới → deselected row cũ', async () => {
        fixture.componentInstance.selectable = { enabled: true, mode: 'single' };
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const boxes = fixture.nativeElement.querySelectorAll('tbody td.k-checkbox-cell input.k-checkbox');
        boxes[0].click();
        await fixture.whenStable();
        fixture.detectChanges();
        boxes[1].click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastSelection.selectedRows[0].dataItem).toEqual({ id: 2, name: 'beta' });
        expect(fixture.componentInstance.lastSelection.deselectedRows[0].dataItem).toEqual({ id: 1, name: 'alpha' });
    });
});

describe('GridComponent resizable columns', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent],
        template: `
            <smart-grid [data]="data" [resizable]="true">
                <smart-grid-column field="id" title="ID" [width]="80"></smart-grid-column>
                <smart-grid-column field="name" title="Name" [width]="100"></smart-grid-column>
            </smart-grid>
        `,
    })
    class ResizeHostComponent {
        public data = [
            { id: 1, name: 'alpha' },
            { id: 2, name: 'beta' },
        ];
    }

    let fixture: ComponentFixture<ResizeHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [ResizeHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(ResizeHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('resizable → render .k-resize-handle mỗi cột + colgroup width ban đầu', () => {
        expect(fixture.nativeElement.querySelectorAll('span.k-resize-handle').length).toBe(2);
        const col = fixture.nativeElement.querySelectorAll('colgroup col')[0];
        expect(col.style.width).toBe('80px');
    });

    it('drag handle → col.width cập nhật theo delta + colgroup re-render', async () => {
        const handle = fixture.nativeElement.querySelectorAll('span.k-resize-handle')[1];
        handle.dispatchEvent(new MouseEvent('mousedown', { clientX: 100, bubbles: true }));
        document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }));
        document.dispatchEvent(new MouseEvent('mouseup'));
        await fixture.whenStable();
        fixture.detectChanges();

        const col = fixture.nativeElement.querySelectorAll('colgroup col')[1];
        expect(col.style.width).toBe('150px');
    });
});

describe('GridComponent grouping render', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent],
        template: `
            <smart-grid
                [data]="data"
                [groupable]="true"
                [group]="group"
                (groupChange)="lastGroup = $event"
                (groupCollapse)="lastCollapse = $event"
                (groupExpand)="lastExpand = $event"
            >
                <smart-grid-column field="id" title="ID"></smart-grid-column>
                <smart-grid-column field="cat" title="Category"></smart-grid-column>
            </smart-grid>
        `,
    })
    class GroupHostComponent {
        public data = [
            { id: 1, name: 'alpha', cat: 'A' },
            { id: 2, name: 'beta', cat: 'B' },
            { id: 3, name: 'gamma', cat: 'A' },
            { id: 4, name: 'delta', cat: 'B' },
            { id: 5, name: 'epsilon', cat: 'A' },
        ];
        public group: GroupDescriptor[] = [{ field: 'cat', dir: 'asc' }];
        public lastGroup: GroupDescriptor[] | undefined;
        public lastCollapse: any;
        public lastExpand: any;
    }

    let fixture: ComponentFixture<GroupHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [GroupHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(GroupHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('group active → render .k-grouping-row (value + count) + master rows của từng nhóm', () => {
        const groupRows = fixture.nativeElement.querySelectorAll('tr.k-grouping-row');
        expect(groupRows.length).toBe(2);
        expect(groupRows[0].textContent).toContain('A');
        expect(groupRows[0].textContent).toContain('(3)');
        expect(groupRows[1].textContent).toContain('B');
        expect(groupRows[1].textContent).toContain('(2)');
        expect(fixture.nativeElement.querySelectorAll('tbody tr.k-master-row').length).toBe(5);
    });

    it('click group toggle → collapse: master rows của nhóm A ẩn + emit groupCollapse; click lại → expand', async () => {
        const toggle = fixture.nativeElement.querySelector('button.k-group-toggle');
        toggle.click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('tbody tr.k-master-row').length).toBe(2);
        expect(fixture.componentInstance.lastCollapse.group.value).toBe('A');

        toggle.click();
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('tbody tr.k-master-row').length).toBe(5);
        expect(fixture.componentInstance.lastExpand.group.value).toBe('A');
    });
});

describe('GridComponent grouping with aggregates footer', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent],
        template: `
            <smart-grid [data]="data" [groupable]="true" [group]="[{ field: 'cat', dir: 'asc', aggregates: [{ field: 'id', aggregate: 'count' }] }]">
                <smart-grid-column field="id" title="ID"></smart-grid-column>
                <smart-grid-column field="cat" title="Category"></smart-grid-column>
            </smart-grid>
        `,
    })
    class GroupAggHostComponent {
        public data = [
            { id: 1, name: 'alpha', cat: 'A' },
            { id: 2, name: 'beta', cat: 'B' },
            { id: 3, name: 'gamma', cat: 'A' },
            { id: 4, name: 'delta', cat: 'B' },
        ];
    }

    let fixture: ComponentFixture<GroupAggHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [GroupAggHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(GroupAggHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('aggregates trong group descriptor → render .k-group-footer với per-column aggregate', () => {
        const footers = fixture.nativeElement.querySelectorAll('tr.k-group-footer');
        expect(footers.length).toBe(2);
        const idCells = fixture.nativeElement.querySelectorAll('tr.k-group-footer td.k-table-td');
        expect(idCells[0].textContent).toContain('Count: 2');
        expect(idCells[2].textContent).toContain('Count: 2');
    });
});

describe('GridComponent column menu', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent],
        template: `
            <smart-grid
                [data]="data"
                [columnMenu]="true"
                (sortChange)="lastSort = $event"
            >
                <smart-grid-column field="id" title="ID"></smart-grid-column>
                <smart-grid-column field="name" title="Name"></smart-grid-column>
            </smart-grid>
        `,
    })
    class MenuHostComponent {
        public data = [
            { id: 1, name: 'alpha' },
            { id: 2, name: 'beta' },
            { id: 3, name: 'gamma' },
        ];
        public lastSort: SortDescriptor[] | undefined;
    }

    let fixture: ComponentFixture<MenuHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [MenuHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(MenuHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('columnMenu → render .k-column-menu-button mỗi cột; click → dropdown mở', async () => {
        expect(fixture.nativeElement.querySelectorAll('button.k-column-menu-button').length).toBe(2);
        const btn = fixture.nativeElement.querySelectorAll('button.k-column-menu-button')[1];
        btn.click();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.k-column-menu')).not.toBeNull();
        expect(fixture.nativeElement.querySelectorAll('button.k-column-menu-item').length).toBe(2);
        expect(fixture.nativeElement.querySelectorAll('.k-column-menu label.k-column-menu-item').length).toBe(2);
    });

    it('click "Sort ascending" trong menu → emit sortChange + menu đóng', async () => {
        const btn = fixture.nativeElement.querySelectorAll('button.k-column-menu-button')[1];
        btn.click();
        fixture.detectChanges();
        fixture.nativeElement.querySelectorAll('button.k-column-menu-item')[0].click();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastSort).toEqual([{ field: 'name', dir: 'asc' }]);
        expect(fixture.nativeElement.querySelector('.k-column-menu')).toBeNull();
    });

    it('checkbox ẩn cột trong menu → cột biến mất khỏi header + body', async () => {
        const btn = fixture.nativeElement.querySelectorAll('button.k-column-menu-button')[1];
        btn.click();
        fixture.detectChanges();
        const box = fixture.nativeElement.querySelectorAll('.k-column-menu label.k-column-menu-item input.k-checkbox')[1];
        box.click();
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelectorAll('thead th').length).toBe(1);
        expect(fixture.nativeElement.querySelectorAll('tbody tr:first-child td').length).toBe(1);
        expect(fixture.nativeElement.textContent).not.toContain('Name');
    });
});

describe('GridComponent inline editing', () => {
    @Component({
        standalone: true,
        imports: [GridComponent, ColumnComponent],
        template: `
            <smart-grid
                [data]="data"
                [editable]="true"
                (cellChange)="lastChange = $event"
                (cellClose)="lastClose = $event"
            >
                <smart-grid-column field="id" title="ID"></smart-grid-column>
                <smart-grid-column field="name" title="Name"></smart-grid-column>
            </smart-grid>
        `,
    })
    class EditHostComponent {
        public data = [
            { id: 1, name: 'alpha' },
            { id: 2, name: 'beta' },
        ];
        public lastChange: any;
        public lastClose: any;
    }

    let fixture: ComponentFixture<EditHostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({ imports: [EditHostComponent] }).compileComponents();
        fixture = TestBed.createComponent(EditHostComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('dblclick cell → render input .k-editable-cell chứa giá trị hiện tại', async () => {
        const cell = fixture.nativeElement.querySelectorAll('tbody td.k-table-td')[1];
        cell.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input.k-editable-cell');
        expect(input).not.toBeNull();
        expect(input.value).toBe('alpha');
    });

    it('sửa + Enter → commit: dataItem cập nhật + emit cellChange; input biến mất', async () => {
        const cell = fixture.nativeElement.querySelectorAll('tbody td.k-table-td')[1];
        cell.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input.k-editable-cell');
        input.value = 'ALPHA!';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        await fixture.whenStable();
        fixture.detectChanges();

        expect(fixture.componentInstance.lastChange).toEqual({
            dataItem: { id: 1, name: 'ALPHA!' },
            field: 'name',
            value: 'ALPHA!',
        });
        expect(fixture.componentInstance.data[0].name).toBe('ALPHA!');
        expect(fixture.nativeElement.querySelector('input.k-editable-cell')).toBeNull();
        expect(fixture.nativeElement.textContent).toContain('ALPHA!');
    });

    it('Escape → cancel: không emit cellChange, giá trị giữ nguyên', async () => {
        const cell = fixture.nativeElement.querySelectorAll('tbody td.k-table-td')[1];
        cell.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
        fixture.detectChanges();

        const input = fixture.nativeElement.querySelector('input.k-editable-cell');
        input.value = 'X';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        fixture.detectChanges();

        expect(fixture.componentInstance.lastChange).toBeUndefined();
        expect(fixture.componentInstance.data[0].name).toBe('alpha');
        expect(fixture.nativeElement.querySelector('input.k-editable-cell')).toBeNull();
        expect(fixture.nativeElement.textContent).toContain('alpha');
    });
});