import {
  Component,
  signal
} from '@angular/core';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterLink
} from '@angular/router';

import {
  finalize
} from 'rxjs';

import {
  StudentCard
} from '../student-card/student-card';

import {
  Student,
  StudentData
} from '../student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    StudentCard
  ],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css'
})
export class StudentList {

  // Connected to the search input.
  searchTerm = '';

  // Controls the details shown by student cards.
  showDetails = true;

  // Controls the favourites-only checkbox.
  showFavouritesOnly = false;

  // Stores all student records.
  students =
    signal<StudentData[]>([]);

  // API loading and error states.
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private studentService: Student
  ) {
    this.loadStudents();
  }

  // Loads students through the service.
  loadStudents(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.studentService
      .getStudents()
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: students => {
          this.students.set(students);
        },

        error: error => {
          console.error(
            'Unable to load students:',
            error
          );

          this.errorMessage.set(
            'The student records could not be loaded.'
          );
        }
      });
  }

  /*
    Applies the name search and then optionally
    filters the list to favourites.
  */
  get filteredStudents(): StudentData[] {
    const searchValue =
      this.searchTerm
        .trim()
        .toLowerCase();

    let results =
      this.students().filter(student =>
        student.name
          .toLowerCase()
          .includes(searchValue)
      );

    if (this.showFavouritesOnly) {
      results = results.filter(
        student => student.favourite
      );
    }

    return results;
  }

  /*
    Toggles the favourite value in the service and
    updates the signal so the HTML refreshes.
  */
  toggleFavourite(
    studentId: number
  ): void {

    const newFavouriteValue =
      this.studentService
        .toggleFavourite(studentId);

    this.students.update(students =>
      students.map(student => {

        if (student.id === studentId) {
          return {
            ...student,
            favourite: newFavouriteValue
          };
        }

        return student;
      })
    );
  }

  // Shows or hides details on every card.
  toggleDetails(): void {
    this.showDetails =
      !this.showDetails;
  }
}