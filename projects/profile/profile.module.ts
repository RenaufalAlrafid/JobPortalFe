import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { CertificationComponent } from './certification/certification.component';

@NgModule({
    declarations: [
    PersonalInformationComponent,
    EducationComponent,
    ExperienceComponent,
    CertificationComponent
  ],
    imports: [CommonModule, ProfileRoutingModule],
})
export class ProfileModule {}
