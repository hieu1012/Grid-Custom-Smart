import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';
import { CellTemplateDirective } from '../rendering/cell-template.directive';
import { HeaderTemplateDirective } from '../rendering/header-template.directive';
import { FooterTemplateDirective } from '../rendering/footer-template.directive';
import { ColumnSortSettings } from '../query/types';

/**
 * ColumnBase — 18 @Input binding chung cho mọi loại cột
 * (SPEC §3.1). KHÔNG có selector riêng; dùng làm base directive cho
 * ColumnComponent và các column type khác (group/checkbox/command/span — v1.1).
 * Không abstract để `autoGenerateColumns` có thể `new ColumnBase()` tạo cột động.
 */
@Directive({ standalone: true })
export class ColumnBase {
    public isGenerated = false;
    /**
     * Tiêu đề cột hiển thị trên header cell.
     */
    @Input() public title: string | undefined;

    /**
     * Chiều rộng cột (px hoặc chuỗi CSS).
     */
    @Input() public width: number | string | undefined;

    /**
     * Ẩn/hiện cột.
     */
    @Input() public hidden = false;

    /**
     * Cột cố định (locked) — behavior hoàn chỉnh ở v1.1 (locked columns).
     */
    @Input() public locked = false;

    /**
     * Cho phép cột bị lock/unlock khi bật locked columns (v1.1).
     */
    @Input() public lockable = false;

    /**
     * Cho phép resize cột (v1.1).
     */
    @Input() public resizable = true;

    /**
     * Cho phép reorder cột (v1.1).
     */
    @Input() public reorderable = true;

    /**
     * Tự resize theo nội dung (v1.1).
     */
    @Input() public autoSize = false;

    /**
     * Chiều rộng tối thiểu khi resize (px).
     */
    @Input() public minResizableWidth = 10;

    /**
     * Media query để responsive ẩn/hiện cột (v1.1).
     */
    @Input() public media: string | undefined;

    /**
     * Cột xuất hiện trong column menu / column chooser (v1.2).
     */
    @Input() public columnMenu = true;

    /**
     * Cột xuất hiện trong column chooser.
     */
    @Input() public includeInChooser = true;

    /**
     * CSS class cho cell — template attribute binding là `[class]`
     * (ɵdir map `"cssClass":"class"`).
     */
    @Input() public cssClass: string | undefined;

    /**
     * CSS class cho header cell.
     */
    @Input() public headerClass: string | undefined;

    /**
     * CSS class cho footer cell.
     */
    @Input() public footerClass: string | undefined;

    /**
     * Inline style cho cell — object (vd `{ 'text-align': 'right' }`).
     */
    @Input() public style: { [key: string]: string } | undefined;

    /**
     * Inline style cho header cell.
     */
    @Input() public headerStyle: { [key: string]: string } | undefined;

    /**
     * Inline style cho footer cell.
     */
    @Input() public footerStyle: { [key: string]: string } | undefined;

    /* ── field & sortable: ghi đè ở cột concrete (ColumnComponent) ── */

    /** Field của cột (chiếu vào dataItem). */
    public field: string | undefined = undefined;

    /** Cho phép sort theo cột này. */
    public sortable: boolean | ColumnSortSettings = true;

    /** Filterable của riêng cột. */
    public filterable: boolean = true;

    /* ── Templates (content children) ── */

    @ContentChild(CellTemplateDirective)
    protected cellTemplateDirective: CellTemplateDirective | undefined;

    @ContentChild(HeaderTemplateDirective)
    protected headerTemplateDirective: HeaderTemplateDirective | undefined;

    @ContentChild(FooterTemplateDirective)
    protected footerTemplateDirective: FooterTemplateDirective | undefined;

    /** TemplateRef của cell template (nếu có `<ng-template kendoGridCellTemplate>`). */
    public get cellTemplateRef(): TemplateRef<any> | null {
        return this.cellTemplateDirective?.templateRef ?? null;
    }

    /** TemplateRef của header template (nếu có). */
    public get headerTemplateRef(): TemplateRef<any> | null {
        return this.headerTemplateDirective?.templateRef ?? null;
    }

    /** TemplateRef của footer template (nếu có `<ng-template kendoGridFooterTemplate>`). */
    public get footerTemplateRef(): TemplateRef<any> | null {
        return this.footerTemplateDirective?.templateRef ?? null;
    }

    /* ── Layout helpers ── */

    /** colspan của header cell (column group > 1). */
    public get colspan(): number {
        return 1;
    }

    /** Là column group (`kendo-grid-column-group`)? */
    public isColumnGroup(): boolean {
        return false;
    }

    /** Là span column (`kendo-grid-span-column`)? */
    public isSpanColumn(): boolean {
        return false;
    }

    /** Là command column (`kendo-grid-command-column`)? */
    public isCommandColumn(): boolean {
        return false;
    }

    /** Là checkbox column (`kendo-grid-checkbox-column`)? */
    public isCheckboxColumn(): boolean {
        return false;
    }

    /** Là radio column (`kendo-grid-radio-column`)? */
    public isRadioColumn(): boolean {
        return false;
    }
}