import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author, Book, bookResponse } from 'src/app/dataModels/dataModel';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  bookData: any;
  isInWishlist: boolean = false;
  combinedAuthors: { author_key: string; author_name: string }[] = [];
  displayModes = {loading:"loading",success:"success",error:"error",noData:"noData"};
  displayMode:string ="";
  constructor(private router: Router, private appService:AppService) {

  }

  ngOnInit(): void {
    this.displayMode = this.displayModes.loading;

    if (history.state.book) {
      this.bookData = history.state.book;
      this.combineAuthors();
      this.displayMode = this.displayModes.success;
    } else {
      this.router.navigate(['/home']);
    }

  }

  toggleWishlist() {
    this.isInWishlist = !this.isInWishlist;
  }

  goToAuthorDetails(author:Object){
    this.router.navigate(['/author'], { state: { author } });

  }

  combineAuthors() {
    const { author_keys, author_names } = this.bookData;
    if (author_keys.length === author_names.length) {
      this.combinedAuthors = author_keys.map((key: string, index: number) => ({
        author_key: key,
        author_name: author_names[index]
      }));
    }
  }

}
