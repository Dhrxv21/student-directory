import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Student, StudentData } from '../student';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './student-detail.html',
  styleUrl: './student-detail.css'
})
export class StudentDetail {
  student = signal<StudentData | null>(null);
  loading = signal(false);
  errorMessage = signal('');

  constructor(
    private route: ActivatedRoute,
    private studentService: Student
  ) {
    this.loadStudent();
  }

  loadStudent() {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      this.errorMessage.set('Invalid student ID.');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.student.set(null);

    this.studentService
      .getStudentById(id)
      .pipe(
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe({
        next: student => {
          this.student.set(student);
        },

        error: error => {
          console.error(
            'Could not load student:',
            error
          );

          this.errorMessage.set(
            'The selected student could not be loaded.'
          );
        }
      });
  }
}