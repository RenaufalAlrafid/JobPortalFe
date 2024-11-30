import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '@core/shared-component/shared-component.module';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CertificationComponent } from './certification/certification.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [
        PersonalInformationComponent,
        EducationComponent,
        ExperienceComponent,
        CertificationComponent,
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedComponentModule,
        ReactiveFormsModule,
        DialogModule,
        CalendarModule,
        InputTextareaModule,
        ConfirmDialogModule,
    ],
})
export class ProfileModule {}
