import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { EducationComponent } from './education/education.component';
import { CertificationComponent } from './certification/certification.component';
import { ExperienceComponent } from './experience/experience.component';

const routes: Routes = [
    {
        path: 'personal',
        component: PersonalInformationComponent,
    },
    {
        path: 'education',
        component: EducationComponent,
    },
    {
        path: 'experience',
        component: ExperienceComponent,
    },
    {
        path: 'certification',
        component: CertificationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
