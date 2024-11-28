import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-navbar-admin',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
    @Input() fullName: string;
    @Input() urlPhoto: string;
    sidebarVisible: boolean = false;
}
