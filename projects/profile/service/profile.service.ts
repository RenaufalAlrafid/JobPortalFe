import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Personal } from '../model/personal.model';
import { Experience } from '../model/experience.model';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    constructor(private api: ApiService) {}

    getPersonalUser() {
        return this.api.get('profiles', null, true);
    }

    editPhoto(request) {
        return this.api.putFormData('profiles/photo', request, true);
    }

    editPersonal(request: Personal) {
        return this.api.put('profiles', request, true);
    }

    addExperience(request: Experience) {
        return this.api.post('users/experiences', request, true);
    }

    editExperience(request: Experience) {
        return this.api.put('users/experiences', request, true);
    }

    deleteExperience(id: string) {
        return this.api.delete('users/experiences/' + id);
    }
}
