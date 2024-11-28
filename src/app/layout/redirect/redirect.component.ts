import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { AuthService } from '@project/authentication/service/auth.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
@Component({
    selector: 'app-redirect',
    templateUrl: './redirect.component.html',
    styleUrls: ['./redirect.component.scss'],
})
export class RedirectComponent implements OnInit {
    token;
    constructor(
        private route: Router,
        private auth: AuthenticationService,
        private authService: AuthService,
        private msg: MessageBoxService
    ) {}

    ngOnInit(): void {
        this.checkToken();
        this.getRole();
    }

    checkToken(): void {
        const token = this.auth.getToken();
        if (!token) {
            this.route.navigateByUrl('/auth/login');
        }
    }

    getRole() {
        this.authService.getLogin().subscribe({
            next: (res) => {
                const role = res.data.role;
                console.log(role);
                this.redirect(role);
            },
            error: (err) => {
                let error = JSON.parse(err).errors.reason[0];
                this.msg.showError(error, 'Login Error');
                this.route.navigateByUrl('/auth/login');
            },
        });
    }

    redirect(role: string) {
        if (role === 'SA') {
            this.route.navigateByUrl('/admin/dashboard');
        } else if (role === 'user') {
            this.route.navigateByUrl('/user');
        } else {
            this.route.navigateByUrl('/auth/login');
        }
    }
}
