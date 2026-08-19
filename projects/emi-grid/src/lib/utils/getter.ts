/**
 * Truy cập field lồng nhau ('a.b.c') + field dạng Function — tương đương
 * `getter` của @progress/kendo-common.
 */
export type FieldAccessor = string | Function;

export function getter(field: FieldAccessor): (dataItem: any) => any {
    if (field instanceof Function) {
        return field as (dataItem: any) => any;
    }
    const parts = field.split('.');
    return (dataItem: any): any => {
        let value = dataItem;
        for (const part of parts) {
            if (value == null) {
                return value;
            }
            value = value[part];
        }
        return value;
    };
}

export function getValue(dataItem: any, field: FieldAccessor): any {
    return getter(field)(dataItem);
}