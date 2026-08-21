import { NgModule } from '@angular/core';

import { GridComponent } from './grid.component';
import { ColumnComponent } from './columns/column.component';
import { ColumnGroupComponent } from './columns/column-group.component';
import { CommandColumnComponent } from './columns/command-column.component';
import { CheckboxColumnComponent } from './columns/checkbox-column.component';
import { RadioColumnComponent } from './columns/radio-column.component';
import { SpanColumnComponent } from './columns/span-column.component';
import { CellTemplateDirective } from './rendering/cell-template.directive';
import { HeaderTemplateDirective } from './rendering/header-template.directive';
import { FooterTemplateDirective } from './rendering/footer-template.directive';
import { NoRecordsTemplateDirective } from './rendering/no-records-template.directive';
import { DetailTemplateDirective } from './rendering/detail-template.directive';
import { SpanCellTemplateDirective } from './rendering/span-cell-template.directive';
import { DataBindingDirective } from './data/data-binding.directive';

const COMPONENTS = [
    GridComponent,
    ColumnComponent,
    ColumnGroupComponent,
    CommandColumnComponent,
    CheckboxColumnComponent,
    RadioColumnComponent,
    SpanColumnComponent,
    CellTemplateDirective,
    HeaderTemplateDirective,
    FooterTemplateDirective,
    NoRecordsTemplateDirective,
    DetailTemplateDirective,
    SpanCellTemplateDirective,
    DataBindingDirective,
];

/**
 * SmartGridModule — import một lần, dùng mọi component/directive của smart-grid.
 *
 * ```ts
 * @Component({
 *     imports: [SmartGridModule],
 *     template: `<smart-grid [data]="items"><smart-grid-column field="name" /></smart-grid>`
 * })
 * export class MyComponent {}
 * ```
 */
@NgModule({
    imports: [...COMPONENTS],
    exports: [...COMPONENTS],
})
export class SmartGridModule {}
