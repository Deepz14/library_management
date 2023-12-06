import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';
import { RouterModule, Routes,  } from '@angular/router';
import { BookInfoComponent } from './book-info/book-info.component';
import { AddBookComponent } from './add-book/add-book.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCardComponent } from './book-card/book-card.component';
import { MyBooksComponent } from './my-books/my-books.component';

const routes: Routes = [
  { path: '', component: BooksComponent, 
    children: [
      {path: 'info', component: BookInfoComponent},
      {path: 'add', component: AddBookComponent},
      {path: 'borrowed', component: MyBooksComponent},
      {path: 'edit/:id', component: AddBookComponent},
      {path: 'view/:id', component: BookCardComponent},
      {path: '', redirectTo: 'info', pathMatch: 'full'},
    ]
 }
]

@NgModule({
  declarations: [
    BooksComponent,
    BookInfoComponent,
    AddBookComponent,
    BookCardComponent,
    MyBooksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class BookListModule { }
