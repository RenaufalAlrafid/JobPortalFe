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
    {
        path: 'user',
        loadChildren: () =>
            import('@project/admin/user/user.module').then((m) => m.UserModule),
    },
    {
        path: 'location',
        loadChildren: () =>
            import('@project/admin/location/location.module').then(
                (m) => m.LocationModule
            ),
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
