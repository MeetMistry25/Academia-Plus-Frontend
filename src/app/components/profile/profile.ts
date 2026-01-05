import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  imports: [RouterLink, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private apiService = inject(ApiService);

  student = signal<any>({
    name: 'Loading...',
    email: 'Loading...',
    joined: '...',
    major: '...',
    credits: 0,
    avatar: 'https://i.pravatar.cc/150?u=academia'
  });

  enrolledCourses = signal<any[]>([]);

  notifications = [
    { title: 'Assignment Due', message: 'Robotics Project Phase 1 is due in 2 days.', type: 'alert' },
    { title: 'New Material', message: 'Dr. Sarah posted a new reading in AI.', type: 'info' }
  ];

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const email = payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];

        this.apiService.getUserProfile(email).subscribe(user => {
          this.student.set({
            name: user.name,
            email: user.uniEmail,
            joined: 'Sep 2024',
            major: user.branch,
            credits: 0,
            avatar: 'https://i.pravatar.cc/150?u=academia'
          });
        });

        this.apiService.getEnrollments(email).subscribe(courses => {
          this.enrolledCourses.set(courses);
        });
      } catch (e) {
        console.error('Error decoding token', e);
      }
    }
  }

}

