import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './service/authentication.service';
import { inject } from '@angular/core';
import { AuthService } from '@project/authentication/service/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthenticationService);
    const loginService = inject(AuthService);
    const router = inject(Router);
    const allowedRoles: string[] = route.data['roles'];

    if (!authService.getToken()) {
        // console.log('disini')
        router.navigateByUrl('/redirect');
        return false;
    }

    loginService.getLogin().subscribe({
        next: (res) => {
            const role = res.data.role;
            if (role && allowedRoles?.includes(role)) {
                return true;
            } else {
                loginService.logout();
                router.navigateByUrl('/redirect');
                return false;
            }
        },
        error: () => {
            loginService.logout();
            router.navigate(['/redirect']);
            return false;
        },
    });

    return true;
};
