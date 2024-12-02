import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { JobDetailComponent } from './job-detail/job-detail.component';

@NgModule({
    declarations: [JobListComponent, JobDetailComponent],
    imports: [
        CommonModule,
        JobRoutingModule,
        SharedComponentModule,
        BreadcrumbModule,
        PasswordModule,
        ConfirmDialogModule,
        DialogModule,
    ],
})
export class JobModule {}
