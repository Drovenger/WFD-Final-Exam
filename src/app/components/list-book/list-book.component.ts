import {Component, OnInit} from '@angular/core';
import {IBook} from '../../models/ibook';
import {BookManagerService} from '../../services/book-manager.service';

declare var $: any;

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {
  listBook: IBook[] = [];

  constructor(private bookManagerService: BookManagerService) {
  }

  ngOnInit(): void {
    this.bookManagerService.getAllBook().subscribe(
      next => this.listBook = next,
      error => console.log(error)
    );
  }
}
