# Student Directory

A responsive Angular application for viewing and managing student records.

The project loads student information from an external API and allows users to search the directory, view individual student details, add temporary student records, show or hide scores, and mark students as favourites.

## Features

- View student records loaded from an API
- Search for students by name
- Open an individual student detail page
- Add a new student with a name and score
- Validate student details using Angular Reactive Forms
- Show or hide student scores
- Mark students as favourites
- Filter the directory to show favourite students only
- Display loading and error states
- Responsive layout for desktop, tablet and mobile screens
- CSS animations and visual effects

## Technologies Used

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- Angular Reactive Forms
- Angular Signals
- RxJS
- HttpClient
- JSONPlaceholder API

## Install the Project

Clone the repository:

```bash
git clone https://github.com/Dhrxv21/student-directory.git

cd C:\Users\dhruvdeb\programming-essentials\student-directory

git checkout main

git pull origin main

@'
# Student Directory

A responsive Angular application for viewing and managing student records.

The project loads student information from an external API and allows users to search the directory, view individual student details, add temporary student records, show or hide scores, and mark students as favourites.

## Features

- View student records loaded from an API
- Search for students by name
- Open an individual student record
- Add a new student with a name and score
- Validate student details using Angular Reactive Forms
- Show or hide student scores
- Mark students as favourites
- Filter the directory to show favourite students only
- Display loading and error states
- Responsive design for desktop, tablet and mobile screens
- CSS animations and visual effects

## Technologies Used

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- Angular Reactive Forms
- Angular Signals
- RxJS
- HttpClient
- JSONPlaceholder API
- Git
- GitHub

## Installation

Clone the repository:

```bash
git clone https://github.com/Dhrxv21/student-directory.git
```

Move into the project folder:

```bash
cd student-directory
```

Install the project dependencies:

```bash
npm install
```

## Running the Application

Start the Angular development server:

```bash
ng serve
```

Open the application in a browser at:

```text
http://localhost:4200
```

The application will automatically reload when project files are changed and saved.

## Available Routes

```text
/                    Student directory
/student/:id         Individual student details
/add-student         Add Student form
```

## Project Structure

```text
src/app/
├── add-student/
│   ├── add-student.ts
│   ├── add-student.html
│   └── add-student.css
├── student-card/
│   ├── student-card.ts
│   ├── student-card.html
│   └── student-card.css
├── student-detail/
│   ├── student-detail.ts
│   ├── student-detail.html
│   └── student-detail.css
├── student-list/
│   ├── student-list.ts
│   ├── student-list.html
│   └── student-list.css
├── app.config.ts
├── app.html
├── app.routes.ts
├── app.ts
└── student.ts
```

## API

The original student records are loaded from the JSONPlaceholder API:

```text
https://jsonplaceholder.typicode.com/users
```

Angular HttpClient sends the API request through the shared Student service.

The API data is converted into the StudentData structure used by the application.

## Data Storage

New students and favourite selections are stored temporarily in memory.

They remain available while navigating between pages, but reset after a full browser refresh.

Permanent storage would require a backend service or database.

## Form Validation

The Add Student page uses Angular Reactive Forms.

The validation rules are:

- Student name is required
- Student name must contain at least two characters
- Student score is required
- Student score must be between 0 and 100

The submit button remains disabled until the form is valid.

## Main Functionality

### Student Search

The search input filters the student directory by name.

### Student Details

Selecting a student card opens an individual detail page using the student's ID in the route.

### Add Student

The Add Student form creates a temporary student record containing a name and score.

### Favourites

Students can be marked as favourites.

The favourites-only filter displays only students that have been marked as favourites.

### Loading and Errors

A loading state appears while student records are being retrieved.

An error message and retry button appear if the API request fails.

## Build the Application

Create a production build using:

```bash
ng build
```

The completed build files will be created in the `dist` folder.

## Limitations

- Added students disappear after a full browser refresh
- Favourite selections disappear after a full browser refresh
- JSONPlaceholder does not provide real student scores
- Permanent storage would require a backend or database

## Author

Dhruv

GitHub: Dhrxv21
