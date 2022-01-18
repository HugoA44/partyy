import { useEffect, useState } from "react";
import { EventCard } from "../components/Events/EventCard";
import { getEvents } from "../services/api";

export function Home() {
  const [events, setEvents] = useState([]);

  const getDatas = async () => {
    const events = await getEvents();
    setEvents(events);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className="home">
      {events?.map((event) => {
        return <EventCard event={event} />;
      })}
    </div>
  );
}
