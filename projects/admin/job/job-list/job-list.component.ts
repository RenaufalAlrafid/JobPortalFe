import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableComponent } from '@core/shared-component/table/table.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { JobService } from '../service/job.service';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
    @ViewChild('TableComponent') table: TableComponent;
    dialogEdit: boolean = false;
    edit: boolean = false;
    title: string = 'Job List';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Job' },
        { label: 'List' },
    ];

    kebabOption = {
        isDetail: true,
        isEdit: true,
        isDelete: true,
    };
    formReady: FormGroup;
    columnMap = [
        { key: 'code', label: 'Code', disableSort: true },
        { key: 'name', label: 'Name', disableSort: true },
    ];
    body;
    constructor(
        private router: Router,
        private jobService: JobService,
        private msg: MessageBoxService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder
    ) {}
    ngOnInit() {
        this.createForm();
    }

    tableAction(e) {
        const data = e.data;
        const action = e.action;
        if (action === 'edit') {
            this.edit = true;
            this.dialogEdit = true;
            this.onEdit(data);
        } else if (action === 'delete') {
            this.onDeleteDialog(data.id);
        } else if (action === 'detail') {
            this.router.navigateByUrl('admin/job/' + data.id + '/detail');
        }
    }
    onCreate() {
        this.edit = false;
        this.dialogEdit = true;
        this.createForm();
    }

    createForm() {
        this.formReady = this.fb.group({
            code: ['', Validators.required],
            name: ['', Validators.required],
            isActive: [true],
            version: [0],
            id: [''],
        });
    }

    onEdit(data) {
        this.formReady = this.fb.group({
            isActive: [data.isActive],
            version: [data.version],
            id: [data.id],
            code: [data.code, Validators.required],
            name: [data.name, Validators.required],
        });
    }

    onEditSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const body = this.formReady.getRawValue();
            this.jobService.editJob(body).subscribe({
                next: (res) => {
                    this.msg.showSuccess(res.data, 'Edit Job', false);
                    this.table.reload();
                    this.dialogEdit = false;
                },
                error: (error) => {
                    console.log(error);
                },
            });
        }
    }
    onCreateSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const body = this.formReady.getRawValue();
            this.jobService.addJob(body).subscribe({
                next: (res) => {
                    this.msg.showSuccess(res.data, 'Add Job', false);
                    this.table.reload();
                    this.dialogEdit = false;
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
        this.jobService.deleteJob(id).subscribe({
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
    onSelectRole(e) {
        this.formReady.get('roleId').patchValue(e.id);
    }

    onSearch(e) {
        this.body = e;
        this.table.onSearch(this.body);
    }
}
