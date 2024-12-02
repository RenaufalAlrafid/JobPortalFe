import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Register } from '@project/authentication/model/register.model';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private api: ApiService) {}
    createUser(request: Register) {
        console.log('disini');
        return this.api.post('users', request, true);
    }

    editUser(request: User) {
        return this.api.put(`users`, request, true);
    }
    deleteUser(id: string) {
        return this.api.delete(`users/${id}`);
    }
}
