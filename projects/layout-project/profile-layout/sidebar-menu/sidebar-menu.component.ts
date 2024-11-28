import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar-menu-profile',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss'],
})
export class SidebarMenuProfileComponent {
    @Input() link: string;
    @Input() label: string;
    @Input() isRoute: boolean = false;
}
