import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteEvent, getMember } from "../../services/api";

export function EventCard({ event }) {
  const [guests, setGuests] = useState([]);

  const getDatas = async () => {
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
  console.log(event);
  console.log(guests);

  const handleDelete = async () => {
    await deleteEvent(event._id);
  };

  return (
    <div
      style={{
        height: "12rem",

        position: "relative",
        width: "100vw",
      }}
    >
      <FaTimes
        color="white"
        fontSize="2rem"
        style={{ position: "absolute", left: "1rem", top: "1rem", zIndex: 100 }}
        onClick={handleDelete}
      />
      <Link to={`/event/${event._id}`}>
        <div
          style={{
            background: `linear-gradient(#00000000, #000000), url('${event.image}')`,
            height: "12rem",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            width: "100vw",
          }}
        >
          <h2
            style={{
              color: "white",
              margin: 0,
              padding: 0,
              position: "absolute",
              bottom: 55,
              left: 20,
            }}
          >
            {event.name}
          </h2>
          <div
            className="guests"
            style={{ position: "absolute", bottom: 15, left: 20 }}
          >
            {guests.map((guest, idx) => {
              return (
                <img
                  style={{
                    backgroundColor: "white",
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "100%",
                    border: `${
                      guest?._id === event.creator && "0.2rem yellow solid"
                    }`,
                    objectFit: "cover",
                    marginRight: "0.5rem",
                  }}
                  alt="person"
                  src={
                    guest?.picture ||
                    "https://jsl-online.com/wp-content/uploads/2017/01/placeholder-user.png"
                  }
                />
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}
