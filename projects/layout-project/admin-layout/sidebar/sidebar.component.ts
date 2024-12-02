import { Component } from '@angular/core';
import { SIDEBAR_ITEM_ADMIN } from '@project/layout-project/data/sidebar-admin.data';

@Component({
    selector: 'app-sidebar-admin',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    isCollapsed = false;
    sidebar = SIDEBAR_ITEM_ADMIN;

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }
}
