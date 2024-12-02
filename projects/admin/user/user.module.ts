import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PasswordModule } from 'primeng/password';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [UserListComponent, UserCreateComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedComponentModule,
        BreadcrumbModule,
        PasswordModule,
        ConfirmDialogModule,
        DialogModule,
        InputSwitchModule,
    ],
})
export class UserModule {}
