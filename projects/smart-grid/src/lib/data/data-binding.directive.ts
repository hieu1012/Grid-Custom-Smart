import { AfterViewInit, Directive, Input, OnDestroy } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { from, isObservable, Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridComponent } from '../grid.component';
import { DataStateChangeEvent } from './change-event-args';
import { GridDataResult } from './grid-data-result';

/**
 * Hàm nạp dữ liệu server-driven: nhận state hiện tại (skip/take/sort/group/filter),
 * trả `Observable<GridDataResult>`, `Promise<GridDataResult>` hoặc `GridDataResult` trực tiếp.
 */
export type DataBindingFetch = (
    state: DataStateChangeEvent
) => Observable<GridDataResult> | Promise<GridDataResult> | GridDataResult;

type DataBindingResult = ReturnType<DataBindingFetch>;

/**
 * Data Binding directive (khớp contract Kendo `kendoGridDataBinding`).
 *
 * Gắn lên `<kendo-grid>` để grid tự fetch khi user thay đổi state (sort/filter/page/group):
 *
 * ```html
 * <kendo-grid [kendoGridDataBinding]="fetchProducts" [pageable]="true"></kendo-grid>
 * ```
 */
@Directive({
    selector: '[smartGridDataBinding], [kendoGridDataBinding]',
    standalone: true,
})
export class DataBindingDirective implements AfterViewInit, OnDestroy {
    /** Hàm fetch dữ liệu (xem `DataBindingFetch`). Alias giữ tương thích với Kendo + branding mới. */
    @Input('kendoGridDataBinding')
    public set kendoGridDataBinding(value: DataBindingFetch | undefined) {
        this.dataBinding = value;
    }
    @Input('smartGridDataBinding')
    public set smartGridDataBinding(value: DataBindingFetch | undefined) {
        this.dataBinding = value;
    }
    public dataBinding: DataBindingFetch | undefined;

    private readonly destroy$ = new Subject<void>();

    constructor(protected grid: GridComponent) {}

    ngAfterViewInit(): void {
        if (!this.dataBinding) {
            return;
        }
        this.rebind(this.grid.getGridState());
        outputToObservable(this.grid.dataStateChange)
            .pipe(takeUntil(this.destroy$))
            .subscribe((state: DataStateChangeEvent) => this.rebind(state));
    }

    /** Kendo-compatible: nạp lại dữ liệu với state hiện tại của grid. */
    public reload(): void {
        this.rebind(this.grid.getGridState());
    }

    protected rebind(state: DataStateChangeEvent): void {
        const result = this.dataBinding?.(state);
        if (result === undefined) {
            return;
        }
        this.toObservable(result)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => this.grid.setData(data));
    }

    private toObservable(result: DataBindingResult): Observable<GridDataResult> {
        if (isObservable(result)) {
            return result;
        }
        if (result instanceof Promise || (typeof result === 'object' && result !== null && 'then' in result)) {
            return from(result as Promise<GridDataResult>);
        }
        return of(result as GridDataResult);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}