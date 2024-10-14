import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author, AuthorResponse, AuthorWork } from 'src/app/dataModels/dataModel';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {
  author:any;
  workCount: number=0;
  topWork: string='';
  subjects: string[]=[];
  displayModes = {loading:"loading",success:"success",error:"error",noData:"noData"};
  displayMode:string ="";

  constructor(private appService:AppService, private router:Router) {

   }

  ngOnInit(): void {
    this.displayMode = this.displayModes.loading;
    if (history.state.author) {
      this.author = history.state.author;
      this.getAuthorDetails(this.author.author_key);
    } else {
      this.router.navigate(['/home']);
    }

  }

getAuthorDetails(authorKey:string){
  this.appService.getAuthorDetails(authorKey).subscribe((res:AuthorResponse)=>{
    this.workCount = res.size;
    this.topWork = res.entries[0]?.title;
     this.subjects = this.getTopSubjects(res.entries, 5);
     this.displayMode = this.displayModes.success;

  },err =>{
    this.displayMode = this.displayModes.error;
    console.log(err)}
  )
}



getTopSubjects(works: AuthorWork[], limit: number): string[] {
  const subjectsSet: string[] = []
  works.forEach(work => {
    if (work.subjects) {
      work.subjects.forEach(subject => subjectsSet.push(subject));
    }
  });
  return subjectsSet.slice(0, limit);
}

}
