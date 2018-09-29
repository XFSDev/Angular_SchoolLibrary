import { IBook } from '../books/book.model';
import { IUser } from '../administration/users/user.model';

export interface ILoan {
    loanID: number;
    bookID: number;
    book: IBook;
    userID: number;
    user: IUser;
    requestDate: Date;
    borrowDate: Date;
    returnDate: Date;
}
