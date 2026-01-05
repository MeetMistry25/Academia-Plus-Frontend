import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  role = signal<'student' | 'faculty' | 'admin' | null>(localStorage.getItem('role') as any);

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.role.set(null);
    window.location.reload(); // Quick way to reset all states
  }
}

