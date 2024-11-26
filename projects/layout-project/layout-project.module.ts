import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AuthLayoutComponent],
    imports: [CommonModule, CarouselModule, ButtonModule, RouterModule],
})
export class LayoutProjectModule {}
