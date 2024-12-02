import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Description } from '../model/description.model';

@Injectable({
    providedIn: 'root',
})
export class DescriptionService {
    constructor(private api: ApiService) {}

    createDescription(request: Description) {
        return this.api.post('jobs/desc', request, true);
    }

    updateDescription(request: Description) {
        return this.api.put(`jobs/desc`, request, true);
    }

    deleteDescription(id: string) {
        return this.api.delete(`jobs/desc/${id}`, true);
    }
}
