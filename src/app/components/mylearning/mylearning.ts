import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mylearning',
  imports: [CommonModule, RouterLink],
  templateUrl: './mylearning.html',
  styleUrl: './mylearning.css',
})
export class Mylearning implements OnInit {
  private apiService = inject(ApiService);
  enrolledCourses = signal<any[]>([]);

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

        this.apiService.getEnrollments(email).subscribe({
          next: (courses) => {
            this.enrolledCourses.set(courses);
          },
          error: (err) => console.error('Error fetching enrollments', err)
        });
      } catch (e) {
        console.error('Error decoding token', e);
      }
    }
  }
}
