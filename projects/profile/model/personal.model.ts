export interface Personal {
    id: string;
    gender: string;
    genderId: string;
    email: string;
    nik: string;
    fullName: string;
    username: string;
    role: string;
    phoneNumber?: string;
    birthDate?: string;
    address?: string;
    city?: string;
    photoUrl?: string;
    isActive?: boolean;
    version?: number;
}
