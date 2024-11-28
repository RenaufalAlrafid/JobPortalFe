import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard/dashboard.component';
import { ProfileLayoutComponent } from '@project/layout-project/profile-layout/profile-layout.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardAdminComponent,
    },
    {
        path: 'profile',
        component: ProfileLayoutComponent,
        loadChildren: () =>
            import('@project/profile/profile.module').then(
                (m) => m.ProfileModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
