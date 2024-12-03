import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { VacancyService } from '../service/vacancy.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-vacancy-edit',
    templateUrl: './vacancy-edit.component.html',
    styleUrls: ['./vacancy-edit.component.scss'],
})
export class VacancyEditComponent {
    formReady: FormGroup;
    title: string = 'Vacancy Edit';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Vacancy' },
        { label: 'Edit' },
    ];

    vacancyId: string = this.ar.snapshot.paramMap.get('vacancyId');

    constructor(
        private ar: ActivatedRoute,
        private fb: FormBuilder,
        private vacancyService: VacancyService,
        private msg: MessageBoxService
    ) {}
    ngOnInit() {
        this.createForm();
        this.getData();
    }

    createForm() {
        this.formReady = this.fb.group({
            jobId: ['', Validators.required],
            typeId: ['', Validators.required],
            locationId: ['', Validators.required],
            levelId: ['', Validators.required],
            salaryStart: ['', Validators.required],
            salaryEnd: ['', Validators.required],
            dueDate: ['', Validators.required],
            overview: ['', Validators.required],
            version: [''],
            isActive: [false],
            id: [''],
        });
    }

    getData() {
        this.vacancyService.getVacancyById(this.vacancyId).subscribe({
            next: (res) => {
                this.formReady.patchValue(res.data);
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    onSelectJob(e) {
        this.formReady.get('jobId').patchValue(e.id);
    }
    onSelectLocation(e) {
        this.formReady.get('locationId').patchValue(e.id);
    }
    onSelectType(e) {
        this.formReady.get('typeId').patchValue(e.id);
    }
    onSelectLevel(e) {
        this.formReady.get('levelId').patchValue(e.id);
    }

    onSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const body = this.formReady.getRawValue();
            this.vacancyService.editVacancy(body).subscribe({
                next: (res) => {
                    res = JSON.parse(res);
                    this.msg.showSuccess(res.data, 'Edit Vacancy', true);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }
}
