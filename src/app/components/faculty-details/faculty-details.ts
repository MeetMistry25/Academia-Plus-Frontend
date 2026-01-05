import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Faculty as FacultyModel } from '../../models/api.models';

@Component({
  selector: 'app-faculty-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './faculty-details.html',
  styleUrl: './faculty-details.css',
})
export class FacultyDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  faculty = signal<FacultyModel | null>(null);
  role = signal<'student' | 'faculty' | 'admin' | null>(localStorage.getItem('role') as any);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getFaculty(id).subscribe({
        next: (data) => this.faculty.set(data),
        error: (err) => console.error('Error fetching faculty details:', err)
      });
    }
  }
}

