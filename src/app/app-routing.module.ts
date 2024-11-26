import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from '@project/layout-project/auth-layout/auth-layout.component';
import { PageForbiddenComponent } from './layout/page-forbidden/page-forbidden.component';
import { PageNotFoundComponent } from './layout/page-not-found/page-not-found.component';
import { RedirectComponent } from './layout/redirect/redirect.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'auth',
                    component: AuthLayoutComponent,
                    loadChildren: () =>
                        import(
                            '@project/authentication/authentication.module'
                        ).then((m) => m.AuthenticationModule),
                },
                {
                    path: 'redirect',
                    component: RedirectComponent,
                },
                {
                    path: '404',
                    component: PageNotFoundComponent,
                },
                {
                    path: '403',
                    component: PageForbiddenComponent,
                },

                { path: '**', redirectTo: '404' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                canceledNavigationResolution: 'computed',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
