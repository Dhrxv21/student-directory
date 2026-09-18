import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-student-card',
  standalone: true,
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  @Input() name = '';
  @Input() score = 0;
  @Input() showDetails = true;

}


