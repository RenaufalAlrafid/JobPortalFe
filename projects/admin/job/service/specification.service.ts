import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Specification } from '../model/specification.model';

@Injectable({
    providedIn: 'root',
})
export class SpecificationService {
    constructor(private api: ApiService) {}

    createSpecification(request: Specification) {
        return this.api.post('jobs/spec', request, true);
    }

    updateSpecification(request: Specification) {
        return this.api.put(`jobs/spec`, request, true);
    }

    deleteSpecification(id: string) {
        return this.api.delete(`jobs/spec/${id}`, true);
    }
}
