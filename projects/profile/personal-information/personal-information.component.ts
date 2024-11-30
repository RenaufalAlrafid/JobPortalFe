import { Component } from '@angular/core';
import { Personal } from '../model/personal.model';
import { ProfileService } from '../service/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageBoxService } from '@core/service/message-box.service';

@Component({
    selector: 'app-personal-information',
    templateUrl: './personal-information.component.html',
    styleUrls: ['./personal-information.component.scss'],
})
export class PersonalInformationComponent {
    data: Personal;
    formPhoto: FormGroup;
    formPersonal: FormGroup;
    dialogPhotoVisible: boolean = false;
    dialogPersonalVisible: boolean = false;

    constructor(
        private profileService: ProfileService,
        private fb: FormBuilder,
        private msg: MessageBoxService
    ) {}

    ngOnInit() {
        this.getData();
        this.createFormPhoto();
    }

    onClickEditPhoto() {
        this.formPhoto.reset();
        this.dialogPhotoVisible = true;
    }

    onClickEditPersonal() {
        this.createFormPersonal();
        this.dialogPersonalVisible = true;
    }

    createFormPhoto() {
        this.formPhoto = this.fb.group({
            file: ['', Validators.required],
        });
    }

    createFormPersonal() {
        this.formPersonal = this.fb.group({
            fullName: [this.data.fullName || '', Validators.required],
            genderId: [this.data.genderId || '', Validators.required],
            email: [
                this.data.email || '',
                [Validators.required, Validators.email],
            ],
            nik: [this.data.nik || '', Validators.required],
            phoneNumber: [this.data.phoneNumber || ''],
            birthDate: [this.data.birthDate || '', Validators.required],
            address: [this.data.address || ''],
            city: [this.data.city || ''],
            isActive: [this.data.isActive || true],
            version: [this.data.version || 0],
        });
    }

    getData() {
        this.profileService.getPersonalUser().subscribe({
            next: (res) => {
                this.data = res.data;
                this.createFormPersonal();
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    onChangeImage(e) {
        this.formPhoto.get('file').patchValue(e);
    }

    onSubmitPhoto() {
        if (this.formPhoto.invalid) {
            this.formPhoto.markAllAsTouched();
        } else {
            const formData = new FormData();
            formData.append('file', this.formPhoto.get('file').value);
            this.profileService.editPhoto(formData).subscribe({
                next: (res) => {
                    this.msg.showSuccess(res.data, 'updated Photo', false);
                    this.getData();
                    this.dialogPhotoVisible = false;
                },
                error: (error) => {
                    console.log(error);
                },
            });
        }
    }

    onSelectGender(e) {
        this.formPersonal.get('genderId').patchValue(e.id);
    }

    onSubmitPersonal() {
        if (this.formPersonal.invalid) {
            this.formPersonal.markAllAsTouched();
        } else {
            const body = this.formPersonal.getRawValue();
            console.log(body);
            this.profileService.editPersonal(body).subscribe({
                next: (res) => {
                    this.msg.showSuccess(
                        res.data,
                        'updated Personal Information',
                        false
                    );
                    this.getData();
                    this.dialogPersonalVisible = false;
                },
                error: (error) => {
                    console.log(error);
                },
            });
        }
    }
}
