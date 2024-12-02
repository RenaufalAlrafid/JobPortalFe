import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { VacancyService } from '../service/vacancy.service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-vacancy-create',
    templateUrl: './vacancy-create.component.html',
    styleUrls: ['./vacancy-create.component.scss'],
})
export class VacancyCreateComponent {
    formReady: FormGroup;
    title: string = 'Vacancy Add';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Vacancy' },
        { label: 'Add' },
    ];

    constructor(
        private fb: FormBuilder,
        private vacancyService: VacancyService,
        private msg: MessageBoxService
    ) {}
    ngOnInit() {
        this.createForm();
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
            this.vacancyService.addVacancy(body).subscribe({
                next: (res) => {
                    res = JSON.parse(res);
                    this.msg.showSuccess(res.data, 'Add Vacancy', true);
                },
                error: (err) => {
                    console.log(err);
                },
            });
        }
    }
}
