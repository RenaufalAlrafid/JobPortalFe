import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '@core/shared-component/table/table.component';
import { Experience } from '../model/experience.model';
import { ProfileService } from '../service/profile.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    providers: [ConfirmationService],
})
export class ExperienceComponent {
    dialogFormVisible: boolean = false;
    formReady: FormGroup;
    dialogDetailVisible: boolean = false;
    experience: Experience;
    isEdit: boolean = false;
    @ViewChild('TableComponent') table: TableComponent;
    kebabOption = {
        isDetail: true,
        isEdit: true,
        isDelete: true,
    };

    columnMap = [
        { key: 'companyName', label: 'Company' },
        { key: 'jobTitle', label: 'Title' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' },
    ];

    constructor(
        private fb: FormBuilder,
        private profileService: ProfileService,
        private msg: MessageBoxService,
        private confirmationService: ConfirmationService
    ) {}
    ngOnInit() {
        this.onAddForm();
    }

    onAddForm() {
        this.formReady = this.fb.group({
            companyName: ['', Validators.required],
            jobTitle: ['', Validators.required],
            startDate: ['', Validators.required],
            endDate: [''],
            id: [''],
            responsibilities: ['', Validators.required],
            location: [''],
            version: [0],
        });
    }

    onEditForm(data: Experience) {
        this.formReady = this.fb.group({
            companyName: [data.companyName, Validators.required],
            jobTitle: [data.jobTitle, Validators.required],
            startDate: [data.startDate, Validators.required],
            endDate: [data.endDate || '', Validators.required],
            id: [data.id],
            responsibilities: [data.responsibilities, Validators.required],
            location: [data.location],
            version: [data.version],
        });
    }

    onCreate() {
        this.isEdit = false;
        this.onAddForm();
        this.dialogFormVisible = true;
    }

    tableAction(e) {
        const data = e.data;
        const action = e.action;

        if (action === 'edit') {
            this.onEditForm(data);
            this.isEdit = true;
            this.dialogFormVisible = true;
        } else if (action === 'delete') {
            this.onDeleteDialog(data.id);
        } else if (action === 'detail') {
            this.onDetail(data);
        }
    }

    onDetail(data: Experience) {
        this.experience = data;
        this.dialogDetailVisible = true;
    }

    onCreateSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const body = this.formReady.getRawValue();
            this.profileService.addExperience(body).subscribe({
                next: (res) => {
                    this.dialogFormVisible = false;
                    this.msg.showSuccess(res.data, 'Add Experience', false);
                    this.table.reload();
                },
                error: (error) => {
                    console.log(error);
                },
            });
        }
    }

    onEditSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const body = this.formReady.getRawValue();
            this.profileService.editExperience(body).subscribe({
                next: (res) => {
                    this.dialogFormVisible = false;
                    this.msg.showSuccess(res.data, 'Edit Experience', false);
                    this.table.reload();
                },
                error: (error) => {
                    console.log(error);
                },
            });
        }
    }

    onDeleteDialog(rowId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this data?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.onDelete(rowId);
            },
            reject: () => {
                this.msg.showError('Error deleting', 'delete');
            },
        });
    }

    onDelete(id: string) {
        this.profileService.deleteExperience(id).subscribe({
            next: () => {
                this.msg.showSuccess(
                    'Deleted Data Successfully',
                    'Delete Data',
                    false
                );
                this.table.reload();
            },
            error: () => {
                this.msg.showError('Deleted Data Error', 'Delete Data');
            },
        });
    }
}
