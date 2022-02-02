import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent, getMember } from "../services/api";

export const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);
  const [guests, setGuests] = useState([]);

  const getDatas = async () => {
    const events = await getEvent(id);
    setEvent(events);
    event?.guests?.map(async (guest) => {
      const member = await getMember(guest);
      try {
        console.log(member);
        setGuests((previous) => [...previous, member]);
      } catch {
        console.error("error");
      }
    });
  };
  useEffect(() => {
    getDatas();
  }, []);
  const getDatas2 = async (event) => {
    event?.guests?.map(async (guest) => {
      const member = await getMember(guest);

      setGuests([...guests, member]);
    });
  };

  useEffect(() => {
    getDatas2(event);
  }, [event]);

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
