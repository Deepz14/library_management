import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';
import { NotificationService } from 'src/app/utils/notification.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  bookInfo: any
  bookId: number | any = '';
  btnDisabled:boolean = false;
  minQuantity: number = 1;
  maxQuantity: number = 1;
  currentQuanity: number = 1;
  isAdminUser: boolean = false;
  constructor(private bookService: BookService, private authService: AuthService, private activateRoute: ActivatedRoute,
    private notification: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(res => this.isAdminUser = res);
    this.bookId = this.activateRoute.snapshot.params['id'];
    this.getBookbyId(this.bookId);
  }

  getBookbyId(id: number) {
    this.bookService.getBookById(this.bookId).subscribe(res => {
      if(res) {
        this.bookInfo = res;
        this.btnDisabled = res?.in_stock === 0 ? true : false
        this.maxQuantity = res?.in_stock;
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    })
  }

  quantityUpdateHandler(type: string){
    if(type === 'increment'){
      this.currentQuanity = this.currentQuanity + 1;
    }else if(type === 'decrement'){
      this.currentQuanity = this.currentQuanity - 1;
    }
  }

  borrowBook(){
    const userInfo: any = this.authService.getUserInfo();
    const userLimit = userInfo?.limit;
    let payload = this.bookInfo;
    payload.in_stock -= this.currentQuanity;
    payload.borrowed_by = [...payload.borrowed_by, userInfo];
    //this.notification.showWarningPrompt('You have borrowed ' + this.currentQuanity + ' books. You can borrow maximum ' + userLimit + ' books.');
    this.bookService.borrowBook(payload, this.bookId).subscribe(res => {
      if(res) {
        this.notification.showSuccessPrompt('You have borrowed ' + this.currentQuanity + ' books.');
        this.router.navigate(['/bookList/info']);
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    });
  }

  showBorrowedList() {
    this.notification.showList();
  }

}
