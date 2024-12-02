import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { Register } from '@project/authentication/model/register.model';
import { AuthService } from '@project/authentication/service/auth.service';
import { confirmPasswordValidator } from '@project/authentication/validators/confirm-password.validators';
import { MenuItem } from 'primeng/api';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-user-create',
    templateUrl: './user-create.component.html',
    styleUrls: ['./user-create.component.scss'],
})
export class UserCreateComponent {
    title: string = 'User Add';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Users' },
        { label: 'Add' },
    ];

    formReady: FormGroup;
    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userService: UserService,
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
                roleId: ['', Validators.required],
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
            this.userService.createUser(request).subscribe({
                next: (res) => {
                    const data = JSON.parse(res);
                    this.msg.showSuccess(data.data, 'Create User');
                },
                error: (err) => {
                    let error = JSON.parse(err);
                    error = error.errors.reason[0];
                    this.msg.showError(error, 'Register');
                },
            });
        }
    }
    onSelectGender(e) {
        this.formReady.get('genderId').patchValue(e.id);
    }
    onSelectRole(e) {
        this.formReady.get('roleId').patchValue(e.id);
    }
}
