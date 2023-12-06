import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/utils/notification.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit{

  bookList:any = [];
  userInfo: any;
  constructor(private bookService: BookService, private authService: AuthService, private notification: NotificationService ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.fetchBookList(this.userInfo);
  }

  fetchBookList(userInfo: any) {
    this.bookService.getBooks().subscribe((data: any) => {
      if(data) {
        this.bookList = data?.filter((book: any) => {
          let res = book?.borrowed_by?.filter((item: any) => item?.email === userInfo?.email);
          if(res.length > 0) {
            return book
          }
        })
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    })
  }

  returnBook(bookInfo: any) {
    let payload = bookInfo;
    let returnStock = payload?.borrowed_by.filter((user: any) => user.id == this.userInfo?.id)
    payload.in_stock += returnStock?.length;
    payload.borrowed_by = payload?.borrowed_by.filter((user: any) => user.id !== this.userInfo?.id);
    payload.returned_by = [...payload.returned_by, this.userInfo]
    this.bookService.returnBook(payload, bookInfo?.id).subscribe(res => {
      if(res) {
        this.notification.showSuccessPrompt('Book returned successfully');
        this.fetchBookList(this.userInfo);
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    });
  }

}
