import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

const routes: Routes = [
    {
        path: 'list',
        component: JobListComponent,
    },
    {
        path: ':jobId/detail',
        component: JobDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JobRoutingModule {}
