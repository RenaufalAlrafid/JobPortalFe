import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageBoxService } from '@core/service/message-box.service';
import { TableComponent } from '@core/shared-component/table/table.component';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { VacancyService } from '../service/vacancy.service';

@Component({
    selector: 'app-vacancy-list',
    templateUrl: './vacancy-list.component.html',
    styleUrls: ['./vacancy-list.component.scss'],
})
export class VacancyListComponent {
    @ViewChild('TableComponent') table: TableComponent;
    title: string = 'Vacancy List';
    items: MenuItem[] = [
        { label: 'Admin' },
        { label: 'Vacancy' },
        { label: 'List' },
    ];

    kebabOption = {
        isDetail: true,
        isEdit: true,
        isDelete: true,
    };
    formReady: FormGroup;

    columnMap = [
        { key: 'code', label: 'Code', disableSort: false },
        { key: 'job', label: 'Job Title', disableSort: false },
        { key: 'location', label: 'Location', disableSort: false },
        { key: 'type', label: 'Type', disableSort: false },
        { key: 'level', label: 'Level', disableSort: false },
    ];
    body;

    constructor(
        public router: Router,
        private msg: MessageBoxService,
        private confirmationService: ConfirmationService,
        private vacancyService: VacancyService
    ) {}

    onCreate() {
        this.router.navigateByUrl('/admin/vacancy/add');
    }
    onSearch(e) {
        this.body = e;
        this.table.onSearch(this.body);
    }

    tableAction(e) {
        const data = e.data;
        const action = e.action;

        if (action === 'delete') {
            this.onDeleteDialog(data.id);
        } else if (action === 'edit') {
            this.router.navigateByUrl('/admin/vacancy/' + data.id + '/edit');
        } else if (action === 'detail') {
            this.router.navigateByUrl('/admin/vacancy/' + data.id + '/detail');
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
        this.vacancyService.deleteVacancy(id).subscribe({
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
