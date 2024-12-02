import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { JobService } from '../service/job.service';
import { Job } from '../model/job.model';
import { TableComponent } from '@core/shared-component/table/table.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageBoxService } from '@core/service/message-box.service';
import { SpecificationService } from '../service/specification.service';
import { Specification } from '../model/specification.model';
import { DescriptionService } from '../service/description.service';
import { Description } from '../model/description.model';

@Component({
    selector: 'app-job-detail',
    templateUrl: './job-detail.component.html',
    styleUrls: ['./job-detail.component.scss'],
})
export class JobDetailComponent {
    @ViewChild('TableSpecComponent') tableSpec: TableComponent;
    @ViewChild('TableDescComponent') tableDesc: TableComponent;
    dialogSpecVisible: boolean = false;
    dialogDescVisible: boolean = false;
    formSpecReady: FormGroup;
    formDescReady: FormGroup;
    title: string = 'Job Detail';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Job' },
        { label: 'Detail' },
    ];
    jobId: string = this.ar.snapshot.paramMap.get('jobId');
    specUrl: string = 'jobs/' + this.jobId + '/specs';
    descUrl: string = 'jobs/' + this.jobId + '/descs';
    data: Job;
    edit: boolean = false;

    columnSpecMap = [
        { key: 'specification', label: 'Specification', disableSort: true },
    ];
    columnDescMap = [
        { key: 'description', label: 'Description', disableSort: true },
    ];

    kebabOption = {
        isDetail: false,
        isEdit: true,
        isDelete: true,
    };
    constructor(
        private ar: ActivatedRoute,
        private jobService: JobService,
        private fb: FormBuilder,
        private msg: MessageBoxService,
        private confirmationService: ConfirmationService,
        private specificationService: SpecificationService,
        private descriptionService: DescriptionService
    ) {}

    ngOnInit() {
        this.getData();
        this.createFormSpec();
        this.createFormDesc();
    }

    createFormSpec() {
        this.formSpecReady = this.fb.group({
            specification: ['', Validators.required],
            jobId: [this.jobId],
            id: [''],
            version: [''],
        });
    }
    editFormSpec(data: Specification) {
        this.formSpecReady = this.fb.group({
            specification: [data.specification, Validators.required],
            jobId: [this.jobId],
            id: [data.id],
            version: [data.version],
        });
    }

    createFormDesc() {
        this.formDescReady = this.fb.group({
            description: ['', Validators.required],
            jobId: [this.jobId],
            id: [''],
            version: [''],
        });
    }
    editFormDesc(data: Description) {
        this.formDescReady = this.fb.group({
            description: [data.description, Validators.required],
            jobId: [this.jobId],
            id: [data.id],
            version: [data.version],
        });
    }

    getData() {
        this.jobService.getJob(this.jobId).subscribe({
            next: (res) => {
                this.data = res.data;
                this.specUrl = 'jobs/' + this.data.id + '/specs';
                this.descUrl = 'jobs/' + this.data.id + '/descs';
            },
            error: (err) => {
                console.error('Error retrieving job data', err);
            },
        });
    }

    onAddModalSpec() {
        this.edit = false;
        this.dialogSpecVisible = true;
        this.createFormSpec();
    }
    onEditModalSpec(data: Specification) {
        this.dialogSpecVisible = true;
        this.edit = true;
        this.editFormSpec(data);
    }
    onAddModalDesc() {
        this.edit = false;
        this.dialogDescVisible = true;
        this.createFormDesc();
    }
    onEditModalDesc(data: Description) {
        this.edit = true;
        this.dialogDescVisible = true;
        this.editFormDesc(data);
    }
    tableSpecAction(e) {
        const data = e.data;
        const action = e.action;
        if (action === 'edit') {
            this.onEditModalSpec(data);
        } else if (action === 'delete') {
            this.onDeleteDialogSpec(data.id);
        }
    }

    tableDescAction(e) {
        const data = e.data;
        const action = e.action;
        if (action === 'edit') {
            this.onEditModalDesc(data);
        } else if (action === 'delete') {
            this.onDeleteDialogDesc(data.id);
        }
    }

    onDeleteDialogSpec(rowId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this data?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.onDeleteSpec(rowId);
            },
            reject: () => {
                this.msg.showError('Error deleting', 'delete');
            },
        });
    }

    onDeleteSpec(rowId: string) {
        this.specificationService.deleteSpecification(rowId).subscribe({
            next: () => {
                this.msg.showSuccess(
                    'Deleted Data Successfully',
                    'Delete Data',
                    false
                );
                this.tableSpec.reload();
            },
            error: (err) => {
                console.error('Error deleting specification data', err);
            },
        });
    }
    onDeleteDialogDesc(rowId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this data?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.onDeleteDesc(rowId);
            },
            reject: () => {
                this.msg.showError('Error deleting', 'delete');
            },
        });
    }

    onDeleteDesc(rowId: string) {
        this.descriptionService.deleteDescription(rowId).subscribe({
            next: () => {
                this.msg.showSuccess(
                    'Deleted Data Successfully',
                    'Delete Data',
                    false
                );
                this.tableDesc.reload();
            },
            error: (err) => {
                console.error('Error deleting specification data', err);
            },
        });
    }

    onCreateSpecSubmit() {
        if (this.formSpecReady.invalid) {
            this.formSpecReady.markAllAsTouched();
        } else {
            const body = this.formSpecReady.getRawValue();
            this.specificationService.createSpecification(body).subscribe({
                next: (res) => {
                    this.dialogSpecVisible = false;
                    this.msg.showSuccess(
                        'Added Data Successfully',
                        'Add Data',
                        false
                    );
                    this.tableSpec.reload();
                },
                error: (err) => {
                    console.error('Error adding specification data', err);
                },
            });
        }
    }
    onCreateDescSubmit() {
        if (this.formDescReady.invalid) {
            this.formDescReady.markAllAsTouched();
        } else {
            const body = this.formDescReady.getRawValue();
            this.descriptionService.createDescription(body).subscribe({
                next: (res) => {
                    this.dialogDescVisible = false;
                    this.msg.showSuccess(
                        'Added Data Successfully',
                        'Add Data',
                        false
                    );
                    this.tableDesc.reload();
                },
                error: (err) => {
                    console.error('Error adding specification data', err);
                },
            });
        }
    }
    onEditSpecSubmit() {
        if (this.formSpecReady.invalid) {
            this.formSpecReady.markAllAsTouched();
        } else {
            const body = this.formSpecReady.getRawValue();
            this.specificationService.updateSpecification(body).subscribe({
                next: (res) => {
                    this.dialogSpecVisible = false;
                    this.msg.showSuccess(
                        'Updated Data Successfully',
                        'Update Data',
                        false
                    );
                    this.tableSpec.reload();
                },
                error: (err) => {
                    console.error('Error updating specification data', err);
                },
            });
        }
    }
    onEditDescSubmit() {
        if (this.formDescReady.invalid) {
            this.formDescReady.markAllAsTouched();
        } else {
            const body = this.formDescReady.getRawValue();
            this.descriptionService.updateDescription(body).subscribe({
                next: (res) => {
                    this.dialogDescVisible = false;
                    this.msg.showSuccess(
                        'Updated Data Successfully',
                        'Update Data',
                        false
                    );
                    this.tableDesc.reload();
                },
                error: (err) => {
                    console.error('Error updating specification data', err);
                },
            });
        }
    }
}
