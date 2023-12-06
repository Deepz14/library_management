import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "../models/book";

@Injectable({
    providedIn: 'root'
})

export class BookService {
    private apiUrl = '/api/books';
    constructor(private http: HttpClient) {}

    getBooks() {
        return this.http.get(this.apiUrl);
    }

    addBook(book: Book){
        let payload = {...book, borrowed_by: [], returned_by: []}
        return this.http.post<Book[]>(this.apiUrl, payload);
    }

    editBook(book: Book, id: number){
        return this.http.put<Book[]>(this.apiUrl + `/${id}`, book);
    }

    getBookById(id: number){
        return this.http.get<Book>(`${this.apiUrl}/${id}`);
    }

    borrowBook(book: Book, id: number){
        return this.http.patch(`${this.apiUrl}/${id}`, book);
    }

    returnBook(book: Book, id: number){
        return this.http.patch(`${this.apiUrl}/${id}`, book);
    }
}