import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { EventCard } from "../components/Events/EventCard";
import { getEvents } from "../services/api";

export function Home() {
  const [events, setEvents] = useState([]);

  // On récupère les événements
  const getDatas = async () => {
    const events = await getEvents();
    setEvents(events);
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div className="home">
      <div className="events" style={{ marginBottom: "5rem" }}>
        <EventCard
          event={events[0]}
          height="12rem"
          width="100vw"
          isMain={true}
        />
        <Typography variant="h5" sx={{ mt: 3 }}>
          Les autres événements Partyy
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflow: "scroll",
            padding: "0 5%",
            gap: 3,
            "::-webkit-scrollbar ": {
              display: "none",
            },
          }}
          className="other-events"
        >
          {events?.map((event) => {
            return (
              <EventCard
                event={event}
                height="7rem"
                width="50vw"
                style={{ marginRight: "1rem" }}
              />
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            mt: 3,
          }}
        >
          {events?.map((event) => {
            return (
              <EventCard
                event={event}
                height="12rem"
                width="90VW"
                style={{ marginRight: "1rem" }}
              />
            );
          })}
        </Box>
      </div>
    </div>
  );
}
