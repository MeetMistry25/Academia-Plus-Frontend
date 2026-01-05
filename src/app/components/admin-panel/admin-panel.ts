import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-admin-panel',
    imports: [CommonModule, RouterLink],
    templateUrl: './admin-panel.html',
    styleUrl: './admin-panel.css',
})
export class AdminPanel {
    stats = [
        { label: 'Total Students', value: '12,450', trend: '+12%', icon: 'users' },
        { label: 'Active Courses', value: '482', trend: '+5%', icon: 'book' },
        { label: 'Faculty Members', value: '156', trend: '+2%', icon: 'briefcase' },
        { label: 'Monthly Revenue', value: '$84,200', trend: '+18%', icon: 'dollar' }
    ];

    recentEnrollments = [
        { id: 1, student: 'John Smith', course: 'Machine Learning', date: '2024-03-20', status: 'Completed' },
        { id: 2, student: 'Emily Blunt', course: 'Digital Arts', date: '2024-03-19', status: 'Pending' },
        { id: 3, student: 'Michael Bay', course: 'Business Strategy', date: '2024-03-18', status: 'Active' },
        { id: 4, student: 'Sarah Connor', course: 'Robotics 101', date: '2024-03-17', status: 'Active' }
    ];
}
