import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { HomeComponent } from './components/home/home.component';
import { AuthorDetailsComponent } from './components/author-details/author-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'book/:id', component: BookDetailsComponent },
  { path: 'author', component: AuthorDetailsComponent },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
