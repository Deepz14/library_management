import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { BookService } from "../../services/book.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from 'src/app/utils/notification.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  formType: string = 'Add';
  bookId: number | any = '';
  bookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    author: new FormControl('', [Validators.required]),
    published_date: new FormControl('', [Validators.required]),
    in_stock: new FormControl(1, [Validators.required]),
    borrowed_by: new FormControl(),
    returned_by: new FormControl()
  });
  constructor(private bookService: BookService, private router: Router, 
    private activatedRoute: ActivatedRoute, private notification: NotificationService) {}

  ngOnInit(): void {
    this.router.url.includes('edit') ? this.formType = 'Edit' : this.formType = 'Add';
    if(this.formType === 'Edit'){
      this.bookId = this.activatedRoute.snapshot.params['id'];
      this.getBookById(this.bookId);
    }
  }

  getBookById(id: number){
    this.bookService.getBookById(this.bookId).subscribe(res => {
      this.bookForm.patchValue(res);
    }, error => {
      this.notification.showErrorPrompt(error.message)
    })
  }

  onSubmit(){
    this.formType === 'Add' ? this.addBook() : this.editBook();
  }

  addBook() {
    if(this.bookForm?.invalid){
      this.notification.showErrorPrompt('Please fill all the fields');
      return;
    }
    this.bookService.addBook(this.bookForm.getRawValue()).subscribe(res => {
      if(res){
        this.notification.showSuccessPrompt('Book added successfully');
        this.router.navigate(['/bookList/info']);
      }
    }, error => {
      this.notification.showErrorPrompt(error.message)
    })
  }

  editBook() {
    if(this.bookForm?.invalid){
      this.notification.showErrorPrompt('Please fill all the fields');
      return;
    }
    this.bookService.editBook(this.bookForm.getRawValue(), this.bookId).subscribe(res => {
      if(res){
        this.notification.showSuccessPrompt('Book updated successfully');
        this.router.navigate(['/bookList/info']);
      }
    }, error => {
      this.notification.showErrorPrompt(error.message)
    })
  }
}
