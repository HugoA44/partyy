import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getMember } from "../services/api";

export const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [guests, setGuests] = useState([]);

  const getDatas = async () => {
    // On get les events et on les set dans le use state
    const events = await getEvent(id);
    setEvent(events);
    // on map les invités de l'événement
    events?.guests?.map(async (guest) => {
      // On récupère les infos des invités
      const member = await getMember(guest);
      try {
        // Et on les push dans le state
        setGuests((prev) => [...prev, member]);
      } catch {
        console.error("error");
      }
    });
  };
  useEffect(() => {
    getDatas();
  }, []);

  return (
    <div style={{ textAlign: "left" }}>
      <img
        alt={event.name}
        src={event?.image}
        style={{
          width: "100%",
          height: "20rem",
          objectFit: "cover",
        }}
      />
      <div style={{ padding: "0 5%" }}>
        <h1 style={{}}>{event.name}</h1>
        <p>{event?.description}</p>
        {event.begindate && (
          <p>
            {new Date(event?.begindate).toLocaleDateString()}{" "}
            {new Date(event?.begindate).toLocaleTimeString()}
          </p>
        )}
        <div>
          <h3>Invités</h3>
          <ul style={{ margin: 0, padding: 0 }}>
            {guests.map((guest) => {
              return (
                <li style={{ listStyle: "none ", margin: 0, padding: 0 }}>
                  {" "}
                  <img
                    src={guest?.picture}
                    alt={guest?.firstName}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "100%",
                      marginRight: "0.85rem",
                    }}
                  />
                  {guest.firstName + " " + guest.lastName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
