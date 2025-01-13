import React, { useEffect, useState } from "react";
import { recordsService } from "../../services/recordsService"; // Importe o serviço
import "./timeline.css";
import { useRegisterPoint } from "../../hooks/useRegisterPoint";
import Loading from "../loading/loading";

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
  const [loading, setLoading] = useState(true);
  const { registerPoint } = useRegisterPoint();

  const fetchTodayRecords = async () => {
    try {
      const response = await recordsService.today();
      const { data } = response;
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
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar os registros do dia:", err);
    }
  };

  useEffect(() => {
    fetchTodayRecords();
  }, []);

  const handleRegisterPoint = async () => {
    try {
      await registerPoint();
      await fetchTodayRecords();
    } catch (err) {
      console.error("Erro ao registrar ponto:", err);
    }
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);

    date.setHours(date.getUTCHours() - 3);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatWorkedHours = (workedHours: number): string => {
    const totalSeconds = Math.round(workedHours * 3600);
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  if (loading) {
    return <Loading />;
  }

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
      <div className="d-flex flex-column gap-3 mt-5 ">
        <span className="text-center">
          Horas trabalhadas: <strong>{formatWorkedHours(workedHours)}</strong>
        </span>
        <button
          onClick={handleRegisterPoint}
          className="btn btn-warning text-white"
        >
          Registrar ponto
        </button>
      </div>
    </div>
  );
};

export default Timeline;
