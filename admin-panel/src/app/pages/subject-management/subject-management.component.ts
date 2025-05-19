import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subject-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subject-management.component.html',
  styleUrl: './subject-management.component.css'
})
export class SubjectManagementComponent implements OnInit {
  subjects: any[] = [];
  newSubject = { name: '' };
  editId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSubjects();
  }

  loadSubjects() {
    this.http.get<any[]>('http://localhost:8080/api/subjects')
      .subscribe(data => this.subjects = data);
  }

  addSubject() {
    if (!this.newSubject.name) return;
    this.http.post('http://localhost:8080/api/subjects', this.newSubject)
      .subscribe(() => {
        this.loadSubjects();
        this.newSubject = { name: '' };
      });
  }

  deleteSubject(id: number) {
    this.http.delete(`http://localhost:8080/api/subjects/${id}`)
      .subscribe(() => this.loadSubjects());
  }

  enableEdit(subject: any) {
    this.editId = subject.id;
  }

  saveSubject(subject: any) {
    this.http.put(`http://localhost:8080/api/subjects/${subject.id}`, { name: subject.name })
      .subscribe(() => {
        this.editId = null;
        this.loadSubjects();
      });
  }
}
