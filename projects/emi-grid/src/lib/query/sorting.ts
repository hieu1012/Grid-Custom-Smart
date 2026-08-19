import { SortDescriptor } from './types';
import { getter } from '../utils/getter';

const isString = (value: any): boolean => typeof value === 'string';

const isBlank = (value: any): boolean => value === null || value === undefined;

function compareValues(a: any, b: any): number {
    if (a === b || (isBlank(a) && isBlank(b))) {
        return 0;
    }
    if (isBlank(a)) {
        return -1;
    }
    if (isBlank(b)) {
        return 1;
    }
    if (isString(a) && isString(b)) {
        const la = a.toLowerCase();
        const lb = b.toLowerCase();
        if (la === lb) {
            return 0;
        }
        return la < lb ? -1 : 1;
    }
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
}

/**
 * Sort mảng theo danh sách SortDescriptor (multi-key, stable — JS sort
 * ES2019+ đã stable nên phần tử bằng nhau giữ nguyên thứ tự ban đầu).
 *
 * LƯU Ý (khớp oracle kendo-data-query 1.6.0): descriptor KHÔNG có `dir`
 * bị BỎ QUA hoàn toàn (không sort theo nó). Nếu không có descriptor nào
 * có `dir` → trả về copy giữ nguyên thứ tự.
 */
export function orderBy(data: any[], descriptors?: SortDescriptor[]): any[] {
    if (!descriptors) {
        return data.slice();
    }
    const active = descriptors.filter((d) => d.dir !== undefined);
    if (active.length === 0) {
        return data.slice();
    }
    const result = data.slice();
    result.sort((a: any, b: any) => {
        for (const descriptor of active) {
            const accessor = getter(descriptor.field);
            const cmp = compareValues(accessor(a), accessor(b));
            if (cmp !== 0) {
                return descriptor.dir === 'desc' ? -cmp : cmp;
            }
        }
        return 0;
    });
    return result;
}