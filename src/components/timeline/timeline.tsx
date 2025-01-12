import React, { useEffect, useState } from "react";
import { recordsService } from "../../services/recordsService"; // Importe o serviço
import "./timeline.css";

interface Event {
  time: string | null;
  icon: boolean;
}

const Timeline: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    { time: null, icon: false },
    { time: null, icon: false },
    { time: null, icon: false },
    { time: null, icon: false },
  ]);

  const [workedHours, setWorkedHours] = useState<number>(0);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await recordsService.today();
        const { data } = response;
        console.log(response);
        const newEvents: Event[] = [
          {
            time: data.entry ? formatTime(data.entry) : null,
            icon: !!data.entry,
          },
          {
            time: data.lunchStart ? formatTime(data.lunchStart) : null,
            icon: !!data.lunchStart,
          },
          {
            time: data.lunchEnd ? formatTime(data.lunchEnd) : null,
            icon: !!data.lunchEnd,
          },
          { time: data.exit ? formatTime(data.exit) : null, icon: !!data.exit },
        ];

        setEvents(newEvents);
        setWorkedHours(data.workedHours);
      } catch (err) {
        console.error("Erro ao buscar os registros do dia:", err);
      }
    };

    getRecords();
  }, []);

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <div className="timeline">
        {events.map((event, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-point">
              {event.icon && (
                <span className="timeline-icon material-symbols-outlined">
                  done_all
                </span>
              )}
            </div>
            {event.time ? (
              <div className="timeline-time">{event.time}</div>
            ) : (
              <div className="timeline-time">-</div>
            )}
          </div>
        ))}
      </div>
      <div className="d-flex flex-column gap-3 ">
        <span className="text-center">
          Horas trabalhadas: <strong>{workedHours}</strong>
        </span>
        <button className="btn btn-warning text-white"> Registrar ponto</button>
      </div>
    </div>
  );
};

export default Timeline;
