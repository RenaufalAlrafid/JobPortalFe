import { Injectable } from '@angular/core';
import { ApiService } from '../../../src/app/core/service/api.service';
import { Register } from '../model/register.model';
import { Verify } from '../model/verify.model';
import { Login } from '../model/login.model';
import { AuthenticationService } from '../../../src/app/core/service/authentication.service';
import { of } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private api: ApiService,
        private authenticationService: AuthenticationService
    ) {}

    register(request: Register) {
        return this.api.post('register', request, true);
    }

    verification(request: Verify) {
        return this.api.post('users/verify', request, true);
    }

    login(request: Login) {
        return this.api.post('login', request, true);
    }

    addToken(token: string) {
        localStorage.setItem('token', token);
    }

    getEmailForVerify(username: string) {
        return this.api.get(`users/email/${username}`, null, true);
    }

    logout() {
        localStorage.removeItem('token');
    }

    getLogin() {
        const token = this.authenticationService.getToken();
        if (token) {
            return this.api.get('users/login', null, true);
        } else {
            return of(null);
        }
    }
}
