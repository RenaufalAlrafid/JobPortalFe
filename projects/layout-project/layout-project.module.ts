import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SidebarModule } from 'primeng/sidebar';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NavbarMenuComponent } from './admin-layout/navbar/navbar-menu/navbar-menu.component';
import { NavbarComponent } from './admin-layout/navbar/navbar.component';
import { SidebarMenuComponent } from './admin-layout/sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarComponent } from './admin-layout/sidebar/sidebar.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { ProfileLayoutComponent } from './profile-layout/profile-layout.component';
import { SidebarMenuProfileComponent } from './profile-layout/sidebar-menu/sidebar-menu.component';

@NgModule({
    declarations: [
        AuthLayoutComponent,
        AdminLayoutComponent,
        NavbarComponent,
        SidebarComponent,
        SidebarMenuComponent,
        NavbarMenuComponent,
        ProfileLayoutComponent,
        SidebarMenuProfileComponent,
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
