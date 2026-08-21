import { orderBy } from './sorting';
import { filterBy } from './filtering';
import { process } from './paging';
import { groupBy } from './grouping';
import { GroupResult } from './types';
import { kendoExpected } from './fixtures/kendo-expected.fixture';

/**
 * Verify logic query của smart-grid KHỚP kendo-data-query 1.6.0.
 * Fixture sinh tự động từ oracle (kendo-data-query thật) — xem
 * fixtures/kendo-expected.fixture.ts header.
 */
describe('smart-grid query — oracle kendo-data-query 1.6.0', () => {
    describe('orderBy', () => {
        for (const c of kendoExpected.sorting) {
            it(`sorting: ${c.name}`, () => {
                expect(orderBy(c.data, c.sort)).toEqual(c.expected);
            });
        }
    });

    describe('filterBy', () => {
        for (const c of kendoExpected.filtering) {
            it(`filtering: ${c.name}`, () => {
                expect(filterBy(c.data, c.filter)).toEqual(c.expected);
            });
        }
    });

    describe('process (paging)', () => {
        for (const c of kendoExpected.paging) {
            it(`paging: ${c.name}`, () => {
                expect(process(c.data, c.state)).toEqual(c.expected);
            });
        }
    });

    describe('edge cases không nằm trong oracle fixture', () => {
        it('filterBy không có filter → copy nguyên mảng, không mutate', () => {
            const data = [{ a: 1 }, { a: 2 }];
            const result = filterBy(data);
            expect(result).toEqual(data);
            expect(result).not.toBe(data);
        });

        it('orderBy không có descriptors → copy nguyên mảng', () => {
            const data = [{ a: 2 }, { a: 1 }];
            expect(orderBy(data)).toEqual(data);
        });

        it('operator dạng Function (custom predicate) được gọi với (value, term, ignoreCase)', () => {
            const data = [{ n: 10 }, { n: 20 }, { n: 30 }];
            const custom = (value: number, term: number) => value % term === 0;
            const result = filterBy(data, {
                logic: 'and',
                filters: [{ field: 'n', operator: custom, value: 20 }],
            });
            expect(result.map((i) => i.n)).toEqual([20]);
        });

        it('unknown operator → throw lỗi rõ ràng', () => {
            expect(() =>
                filterBy([{ a: 1 }], { logic: 'and', filters: [{ field: 'a', operator: 'bogusop', value: 1 }] })
            ).toThrowError(/Unknown filter operator: bogusop/);
        });
    });

    describe('groupBy', () => {
        const DATA = [
            { cat: 'A', price: 10, name: 'x1' },
            { cat: 'A', price: 20, name: 'x2' },
            { cat: 'B', price: 30, name: 'x3' },
            { cat: 'B', price: 40, name: 'x4' },
            { cat: 'A', price: 5, name: 'x5' },
        ];

        it('group 1 cấp theo field, sorted theo dir, giữ thứ tự items trong group', () => {
            const groups = groupBy(DATA, [{ field: 'cat', dir: 'asc' }]);
            expect(groups.length).toBe(2);
            expect(groups[0].field).toBe('cat');
            expect(groups[0].value).toBe('A');
            expect((groups[0].items as any[]).map((i) => i.name)).toEqual(['x1', 'x2', 'x5']);
            expect(groups[1].value).toBe('B');
        });

        it('group không có dir → giữ thứ tự xuất hiện, chỉ gộp nhóm liền kề', () => {
            const groups = groupBy(DATA, [{ field: 'cat' }]);
            expect(groups.length).toBe(3);
            expect(groups.map((g) => g.value)).toEqual(['A', 'B', 'A']);
        });

        it('aggregates count/sum/average/min/max tính đúng trên từng group', () => {
            const groups = groupBy(DATA, [
                {
                    field: 'cat',
                    dir: 'asc',
                    aggregates: [
                        { field: 'price', aggregate: 'count' },
                        { field: 'price', aggregate: 'sum' },
                        { field: 'price', aggregate: 'average' },
                        { field: 'price', aggregate: 'min' },
                        { field: 'price', aggregate: 'max' },
                    ],
                },
            ]);
            expect(groups[0].aggregates['price']).toEqual({ count: 3, sum: 35, average: 35 / 3, min: 5, max: 20 });
            expect(groups[1].aggregates['price']).toEqual({ count: 2, sum: 70, average: 35, min: 30, max: 40 });
        });

        it('group đa cấp (2 levels) → items cấp 2 là GroupResult[]', () => {
            const data = [
                { cat: 'A', sub: 'a1' },
                { cat: 'A', sub: 'a2' },
                { cat: 'A', sub: 'a1' },
                { cat: 'B', sub: 'b1' },
            ];
            const groups = groupBy(data, [
                { field: 'cat', dir: 'asc' },
                { field: 'sub', dir: 'asc' },
            ]);
            expect(groups.length).toBe(2);
            const inner = groups[0].items as GroupResult[];
            expect(inner.length).toBe(2);
            expect(inner[0].value).toBe('a1');
            expect((inner[0].items as any[]).length).toBe(2);
            expect(inner[1].value).toBe('a2');
        });

        it('group không có descriptors → trả data gốc (kendo behavior)', () => {
            expect(groupBy(DATA as any, []) as any).toBe(DATA);
        });
    });

    describe('process với group', () => {
        it('state.group → data là GroupResult[], total = số records sau filter', () => {
            const data = [
                { cat: 'A', price: 10 },
                { cat: 'B', price: 30 },
            ];
            const result = process(data, {
                group: [{ field: 'cat', dir: 'asc' }],
                take: 5,
            });
            expect(result.total).toBe(2);
            expect(Array.isArray(result.data)).toBe(true);
            expect((result.data as GroupResult[])[0].value).toBe('A');
        });
    });
});