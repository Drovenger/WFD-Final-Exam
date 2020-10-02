import {Component, OnInit} from '@angular/core';
import {IBook} from '../../models/ibook';
import {BookManagerService} from '../../services/book-manager.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {
  book: IBook;

  constructor(private bookManagerService: BookManagerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.bookManagerService.getBookById(+id).subscribe(
      next => this.book = next,
      error => console.log(error)
    );
  }

}
