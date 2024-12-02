import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { VacancyCreateComponent } from './vacancy-create/vacancy-create.component';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { VacancyRoutingModule } from './vacancy-routing.module';
import { VacancyEditComponent } from './vacancy-edit/vacancy-edit.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';

@NgModule({
    declarations: [VacancyListComponent, VacancyCreateComponent, VacancyEditComponent, VacancyDetailComponent],
    imports: [
        CommonModule,
        VacancyRoutingModule,
        SharedComponentModule,
        BreadcrumbModule,
        PasswordModule,
        ConfirmDialogModule,
        DialogModule,
        InputNumberModule,
    ],
})
export class VacancyModule {}
