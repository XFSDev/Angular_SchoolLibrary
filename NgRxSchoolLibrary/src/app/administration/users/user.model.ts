export interface IUser {
    userID: number;
    userName: string;
    password: string;
    passwordConfirm: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    address: string;
    dateOfBirth: Date;
    roleName: string;
    role: string;
    isDeleted: boolean;
}
