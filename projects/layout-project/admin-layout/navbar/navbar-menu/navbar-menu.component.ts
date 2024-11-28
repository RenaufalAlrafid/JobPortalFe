import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-navbar-menu-sidebar',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent {
    @Input() link: string;
    @Input() label: string;
    @Input() icon: string;
}
