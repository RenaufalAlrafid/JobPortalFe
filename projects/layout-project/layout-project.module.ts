import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CarouselModule } from 'primeng/carousel';
import { Button, ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NavbarComponent } from './admin-layout/navbar/navbar.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarMenuComponent } from './admin-layout/sidebar/sidebar-menu/sidebar-menu.component';
import { NavbarMenuComponent } from './admin-layout/navbar/navbar-menu/navbar-menu.component';

@NgModule({
    declarations: [
        AuthLayoutComponent,
        AdminLayoutComponent,
        NavbarComponent,
        SidebarComponent,
        SidebarMenuComponent,
        NavbarMenuComponent,
    ],
    imports: [
        CommonModule,
        CarouselModule,
        ButtonModule,
        RouterModule,
        SharedComponentModule,
        NgxSpinnerModule,
        SidebarModule,
        OverlayPanelModule,
    ],
})
export class LayoutProjectModule {}
