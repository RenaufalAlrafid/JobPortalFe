import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Vacancy } from '../model/vacancy.model';

@Injectable({
    providedIn: 'root',
})
export class VacancyService {
    constructor(private api: ApiService) {}

    getVacancyById(id: string) {
        return this.api.get(`vacancies/${id}`, null, true);
    }

    addVacancy(request: Vacancy) {
        return this.api.post('vacancies', request, true);
    }

    editVacancy(request: Vacancy) {
        return this.api.put(`vacancies`, request, true);
    }

    deleteVacancy(id: string) {
        return this.api.delete(`vacancies/${id}`);
    }
}
