import {Component, OnInit} from '@angular/core';
import {IBook} from '../../models/ibook';
import {BookManagerService} from '../../services/book-manager.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  book: IBook;

  constructor(private bookManagerService: BookManagerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookManagerService.getBookById(+id).subscribe(
      next => this.book = next
    );
  }

  delete() {
    this.bookManagerService.deleteBook(this.book.id).subscribe(
      next => this.router.navigateByUrl('/books'),
      error => console.log(error));
  }
}

