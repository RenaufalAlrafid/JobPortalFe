import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../service/location.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableComponent } from '@core/shared-component/table/table.component';

@Component({
    selector: 'app-location-list',
    templateUrl: './location-list.component.html',
    styleUrls: ['./location-list.component.scss'],
})
export class LocationListComponent {
    @ViewChild('TableComponent') table: TableComponent;
    dialogEdit: boolean = false;
    edit: boolean = false;
    title: string = 'Location List';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Location' },
        { label: 'List' },
    ];

    kebabOption = {
        isDetail: false,
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
        private locationService: LocationService,
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
            this.locationService.editLocation(body).subscribe({
                next: (res) => {
                    this.msg.showSuccess(res.data, 'Edit Location', false);
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
            this.locationService.addLocation(body).subscribe({
                next: (res) => {
                    this.msg.showSuccess(res.data, 'Add Location', false);
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
        this.locationService.deleteLocation(id).subscribe({
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
