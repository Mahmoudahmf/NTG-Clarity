export interface Book {
  title: string;
  author_names: Author[];
  key: string;
  cover_id:number;
  first_publish_year:number;
  author_keys:Author[];
}

export interface Author {
  name: string;
}

export interface bookResponse {
  reading_log_entries: ReadingLogEntry[];
}

export interface ReadingLogEntry {
  work: Book;
}

export interface AuthorWork {
  title: string;
  key: string;
  authors: Author[];
  covers?: number[];
  subjects?: string[];
  description?: string;
  created: DateInfo;
  last_modified: DateInfo;
  birth_date?: string;

}

export interface DateInfo {
  type: string;
  value: string;
}

export interface AuthorResponse {
  links: {
    self: string;
    author: string;
  };
  size: number;
  entries: AuthorWork[];
}


export interface AuthorLink {
  url: string;
  title: string;
}

export interface AuthorBio {
  type: string;
  value: string;
}

export interface AuthorForBirthDate {
  key: string;
  name: string;
  personal_name?: string;
  birth_date?: string;
  death_date?: string | null;
  bio?: AuthorBio;
  location?: string;
  links?: AuthorLink[];
  photos?: number[];
  alternate_names?: string[];
  type: {
    key: string;
  };
}
