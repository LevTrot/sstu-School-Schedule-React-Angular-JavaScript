import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grades-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades-management.component.html',
  styleUrls: ['./grades-management.component.css']
})
export class GradesManagementComponent implements OnInit {
  grades: any[] = [];
  newGrade = {
    student_id: '',
    subject_id: '',
    grade: '',
    date: ''
  };

  editId: number | null = null;

  students: any[] = [];
  subjects: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadGrades();
    this.loadStudents();
    this.loadSubjects();
  }

  loadStudents() {
    this.http.get<any[]>('http://localhost:8080/api/students').subscribe(data => this.students = data);
  }

  loadSubjects() {
    this.http.get<any[]>('http://localhost:8080/api/subjects').subscribe(data => this.subjects = data);
  }

  loadGrades() {
    this.http.get<any[]>('http://localhost:8080/api/grades/all')
      .subscribe(data => this.grades = data);
  }

  addGrade() {
    if (!this.newGrade.student_id || !this.newGrade.subject_id || !this.newGrade.grade || !this.newGrade.date) return;

    this.http.post('http://localhost:8080/api/grades', this.newGrade)
      .subscribe(() => {
        this.loadGrades();
        this.newGrade = { student_id: '', subject_id: '', grade: '', date: '' };
      });
  }

  deleteGrade(id: number) {
    this.http.delete(`http://localhost:8080/api/grades/${id}`)
      .subscribe(() => this.loadGrades());
  }

  enableEdit(grade: any) {
    this.editId = grade.id;
  }

  saveGrade(grade: any) {
    this.http.put(`http://localhost:8080/api/grades/${grade.id}`, grade)
      .subscribe(() => {
        this.editId = null;
        this.loadGrades();
      });
  }
}
