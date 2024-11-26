import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { confirmPasswordValidator } from '../validators/confirm-password.validators';
import { AuthService } from '../service/auth.service';
import { Register } from '../model/register.model';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    formReady: FormGroup;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService,
        private msg: MessageBoxService
    ) {}
    ngOnInit() {
        this.createForm();
    }
    onLogin() {
        this.router.navigateByUrl('/auth/login');
    }

    createForm() {
        this.formReady = this.fb.group(
            {
                username: ['', Validators.required],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                fullName: ['', Validators.required],
                nik: ['', Validators.required],
                birthDate: ['', Validators.required],
                genderId: ['', Validators.required],
            },
            {
                validators: confirmPasswordValidator(),
            }
        );
    }

    onSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const rawDate: Date = this.formReady.value.birthDate;
            const formattedDate = rawDate.toISOString().split('T')[0];
            let request: Register = this.formReady.getRawValue();
            request.birthDate = formattedDate;
            this.authService.register(request).subscribe({
                next: (res) => {
                    const data = JSON.parse(res);
                    this.msg.showSuccess(data.data, 'Register', false);
                    this.redirectToVerification();
                },
                error: (err) => {
                    let error = JSON.parse(err);
                    error = error.errors.reason[0];
                    this.msg.showError(error, 'Register');
                },
            });
        }
    }

    redirectToVerification() {
        setTimeout(() => {
            const email = this.formReady.get('email').value;
            this.router.navigateByUrl(`auth/${email}/verification`);
        }, 3000);
    }
    onSelectGender(e) {
        this.formReady.get('genderId').patchValue(e.id);
    }
}
