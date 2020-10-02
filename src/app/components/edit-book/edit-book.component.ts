import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IBook} from '../../models/ibook';
import {BookManagerService} from '../../services/book-manager.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  formEdit: FormGroup;
  book: IBook;

  constructor(private bookManagerService: BookManagerService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formEdit = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      description: ['']
    });
    let id;
    this.route.paramMap.subscribe(
      (paramMap: ParamMap) => id = paramMap.get('id')
    );
    this.bookManagerService.getBookById(+id).subscribe(
      next => {
        this.book = next;
        this.formEdit.patchValue(this.book);
      },
      error => console.log(error)
    );
  }

  update() {
    if (this.formEdit.valid) {
      const data = this.formEdit.value;
      this.bookManagerService.updateBook(data).subscribe(
        next => this.router.navigateByUrl('/books'),
        error => console.log(error)
      );
    } else {
      alert('Data is invalid');
    }
  }
}
