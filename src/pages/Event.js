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
    events?.guests?.map(async (guest) => {
      const member = await getMember(guest);

      setGuests([...guests, member]);
    });
  };

  //   const getDatas2 = async () => {
  //     event?.guests?.map(async (guest) => {
  //       const member = await getMember(guest);
  //       setGuests([...guests, member]);
  //     });
  //   };

  useEffect(() => {
    getDatas();
    // getDatas2();
  }, []);

  return (
    <div>
      <img
        alt={event.name}
        src={event?.image}
        style={{
          width: "100%",
          height: "20rem",
          objectFit: "cover",
        }}
      />
      <h1 style={{}}>{event.name}</h1>
      <div>
        <h3>Invités</h3>
        <ul></ul>
      </div>
    </div>
  );
};
