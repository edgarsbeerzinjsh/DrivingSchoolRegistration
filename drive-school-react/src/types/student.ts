export type Student = {
    firstName: string;
    lastName: string;
    yearOfBirth: Date;
    email: string;
    mobilePhone: string;
    address: string;
    city: string;
    trainingCategory: string;
    isTheory: boolean;
    isPractical: boolean;
    examTime: Date | null;
}