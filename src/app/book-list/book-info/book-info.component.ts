import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})
export class BookInfoComponent implements OnInit {

  bookList:any = [];
  isAdminUser: boolean = false;
  constructor(private bookService: BookService, private router: Router,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAdmin().subscribe(res => this.isAdminUser = res);
    this.fetchBookList();
  }

  fetchBookList() {
    this.bookService.getBooks().subscribe((data) => {
      this.bookList = data;
    })
  }

  toEditBook(id: number){
    this.router.navigate(['/bookList/edit', id]);
  }

  toViewBook(id: number){
    this.router.navigate(['/bookList/view', id]);
  }
}
