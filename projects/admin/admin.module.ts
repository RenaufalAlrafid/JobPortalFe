import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [DashboardAdminComponent],
    imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
