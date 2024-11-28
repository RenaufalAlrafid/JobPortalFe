import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar-menu-admin',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
    @Input() link: string;
    @Input() label: string;
    @Input() icon: string;
    @Input() isCollapsed = false;
}
