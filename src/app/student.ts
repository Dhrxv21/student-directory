import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {
  Observable,
  map,
  of,
  tap
} from 'rxjs';

/*
  Student structure used by the application.

  favourite is added by this application because
  JSONPlaceholder does not provide that property.
*/
export interface StudentData {
  id: number;
  name: string;
  score?: number;
  favourite: boolean;
  username: string;
  email: string;
  phone: string;
  website: string;

  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;

    geo: {
      lat: string;
      lng: string;
    };
  };

  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/*
  Structure returned directly by the API.

  This does not include score or favourite.
*/
interface ApiStudent {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;

  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;

    geo: {
      lat: string;
      lng: string;
    };
  };

  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class Student {

  // API used to load the original students.
  private readonly apiUrl =
    'https://jsonplaceholder.typicode.com/users';

  // Stores API students after the initial request.
  private apiStudents: StudentData[] = [];

  // Stores students created through the Add Student form.
  private addedStudents: StudentData[] = [];

  // Prevents unnecessary repeat API calls.
  private studentsLoaded = false;

  constructor(
    private http: HttpClient
  ) {}

  /*
    Returns API students and manually added students.

    API data is requested only once while the app
    remains open.
  */
  getStudents(): Observable<StudentData[]> {

    if (this.studentsLoaded) {
      return of(this.getCombinedStudents());
    }

    return this.http
      .get<ApiStudent[]>(this.apiUrl)
      .pipe(

        // Add favourite: false to every API student.
        map(apiStudents =>
          apiStudents.map(student => ({
            ...student,
            favourite: false
          }))
        ),

        // Store the converted API students.
        tap(students => {
          this.apiStudents = students;
          this.studentsLoaded = true;
        }),

        // Return API and manually added students.
        map(() => this.getCombinedStudents())
      );
  }

  /*
    Returns one student by ID.

    The in-memory arrays are checked first so manually
    added students can also open on the detail page.
  */
  getStudentById(
    id: number
  ): Observable<StudentData> {

    const storedStudent =
      this.getCombinedStudents().find(
        student => student.id === id
      );

    if (storedStudent) {
      return of(storedStudent);
    }

    // Request the student if it has not been cached.
    return this.http
      .get<ApiStudent>(
        `${this.apiUrl}/${id}`
      )
      .pipe(
        map(student => ({
          ...student,
          favourite: false
        }))
      );
  }

  /*
    Adds a temporary student.

    The student disappears after a full browser refresh.
  */
  addStudent(
    name: string,
    score: number
  ): StudentData {

    const newStudent: StudentData = {
      id: Date.now(),
      name: name,
      score: score,
      favourite: false,

      username: name
        .toLowerCase()
        .replace(/\s+/g, ''),

      email: 'Not provided',
      phone: 'Not provided',
      website: 'Not provided',

      address: {
        street: 'Not provided',
        suite: '',
        city: 'Not provided',
        zipcode: 'Not provided',

        geo: {
          lat: '',
          lng: ''
        }
      },

      company: {
        name: 'Not provided',
        catchPhrase: '',
        bs: ''
      }
    };

    this.addedStudents.push(newStudent);

    return newStudent;
  }

  /*
    Adds or removes a student from favourites.

    The value is held in memory and resets after
    refreshing the browser.
  */
  toggleFavourite(
    studentId: number
  ): boolean {

    const student =
      this.getCombinedStudents().find(
        currentStudent =>
          currentStudent.id === studentId
      );

    if (!student) {
      return false;
    }

    student.favourite =
      !student.favourite;

    return student.favourite;
  }

  // Combines the API and manually added students.
  private getCombinedStudents(): StudentData[] {
    return [
      ...this.apiStudents,
      ...this.addedStudents
    ];
  }
}