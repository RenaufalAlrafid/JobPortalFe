import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [DashboardAdminComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        RouterModule,
        ConfirmDialogModule,
        DialogModule,
    ],
})
export class AdminModule {}
