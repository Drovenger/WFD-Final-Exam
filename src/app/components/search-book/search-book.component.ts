import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IBook} from '../../models/ibook';
import {BookManagerService} from '../../services/book-manager.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  books$: Observable<IBook[]>;
  private searchedSubject = new Subject<string>();

  constructor(private bookManagerService: BookManagerService) {
  }

  ngOnInit(): void {
    this.books$ = this.searchedSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchedString: string) => this.bookManagerService.searchBook(searchedString))
    );
  }

  search(searchedString: string): void {
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }
}
