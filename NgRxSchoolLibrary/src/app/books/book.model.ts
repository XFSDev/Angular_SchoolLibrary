export interface IBook {
    bookID: number;
    title: string;
    releaseDate: Date;
    additionalInformation: string;
    publisherID: number;
    status: number;
    authorIds: number[];
    isDeleted: boolean;
    authorsList: string;
    publisherName: string;
    statusName: string;
}
