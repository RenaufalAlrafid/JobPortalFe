export interface Vacancy {
    id?: string;
    job?: string;
    jobId?: string;
    type?: string;
    typeId?: string;
    location?: string;
    locationId?: string;
    level?: string;
    levelId?: string;
    code?: string;
    salaryStart: number;
    salaryEnd: number;
    dueDate: string;
    overview: string;
}
