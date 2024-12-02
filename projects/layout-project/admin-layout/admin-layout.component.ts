import { Component } from '@angular/core';
import { AuthService } from '@project/authentication/service/auth.service';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
    fullName: string = '';
    photoUrl: string = null;
    isSidebarCollapsed: boolean = false;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.getUserData();
    }

    getUserData() {
        this.authService.getLogin().subscribe({
            next: (res) => {
                // console.log(res.data);
                this.fullName = res.data.fullName;
                this.photoUrl = res.data.urlPhoto;
            },
            error: (error) => {
                console.log('Error retrieving user data', error);
            },
        });
    }
    onSidebarCollapseChange(isCollapsed: boolean) {
        this.isSidebarCollapsed = isCollapsed;
    }
}
