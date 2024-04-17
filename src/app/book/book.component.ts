import {Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit{

  books: Book[] = [];
  newBookTitle: string = '';
  newBookAuthor: string = '';

  randomId: number = 0;

  generateRandomId(): number{
    this.randomId = Math.floor((Math.random() * 100) + 1);
    return this.randomId;
  }

  ngOnInit(): void {
    let storedBooks = localStorage.getItem("books");
    storedBooks ? this.books = JSON.parse(storedBooks) : this.books = [];
  }

  addBook() {
    const newBook: Book = {
      id: this.generateRandomId(),
      title: this.newBookTitle,
      author: this.newBookAuthor
    }
    this.books.push(newBook)

    localStorage.setItem("books", JSON.stringify(this.books))

    this.newBookTitle = "";
    this.newBookAuthor = "";

  }

  deleteBook(id: number) {
    this.books = this.books.filter((book) => book.id !== id);
    localStorage.setItem("books", JSON.stringify(this.books))
  }

}
