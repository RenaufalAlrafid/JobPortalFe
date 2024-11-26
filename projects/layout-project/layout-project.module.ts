import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [AuthLayoutComponent],
    imports: [
        CommonModule,
        CarouselModule,
        ButtonModule,
        RouterModule,
        SharedComponentModule,
        NgxSpinnerModule,
    ],
})
export class LayoutProjectModule {}
