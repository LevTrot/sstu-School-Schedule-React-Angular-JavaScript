import { Component, OnInit } from '@angular/core';
//import { ScheduleService } from '../../services/schedule.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface ScheduleEntry {
  subject_id: number | null;
  teacher_id: number | null;
  day_of_week: string;
  start_time: string;
  end_time: string;
  class: string;
}

@Component({
  selector: 'app-schedule-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-management.component.html',
  styleUrl: './schedule-management.component.css'
})
export class ScheduleManagementComponent implements OnInit {
  // Дни недели и время уроков
  days: string[] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  times = [
    { start: '08:00', end: '08:45' },
    { start: '09:00', end: '09:45' },
    { start: '10:00', end: '10:45' },
    { start: '11:00', end: '11:45' },
    { start: '12:00', end: '12:45' },
    { start: '13:00', end: '13:45' },
  ];

  // Массивы предметов и учителей
  subjects: any[] = [];
  teachers: any[] = [];

  // Введённый пользователем класс
  selectedClass: string = '9А';

  // Таблица ввода и загруженные уроки
  scheduleTable: any = {};
  submittedSchedules: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initScheduleTable();
    this.loadSubjects();
    this.loadTeachers();
  }

  initScheduleTable() {
    this.scheduleTable = {};
    for (const day of this.days) {
      this.scheduleTable[day] = {};
      for (const time of this.times) {
        this.scheduleTable[day][time.start] = {
          subject_id: null,
          teacher_id: null,
        };
      }
    }
  }

  // Кнопка "Показать расписание"
  loadSchedulesForClass() {
    this.http
      .get<any[]>(`http://localhost:8080/api/schedule/${this.selectedClass}`)
      .subscribe((data) => {
        this.submittedSchedules = data;
        this.fillBusyCells();
      });
  }

  fillBusyCells() {
    this.initScheduleTable(); // обнулим всё
    for (const entry of this.submittedSchedules) {
      const day = entry.day_of_week;
      const time = entry.start_time.slice(0, 5); // '08:00'
      this.scheduleTable[day][time] = {
        busy: true,
        subject_name: entry.subject_name,
        teacher_name: entry.teacher_name,
        subject_id: entry.subject_id,
        teacher_id: entry.teacher_id,
      };
    }
  }

  loadSubjects() {
    this.http.get<any[]>('http://localhost:8080/api/subjects').subscribe((data) => {
      this.subjects = data;
    });
  }

  loadTeachers() {
    this.http.get<any[]>('http://localhost:8080/api/teachers').subscribe((data) => {
      this.teachers = data;
    });
  }

  // Отправка всех новых значений
  submitSchedule() {
    const entries = [];

    for (const day of this.days) {
      for (const time of this.times) {
        const cell = this.scheduleTable[day][time.start];
        if (cell.subject_id && cell.teacher_id && !cell.busy) {
          entries.push({
            class: this.selectedClass,
            day_of_week: day,
            start_time: time.start,
            end_time: time.end,
            subject_id: cell.subject_id,
            teacher_id: cell.teacher_id,
          });
        }
      }
    }

    this.http
      .post('http://localhost:8080/api/schedule/', entries)
      .subscribe(() => {
        this.loadSchedulesForClass();
      });
  }

  deleteSchedule(id: number) {
    this.http.delete(`http://localhost:8080/api/schedule/${id}`).subscribe(() => {
      this.loadSchedulesForClass();
    });
  }
}