import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Book } from 'src/app/dataModels/dataModel';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books: Book[] = [];
  displayModes = {loading:"loading",success:"success",error:"error",noData:"noData"};
  displayMode:string ="";
  constructor(private appService: AppService, private router:Router ) { }

  ngOnInit(): void {
    this.displayMode = this.displayModes.loading
    this.appService.getBooks().subscribe((res: Book[]) => {
      res.forEach((book)=>{
        book.author_names.map(a => a.name).join(', ')
      })
      this.books = res;
      if (this.books.length > 0) {
        this.displayMode = this.displayModes.success;
      }else{
        this.displayMode = this.displayModes.noData;
      }
      this.displayMode = this.displayModes.success;
    },error => {console.log(error)
      this.displayMode = this.displayModes.error
    }
    );
  }


  goToDetails(book:Book){

    this.router.navigate(['/book', book.cover_id], { state: { book } });
  }

}
