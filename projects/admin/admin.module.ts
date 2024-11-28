import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardAdminComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [DashboardAdminComponent],
    imports: [CommonModule, AdminRoutingModule, RouterModule],
})
export class AdminModule {}
