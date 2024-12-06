import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@project/authentication/service/auth.service';
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

    constructor(private authService: AuthService, private router: Router) {

    }

    logOut() {
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
    }

    onProfile() {
        this.router.navigateByUrl('/admin/profile');
    }
}
