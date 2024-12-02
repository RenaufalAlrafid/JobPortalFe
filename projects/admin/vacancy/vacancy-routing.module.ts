import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { VacancyCreateComponent } from './vacancy-create/vacancy-create.component';
import { VacancyEditComponent } from './vacancy-edit/vacancy-edit.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';

const routes: Routes = [
    {
        path: 'list',
        component: VacancyListComponent,
    },
    {
        path: 'add',
        component: VacancyCreateComponent,
    },
    {
        path: ':vacancyId/edit',
        component: VacancyEditComponent,
    },
    {
        path: ':vacancyId/detail',
        component: VacancyDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VacancyRoutingModule {}
