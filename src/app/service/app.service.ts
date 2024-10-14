import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Author, AuthorForBirthDate, AuthorResponse, Book, bookResponse } from '../dataModels/dataModel';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = 'https://openlibrary.org';

  private dataSubject = new Subject<any>();

  constructor(private http: HttpClient) { }


  dataBook$ = this.dataSubject.asObservable();

  sendData(data: any) {
    this.dataSubject.next(data);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<bookResponse>(`${this.baseUrl}/people/mekBot/books/want-to-read.json`).pipe(
      map((response: bookResponse) => {
        return response.reading_log_entries.slice(0, 9).map((entry: { work: any; }) => entry.work);
      })
    );
  }

  getAuthorDetails(authorKey: string): Observable<AuthorResponse> {
    return this.http.get<AuthorResponse>(`${this.baseUrl}/${authorKey}/works.json`);
  }



}
