import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Login } from '../model/login.model';
import { MessageBoxService } from '@core/service/message-box.service';
import { AuthenticationService } from '../../../src/app/core/service/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    formReady: FormGroup;
    constructor(
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder,
        private msg: MessageBoxService,
        private authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.checkToken();
        this.createForm();
    }

    checkToken() {
        const token = this.authenticationService.getToken();
        if (token) {
            this.router.navigateByUrl('/redirect');
        }
    }

    createForm() {
        this.formReady = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    onRegister() {
        this.router.navigateByUrl('/auth/register');
    }

    onSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const request: Login = this.formReady.getRawValue();
            this.authService.login(request).subscribe({
                next: (res) => {
                    let token = JSON.parse(res);
                    token = token.data.token;
                    this.msg.showSuccess('Login successful', null, false);
                    this.authService.addToken(token);
                    this.router.navigateByUrl('/redirect');
                },
                error: (err) => {
                    let error = JSON.parse(err);
                    const code = error.code;
                    error = error.errors.reason[0];
                    this.msg.showError(error, 'Login Failed');
                    if (code === 403) {
                        this.onRedirectVerify(request.username);
                    }
                },
            });
        }
    }

    onRedirectVerify(username: string) {
        this.authService.getEmailForVerify(username).subscribe({
            next: (res) => {
                const email = res.data.email;
                setTimeout(() => {
                    this.router.navigateByUrl(`auth/${email}/verification`);
                }, 1000);
            },
            error: (err) => {
                let error = JSON.parse(err);
                error = error.errors.reason[0];
                this.msg.showError(error, 'Register');
            },
        });
    }
}
