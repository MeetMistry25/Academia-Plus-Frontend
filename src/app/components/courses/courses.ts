import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Subject as SubjectModel } from '../../models/api.models';

@Component({
  selector: 'app-courses',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  private apiService = inject(ApiService);
  searchQuery = signal('');
  selectedCategory = signal('All');

  categories = ['All', 'Technical', 'Soft Skills'];

  courses = signal<SubjectModel[]>([]);

  ngOnInit() {
    this.apiService.getSubjects().subscribe({
      next: (data) => {
        this.courses.set(data);
      },
      error: (err) => console.error('Error fetching courses:', err)
    });
  }

  filteredCourses = computed(() => {
    return this.courses().filter(course => {
      const matchesSearch = course.name.toLowerCase().includes(this.searchQuery().toLowerCase()) ||
        course.facultyName.toLowerCase().includes(this.searchQuery().toLowerCase());
      const matchesCategory = this.selectedCategory() === 'All' ||
        course.coreFocus.toLowerCase().includes(this.selectedCategory().toLowerCase());
      return matchesSearch && matchesCategory;
    });
  });
}

