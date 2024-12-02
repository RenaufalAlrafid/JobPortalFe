import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocationListComponent } from './location-list/location-list.component';
import { LocationRoutingModule } from './location-routing.module';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { PasswordModule } from 'primeng/password';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [LocationListComponent],
    imports: [
        CommonModule,
        LocationRoutingModule,
        SharedComponentModule,
        BreadcrumbModule,
        PasswordModule,
        ConfirmDialogModule,
        DialogModule,
    ],
})
export class LocationModule {}
