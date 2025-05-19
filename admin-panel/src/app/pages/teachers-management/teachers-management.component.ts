import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teachers-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teachers-management.component.html',
  styleUrls: ['./teachers-management.component.css']
})
export class TeachersManagementComponent implements OnInit {
  teachers: any[] = [];
  newTeacher = { name: '', email: '', password: '', role: 'teacher' };
  editingId: number | null = null;
  editedTeacher: any = {};
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.http.get<any[]>('http://localhost:8080/api/teachers')
      .subscribe(data => this.teachers = data);
  }

  createTeacher() {
    if (!this.newTeacher.name || !this.newTeacher.email || !this.newTeacher.password) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.http.post<any>('http://localhost:8080/api/teachers', this.newTeacher)
      .subscribe({
        next: (created) => {
          this.teachers.push(created);
          this.newTeacher = { name: '', email: '', password: '', role: 'teacher' };
          this.error = '';
        },
        error: () => {
          this.error = 'Error creating teacher.';
        }
      });
  }

  deleteTeacher(id: number) {
    this.http.delete(`http://localhost:8080/api/teachers/${id}`)
      .subscribe(() => {
        this.teachers = this.teachers.filter(t => t.id !== id);
      });
  }

  startEdit(teacher: any) {
    this.editingId = teacher.id;
    this.editedTeacher = { ...teacher };
  }

  cancelEdit() {
    this.editingId = null;
    this.editedTeacher = {};
  }

  updateTeacher(id: number) {
    if (!this.editedTeacher.name || !this.editedTeacher.email) {
      this.error = 'Name and email are required.';
      return;
    }

    this.http.put<any>(`http://localhost:8080/api/teachers/${id}`, this.editedTeacher)
      .subscribe({
        next: (updated) => {
          const index = this.teachers.findIndex(t => t.id === id);
          if (index > -1) this.teachers[index] = updated;
          this.cancelEdit();
          this.error = '';
        },
        error: () => {
          this.error = 'Error updating teacher.';
        }
      });
  }
}
