import React from "react";
import "./timeline.css";

const Timeline: React.FC = () => {
  const events = [
    { time: "09:05", icon: true },
    { time: "12:07", icon: true },
    { time: "13:06", icon: true },
    { time: "19:00", icon: true },
  ];

  return (
    <div className="timeline">
      {events.map((event, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-point">
            {event.icon && (
              <span className="timeline-icon material-symbols-outlined">done_all</span>
            )}
          </div>
          {event.time && <div className="timeline-time">{event.time}</div>}
        </div>
      ))}
    </div>
  );
};

export default Timeline;
