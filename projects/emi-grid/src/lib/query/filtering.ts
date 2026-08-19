import { CompositeFilterDescriptor, FilterDescriptor } from './types';
import { getter } from '../utils/getter';

const isString = (value: any): boolean => typeof value === 'string';

const isCompositeFilter = (filter: FilterDescriptor | CompositeFilterDescriptor): filter is CompositeFilterDescriptor =>
    typeof (filter as CompositeFilterDescriptor).logic === 'string' &&
    Array.isArray((filter as CompositeFilterDescriptor).filters);

type OperatorFn = (a: any, b: any, ignoreCase: boolean) => boolean;

const normalize = (value: any, ignoreCase: boolean): any =>
    isString(value) && ignoreCase ? value.toLowerCase() : value;

const eq: OperatorFn = (a, b, ignoreCase) => normalize(a, ignoreCase) === normalize(b, ignoreCase);
const neq: OperatorFn = (a, b, ignoreCase) => !eq(a, b, ignoreCase);
const gt: OperatorFn = (a, b, ignoreCase) => normalize(a, ignoreCase) > normalize(b, ignoreCase);
const gte: OperatorFn = (a, b, ignoreCase) => normalize(a, ignoreCase) >= normalize(b, ignoreCase);
const lt: OperatorFn = (a, b, ignoreCase) => normalize(a, ignoreCase) < normalize(b, ignoreCase);
const lte: OperatorFn = (a, b, ignoreCase) => normalize(a, ignoreCase) <= normalize(b, ignoreCase);

const isnull: OperatorFn = (a) => a === null || a === undefined;
const isnotnull: OperatorFn = (a) => a !== null && a !== undefined;
const isempty: OperatorFn = (a) =>
    a === '' ||
    (Array.isArray(a) && a.length === 0) ||
    (a !== null && typeof a === 'object' && Object.keys(a).length === 0);
const isnotempty: OperatorFn = (a, b, ignoreCase) => !isempty(a, b, ignoreCase);

const startswith: OperatorFn = (a, b, ignoreCase) =>
    isString(a) && isString(b) && normalize(a, ignoreCase).indexOf(normalize(b, ignoreCase)) === 0;
const endswith: OperatorFn = (a, b, ignoreCase) => {
    if (!isString(a) || !isString(b)) {
        return false;
    }
    const na = normalize(a, ignoreCase);
    const nb = normalize(b, ignoreCase);
    return na.lastIndexOf(nb, na.length - nb.length) !== -1;
};
const contains: OperatorFn = (a, b, ignoreCase) =>
    isString(a) && isString(b) && normalize(a, ignoreCase).indexOf(normalize(b, ignoreCase)) !== -1;
const doesnotcontain: OperatorFn = (a, b, ignoreCase) => !contains(a, b, ignoreCase);
const doesnotstartwith: OperatorFn = (a, b, ignoreCase) => !startswith(a, b, ignoreCase);
const doesnotendwith: OperatorFn = (a, b, ignoreCase) => !endswith(a, b, ignoreCase);

const operators: Record<string, OperatorFn> = {
    contains,
    doesnotcontain,
    doesnotendwith,
    doesnotstartwith,
    endswith,
    eq,
    gt,
    gte,
    isempty,
    isnotempty,
    isnotnull,
    isnull,
    lt,
    lte,
    neq,
    startswith,
};

export { operators as filterOperators };

function matchesDescriptor(dataItem: any, filter: FilterDescriptor): boolean {
    const accessor = getter(filter.field as any);
    const value = accessor(dataItem);
    const operator = filter.operator;
    if (operator instanceof Function) {
        return (operator as Function)(value, filter.value, filter.ignoreCase !== false);
    }
    const op = operators[operator as string];
    if (!op) {
        throw new Error(`Unknown filter operator: ${String(operator)}`);
    }
    return op(value, filter.value, filter.ignoreCase !== false);
}

function matchesFilter(dataItem: any, filter: FilterDescriptor | CompositeFilterDescriptor): boolean {
    if (isCompositeFilter(filter)) {
        const predicate = (f: FilterDescriptor | CompositeFilterDescriptor) => matchesFilter(dataItem, f);
        return filter.logic === 'and' ? filter.filters.every(predicate) : filter.filters.some(predicate);
    }
    return matchesDescriptor(dataItem, filter);
}

/** Lọc mảng theo composite filter (and/or, lồng nhau). Không filter → copy nguyên mảng. */
export function filterBy(data: any[], filter?: CompositeFilterDescriptor): any[] {
    if (!filter) {
        return data.slice();
    }
    return data.filter((item) => matchesFilter(item, filter));
}