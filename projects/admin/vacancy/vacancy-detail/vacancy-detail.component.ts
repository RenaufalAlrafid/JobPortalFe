import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { VacancyService } from '../service/vacancy.service';
import { Vacancy } from '../model/vacancy.model';

@Component({
    selector: 'app-vacancy-detail',
    templateUrl: './vacancy-detail.component.html',
    styleUrls: ['./vacancy-detail.component.scss'],
})
export class VacancyDetailComponent {
    title: string = 'Vacancy Detail';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Vacancy' },
        { label: 'Detail' },
    ];
    data: Vacancy;
    vacancyId: string = this.ar.snapshot.paramMap.get('vacancyId');

    constructor(
        private ar: ActivatedRoute,
        private vacancyService: VacancyService
    ) {}

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.vacancyService.getVacancyById(this.vacancyId).subscribe({
            next: (res) => {
                this.data = res.data;
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
