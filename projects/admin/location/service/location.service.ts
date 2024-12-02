import { Injectable } from '@angular/core';
import { ApiService } from '@core/service/api.service';
import { Location } from '../model/location.model';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    constructor(private api: ApiService) {}

    addLocation(request: Location) {
        return this.api.post('locations', request, true);
    }

    editLocation(request: Location) {
        return this.api.put(`locations`, request, true);
    }

    deleteLocation(id: string) {
        return this.api.delete(`locations/${id}`);
    }
}
