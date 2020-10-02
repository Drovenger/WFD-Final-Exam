import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBook} from '../../models/ibook';
import {BookManagerService} from '../../services/book-manager.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  formBook: FormGroup;
  book: IBook;

  constructor(private formBuilder: FormBuilder,
              private bookManagerService: BookManagerService,
              private router: Router) {
    this.book = {
      id: +'',
      title: '',
      author: '',
      description: ''
    };
  }

  ngOnInit(): void {
    this.formBook = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['']
    });
  }

  add() {
    if (this.formBook.valid) {
      this.bookManagerService.createBook(this.book).subscribe(
        next => this.router.navigateByUrl('/books'),
        error => console.log(error)
      );
    } else {
      alert('Data is invalid');
    }
  }
}
