import React, { useState } from 'react';
import axios from 'axios';
import './SchedulePage.css';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00'];

const ScheduleViewer = ({ defaultClass }) => {
  const [selectedClass, setSelectedClass] = useState(defaultClass || '');
  const [schedule, setSchedule] = useState({});
  const [loaded, setLoaded] = useState(false);

  const loadSchedule = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/schedule/${selectedClass}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      const table = {};
      for (const day of days) {
        table[day] = {};
        for (const time of times) {
          table[day][time] = null;
        }
      }
      for (const entry of res.data) {
        const day = entry.day_of_week;
        const time = entry.start_time.slice(0, 5);
        table[day][time] = {
          subject: entry.subject_name,
          teacher: entry.teacher_name,
        };
      }
      setSchedule(table);
      setLoaded(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="schedule-container">
      <div className="schedule-form">
        <input
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          placeholder="Введите класс"
        />
        <button onClick={loadSchedule}>Показать</button>
      </div>

      {loaded && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Время</th>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, idx) => (
              <tr key={idx}>
                <td>{time}–{add45Minutes(time)}</td>
                {days.map((day) => (
                  <td key={day}>
                    {schedule[day][time] ? (
                      <>
                        <div><b>{schedule[day][time].subject}</b></div>
                        <div>{schedule[day][time].teacher}</div>
                      </>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const add45Minutes = (time) => {
  const [h, m] = time.split(':').map(Number);
  const end = new Date(0, 0, 0, h, m + 45);
  return end.toTimeString().slice(0, 5);
};

export default ScheduleViewer;
