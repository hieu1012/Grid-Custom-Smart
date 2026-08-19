import {
    SortDescriptor,
    GroupDescriptor,
    CompositeFilterDescriptor,
} from '../query/types';

/**
 * Arguments for the `pageChange` event (khớp contract .d.ts — interface, không phải class).
 */
export interface PageChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
}

/**
 * Arguments for the `dataStateChange` event (khớp contract .d.ts).
 */
export interface DataStateChangeEvent {
    /**
     * The number of records to skip.
     */
    skip: number;
    /**
     * The number of records to take.
     */
    take: number;
    /**
     * The sort descriptors by which the data is sorted.
     */
    sort?: Array<SortDescriptor>;
    /**
     * The group descriptors by which the data is grouped.
     */
    group?: Array<GroupDescriptor>;
    /**
     * The filter descriptor by which the data is filtered.
     */
    filter?: CompositeFilterDescriptor;
}