import { DataResult, State } from './types';
import { orderBy } from './sorting';
import { filterBy } from './filtering';
import { groupBy } from './grouping';

/**
 * Process data theo State (kendo-data-query `process`):
 *   filter → sort → group → paging
 * Group active → trả GroupResult[] (paging do GridComponent xử lý trên
 * flattened view). take = 0/undefined → không paging (trả toàn bộ).
 */
export function process(data: any[], state: State): DataResult {
    const skip = state.skip || 0;
    const take = state.take || 0;

    let result = data;
    if (state.filter) {
        result = filterBy(result, state.filter);
    }
    if (state.sort && state.sort.length) {
        result = orderBy(result, state.sort);
    }
    const total = result.length;
    if (state.group && state.group.length) {
        return { data: groupBy(result, state.group) as any[], total };
    }
    if (take > 0 && skip < result.length) {
        result = result.slice(skip, skip + take);
    }
    return { data: result, total };
}

/** Cắt trang con từ mảng đã process — dùng khi pager đổi trang. */
export function slicePage(data: any[], skip: number, take: number): any[] {
    return take > 0 ? data.slice(skip, skip + take) : data.slice();
}