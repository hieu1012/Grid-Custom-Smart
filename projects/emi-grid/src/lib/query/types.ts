/**
 * Types tương đương API của `@progress/kendo-data-query` (clean-room).
 * Contract chốt từ SPEC.md §6 (đã verify chéo 3 agents vs .d.ts).
 */

export type SortOrder = 'asc' | 'desc';

export interface SortDescriptor {
    field: string;
    dir?: SortOrder;
}

/** 16 string values khớp enum Kendo (SPEC §5.3) */
export enum FilterOperator {
    Contains = 'contains',
    DoesNotContain = 'doesnotcontain',
    DoesNotEndWith = 'doesnotendwith',
    DoesNotStartWith = 'doesnotstartwith',
    EndsWith = 'endswith',
    EqualTo = 'eq',
    GreaterThan = 'gt',
    GreaterThanOrEqual = 'gte',
    IsEmpty = 'isempty',
    IsNotEmpty = 'isnotempty',
    IsNotNull = 'isnotnull',
    IsNull = 'isnull',
    LessThan = 'lt',
    LessThanOrEqual = 'lte',
    NotEqualTo = 'neq',
    StartsWith = 'startswith',
}

export type FilterOperatorType = FilterOperator | string | Function;

export interface FilterDescriptor {
    field?: string | Function;
    operator: FilterOperatorType;
    value?: any;
    ignoreCase?: boolean;
}

export interface CompositeFilterDescriptor {
    logic: 'or' | 'and';
    filters: Array<FilterDescriptor | CompositeFilterDescriptor>;
}

export type Filter = CompositeFilterDescriptor;

export interface AggregateDescriptor {
    field: string;
    aggregate: 'count' | 'sum' | 'average' | 'min' | 'max';
}

export interface GroupDescriptor {
    field: string;
    dir?: SortOrder;
    aggregates?: AggregateDescriptor[];
}

export interface AggregateResultValue {
    count?: number;
    sum?: number;
    average?: number;
    min?: number;
    max?: number;
}

export interface AggregateResult {
    [fieldName: string]: AggregateResultValue;
}

export interface GroupResult {
    items: Object[];
    aggregates: AggregateResult;
    field: string;
    value: any;
}

export interface DataResult {
    data: any[];
    total: number;
}

export interface State {
    skip?: number;
    take?: number;
    sort?: SortDescriptor[];
    filter?: CompositeFilterDescriptor;
    group?: GroupDescriptor[];
}

/* ── Grid settings types (SPEC §3.1, §5.2, §5.4, §5.5) ─────────────── */

export type ColumnSortSettings = boolean | {
    allowUnsort?: boolean;
    initialDirection?: SortOrder;
};

export type SortSettings = boolean | (ColumnSortSettings & {
    mode?: 'single' | 'multiple';
    showIndexes?: boolean;
});

export type FilterableSettings = boolean | 'row' | 'menu' | 'menu, row';

export interface SelectableSettings {
    enabled?: boolean;
    checkboxOnly?: boolean;
    mode?: 'single' | 'multiple';
    cell?: boolean;
    drag?: boolean;
}

export interface GroupableSettings {
    enabled: boolean;
    emptyText?: string;
    showFooter: boolean;
}

export type ScrollMode = 'none' | 'scrollable' | 'virtual';

export interface PagerSettings {
    buttonCount?: number;
    info?: boolean;
    type?: 'numeric' | 'input';
    pageSizes?: boolean | number[];
    previousNext?: boolean;
}