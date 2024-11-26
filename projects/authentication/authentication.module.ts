import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './login/login.component';
import { SharedComponentModule } from '../../src/app/core/shared-component/shared-component.module';
import { PasswordModule } from 'primeng/password';
@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        CarouselModule,
        ButtonModule,
        SharedComponentModule,
        PasswordModule,
    ],
})
export class AuthenticationModule {}
