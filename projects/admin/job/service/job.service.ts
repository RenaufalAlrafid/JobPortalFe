import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Job } from '../model/job.model';

@Injectable({
    providedIn: 'root',
})
export class JobService {
    constructor(private api: ApiService) {}
    addJob(request: Job) {
        return this.api.post('jobs', request, true);
    }

    editJob(request: Job) {
        return this.api.put(`jobs`, request, true);
    }

    deleteJob(id: string) {
        return this.api.delete(`jobs/${id}`, true);
    }

    getJob(id: string) {
        return this.api.get(`jobs/${id}`, null, true);
    }
}
