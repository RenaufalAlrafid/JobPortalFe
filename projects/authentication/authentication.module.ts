import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { SharedComponentModule } from '../../src/app/core/shared-component/shared-component.module';
import { PasswordModule } from 'primeng/password';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
    declarations: [LoginComponent, RegisterComponent, VerificationComponent],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        CarouselModule,
        ButtonModule,
        SharedComponentModule,
        PasswordModule,
        CalendarModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
    ],
})
export class AuthenticationModule {}
