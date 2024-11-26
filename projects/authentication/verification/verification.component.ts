import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Verify } from '../model/verify.model';

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

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.formReady = this.fb.group({
            otp: ['', Validators.required],
            email: [this.email],
        });
    }

    onSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const request: Verify = this.formReady.getRawValue();
            this.authService.verification(request).subscribe({
                next: (res) => {
                    this.msg.showSuccess('Verification successful');
                    this.router.navigateByUrl('/auth/login');
                },
                error: (err) => {
                    let error = JSON.parse(err);
                    error = error.errors.reason[0];
                    this.msg.showError(error, 'Register');
                },
            });
        }
    }
}
