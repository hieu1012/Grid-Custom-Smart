import { AggregateDescriptor, AggregateResult, AggregateResultValue, GroupDescriptor, GroupResult } from './types';
import { getter } from '../utils/getter';
import { orderBy } from './sorting';

/** Tính aggregates (count/sum/average/min/max) cho 1 mảng dữ liệu theo descriptors. */
export function aggregatesFor(descriptors: AggregateDescriptor[], data: any[]): AggregateResult {
    const result: AggregateResult = {};
    for (const descriptor of descriptors) {
        const accessor = getter(descriptor.field);
        let value: AggregateResultValue = {};
        switch (descriptor.aggregate) {
            case 'count':
                value = { count: data.length };
                break;
            case 'sum':
                value = { sum: data.reduce((acc, item) => acc + (Number(accessor(item)) || 0), 0) };
                break;
            case 'average': {
                const sum = data.reduce((acc, item) => acc + (Number(accessor(item)) || 0), 0);
                value = data.length ? { average: sum / data.length } : {};
                break;
            }
            case 'min': {
                const values = data.map(accessor).filter((v) => v !== null && v !== undefined);
                value = values.length ? { min: Math.min(...values) } : {};
                break;
            }
            case 'max': {
                const values = data.map(accessor).filter((v) => v !== null && v !== undefined);
                value = values.length ? { max: Math.max(...values) } : {};
                break;
            }
        }
        result[descriptor.field] = { ...result[descriptor.field], ...value };
    }
    return result;
}

function groupAtLevel(data: any[], groups: GroupDescriptor[], level: number): GroupResult[] | any[] {
    if (!groups.length) {
        return data;
    }
    const group = groups[0];
    const rest = groups.slice(1);
    const sorted = orderBy(data, groups.map((d) => ({ field: d.field, dir: d.dir })));
    const result: GroupResult[] = [];
    let current: GroupResult | undefined;
    let currentItems: any[] = [];

    for (const item of sorted) {
        const value = getter(group.field)(item);
        if (!current || current.value !== value) {
            if (current) {
                current.aggregates = group.aggregates ? aggregatesFor(group.aggregates, currentItems) : {};
                current.items = groupAtLevel(currentItems, rest, level + 1);
            }
            current = { field: group.field, value, items: [], aggregates: {} };
            currentItems = [];
            result.push(current);
        }
        currentItems.push(item);
    }
    if (current) {
        current.aggregates = group.aggregates ? aggregatesFor(group.aggregates, currentItems) : {};
        current.items = groupAtLevel(currentItems, rest, level + 1);
    }
    return result.length ? result : data;
}

/**
 * Group data theo danh sách GroupDescriptor (multi-level) + tính aggregates.
 * Trả về GroupResult[] cho cấp 1 — khớp `groupBy` của kendo-data-query 1.6.0.
 * Descriptor không có `dir` → group value theo thứ tự xuất hiện (orderBy bỏ qua).
 */
export function groupBy(data: any[], groups: GroupDescriptor[]): GroupResult[] {
    if (!groups || groups.length === 0) {
        return data as any;
    }
    return groupAtLevel(data, groups, 0) as GroupResult[];
}