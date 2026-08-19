import { DataResult } from '../query/types';

/**
 * The data type that is expected by the Grid (SPEC §6 DataResult).
 * `data` có thể là toàn bộ records (total = data.length) hoặc 1 trang
 * (page data + total thật từ server).
 */
export interface GridDataResult extends DataResult {}

const isGridDataResult = (source: GridDataResult | any[]): source is GridDataResult =>
    Array.isArray(source) === false;

/** @hidden — iterator nội bộ (khớp contract .d.ts DataResultIterator) */
export class DataResultIterator {
    private source: GridDataResult | any[];
    private isGridDataResultFlag: boolean;

    constructor(source: GridDataResult | any[], skip: number = 0) {
        this.source = source;
        this.isGridDataResultFlag = isGridDataResult(source);
        // skip áp cho data thực bên trong GridDataResult/array
        this.source = this.isGridDataResultFlag
            ? { data: (source as GridDataResult).data.slice(skip), total: (source as GridDataResult).total }
            : (source as any[]).slice(skip);
    }

    get total(): number {
        return this.isGridDataResultFlag
            ? (this.source as GridDataResult).total
            : (this.source as any[]).length;
    }

    get data(): any[] {
        return this.isGridDataResultFlag ? (this.source as GridDataResult).data : (this.source as any[]);
    }

    map(fn: (item: any, index: number, array: any[]) => any): any[] {
        return this.data.map(fn);
    }

    filter(fn: (item: any, index: number, array: any[]) => boolean): any[] {
        return this.data.filter(fn);
    }

    reduce(fn: (prev: any, cur: any, index: number, array: any[]) => any, init: any): any {
        return this.data.reduce(fn, init);
    }

    forEach(fn: (item: any, index: number, array: any[]) => void): void {
        this.data.forEach(fn);
    }

    some(fn: (value: any, index: number, array: any[]) => boolean): boolean {
        return this.data.some(fn);
    }

    toString(): string {
        return this.data.toString();
    }
}

/**
 * DataCollection — wrapper read-only quanh iterator (khớp contract .d.ts,
 * dùng làm data source cho grid rendering / virtualization).
 */
export class DataCollection {
    constructor(private accessor: () => DataResultIterator) {}

    get total(): number {
        return this.accessor().total;
    }

    get length(): number {
        return this.accessor().data.length;
    }

    get first(): any {
        return this.accessor().data[0];
    }

    get last(): any {
        const data = this.accessor().data;
        return data[data.length - 1];
    }

    at(index: number): any {
        return this.accessor().data[index];
    }

    map(fn: (item: any, index: number, array: any[]) => any): any[] {
        return this.accessor().map(fn);
    }

    filter(fn: (item: any, index: number, array: any[]) => boolean): any[] {
        return this.accessor().filter(fn);
    }

    reduce(fn: (prev: any, cur: any, index: number, array: any[]) => any, init: any): any {
        return this.accessor().reduce(fn, init);
    }

    forEach(fn: (item: any, index: number, array: any[]) => void): void {
        this.accessor().forEach(fn);
    }

    some(fn: (value: any, index: number, array: any[]) => boolean): boolean {
        return this.accessor().some(fn);
    }

    toString(): string {
        return this.accessor().toString();
    }
}

/** Tiện ích: tạo DataCollection từ data source + vị trí skip. */
export function toCollection(data: GridDataResult | any[], skip: number = 0): DataCollection {
    return new DataCollection(() => new DataResultIterator(data, skip));
}