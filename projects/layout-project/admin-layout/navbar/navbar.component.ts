import { Component, Input } from '@angular/core';
import { SIDEBAR_ITEM_ADMIN } from '@project/layout-project/data/sidebar-admin.data';

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Input() fullName: string;
    @Input() urlPhoto: string;
    sidebarVisible: boolean = false;
    sidebar = SIDEBAR_ITEM_ADMIN;
}
