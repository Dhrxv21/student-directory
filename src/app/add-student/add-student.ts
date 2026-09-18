import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { Student } from '../student';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-student.html',
  styleUrl: './add-student.css'
})
export class AddStudent {

  // Reactive form containing the name and score fields.
  studentForm = new FormGroup({

    // Student name is required and needs at least 2 characters.
    name: new FormControl(
      '',
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(2)
        ]
      }
    ),

    // Student score is required and must be from 0 to 100.
    score: new FormControl<number | null>(
      null,
      [
        Validators.required,
        Validators.min(0),
        Validators.max(100)
      ]
    )
  });

  constructor(
    private studentService: Student,
    private router: Router
  ) {}

  // Makes the name control easier to access in the HTML.
  get nameControl() {
    return this.studentForm.controls.name;
  }

  // Makes the score control easier to access in the HTML.
  get scoreControl() {
    return this.studentForm.controls.score;
  }

  // Runs when the form is submitted.
  onSubmit(): void {

    // Display validation if the form is invalid.
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }

    // Read the values from the reactive form.
    const formValues =
      this.studentForm.getRawValue();

    // Stop if the score somehow has no value.
    if (formValues.score === null) {
      return;
    }

    const studentName =
      formValues.name.trim();

    const studentScore =
      formValues.score;

    // Add the student through the shared service.
    this.studentService.addStudent(
      studentName,
      studentScore
    );

    // Return to the directory.
    this.router.navigate(['/']);
  }
}