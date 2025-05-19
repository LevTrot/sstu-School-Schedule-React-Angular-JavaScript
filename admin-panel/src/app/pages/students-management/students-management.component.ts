import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-management',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './students-management.component.html',
  styleUrl: './students-management.component.css'
})
export class StudentsManagementComponent {
  students: any[] = [];
  newStudent = { name: '',  email: '', studentClass: '', role: 'student', password: '' };
  editingId: number | null = null;
  editedStudent: any = {};
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
  this.http.get<any[]>('http://localhost:8080/api/students')
    .subscribe(data => {
      this.students = data.map(s => ({
        ...s,
        studentClass: s.class
      }));
    });
}

  addStudent() {
    if (!this.newStudent.name || !this.newStudent.studentClass || !this.newStudent.email || !this.newStudent.role || !this.newStudent.password) {
      return;
    }
    console.log(this.newStudent); 
    this.http.post('http://localhost:8080/api/students', this.newStudent)
      .subscribe(() => {
        this.loadStudents();
        this.newStudent = { name: '', email: '', studentClass: '', role: '', password: '' };
      });
  }

  startEdit(student: any) {
    this.editingId = student.id;
    this.editedStudent = { ...student };
  }

  cancelEdit() {
    this.editingId = null;
    this.editedStudent = {};
  }

  deleteStudent(id: number) {
    this.http.delete(`http://localhost:8080/api/students/${id}`)
      .subscribe(() => this.loadStudents());
  }

  updateStudent(id: number) {
    this.http.put<any>(`http://localhost:8080/api/students/${id}`, this.editedStudent).subscribe(() => {
      this.editingId = null;
      this.editedStudent = {};
      this.loadStudents();
    });
  }
}
