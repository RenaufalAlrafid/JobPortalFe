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

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.getUserData();
    }

    getUserData() {
        this.authService.getLogin().subscribe({
            next: (res) => {
                this.fullName = res.data.fullName;
                this.photoUrl = res.data.photoUrl;
            },
            error: (error) => {
                console.log('Error retrieving user data', error);
            },
        });
    }
}
