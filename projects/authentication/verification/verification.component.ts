import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Verify } from '../model/verify.model';
import { NgxOtpInputComponentOptions } from 'ngx-otp-input';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent {
    formReady: FormGroup;
    email: string = this.activatedRoute.snapshot.paramMap.get('email');
    constructor(
        private authService: AuthService,
        private router: Router,
        private msg: MessageBoxService,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute
    ) {}

    otpOptions: NgxOtpInputComponentOptions = {
        otpLength: 5,
        autoFocus: true,
        autoBlur: true,
        regexp: /^[a-zA-Z0-9]+$/,
        showBlinkingCursor: true,
        hideInputValues: false,
    };

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formReady = this.fb.group({
            otp: ['', Validators.required],
            email: [this.email],
        });
    }

    onSubmit(e: string) {
        const request: Verify = {
            email: this.email,
            otp: e,
        };
        this.authService.verification(request).subscribe({
            next: (res) => {
                this.msg.showSuccess(
                    'Verification successful, Please Login',
                    'verification',
                    false
                );
                this.router.navigateByUrl('/auth/login');
            },
            error: (err) => {
                let error = JSON.parse(err);
                error = error.errors.reason[0];
                this.msg.showError(error, 'Verification');
            },
        });
    }
}
