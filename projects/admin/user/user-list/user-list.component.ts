import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { UserService } from '../service/user.service';
import { MessageBoxService } from '@core/service/message-box.service';
import { TableComponent } from '@core/shared-component/table/table.component';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    @ViewChild('TableComponent') table: TableComponent;
    dialogEdit: boolean = false;
    body;
    title: string = 'User List';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Users' },
        { label: 'List' },
    ];

    kebabOption = {
        isDetail: false,
        isEdit: true,
        isDelete: true,
    };
    formReady: FormGroup;

    columnMap = [
        { key: 'fullName', label: 'Full Name', disableSort: true },
        { key: 'email', label: 'Email', disableSort: false },
        { key: 'username', label: 'Username' },
        { key: 'roleName', label: 'RoleName' },
    ];

    tableAction(e) {
        const data = e.data;
        const action = e.action;
        if (action === 'edit') {
            this.dialogEdit = true;
            this.onEdit(data);
        } else if (action === 'delete') {
            this.onDeleteDialog(data.id);
        }
    }
    constructor(
        private router: Router,
        private userService: UserService,
        private msg: MessageBoxService,
        private confirmationService: ConfirmationService,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.createForm();
    }
    onCreate() {
        this.router.navigateByUrl('/admin/user/add');
    }

    createForm() {
        this.formReady = this.fb.group({
            username: ['', Validators.required],
            roleId: ['', Validators.required],
            isActive: [true],
            version: [0],
        });
    }

    onEdit(data) {
        this.formReady = this.fb.group({
            username: [data.username, Validators.required],
            roleId: [data.roleId, Validators.required],
            isActive: [data.isActive],
            version: [data.version],
            id: [data.id],
        });
    }

    onEditSubmit() {
        if (this.formReady.invalid) {
            this.formReady.markAllAsTouched();
        } else {
            const body = this.formReady.getRawValue();
            console.log(body);
            this.userService.editUser(body).subscribe({
                next: (res) => {
                    this.msg.showSuccess(res.data, 'Edit Users', false);
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
        this.userService.deleteUser(id).subscribe({
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
