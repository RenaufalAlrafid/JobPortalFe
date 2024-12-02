import { Component, Output, EventEmitter } from '@angular/core';
import { SIDEBAR_ITEM_ADMIN } from '@project/layout-project/data/sidebar-admin.data';

@Component({
    selector: 'app-sidebar-admin',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
    @Output() collapseChange = new EventEmitter<boolean>();
    isCollapsed = false;
    sidebar = SIDEBAR_ITEM_ADMIN;

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        this.collapseChange.emit(this.isCollapsed);
    }
}
