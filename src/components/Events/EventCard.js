import { css } from "@emotion/react";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteEvent, getMember } from "../../services/api";

export function EventCard({ event, height, width, isMain }) {
  // On initie l'état d'invité
  const [guests, setGuests] = useState([]);

  // On load les datas de l'api afin de récupérer les invités de l'événement
  const getDatas = async () => {
    // On map les id d'invités et on les envoie à l'api pour récupérer les infos du membre
    event?.guests?.map(async (guest) => {
      const member = await getMember(guest);
      try {
        setGuests((previous) => [...previous, member]);
      } catch {
        console.error("error");
      }
    });
  };

  // On utilise le hook useEffect pour appeler la récupération des données au chargement du composant
  useEffect(() => {
    getDatas();
  }, []);

  // On créé la fonction à appeler lors de la suppression de l'élément (Je l'ai désactive pour la version en ligne)
  const handleDelete = async () => {
    await deleteEvent(event?._id);
  };

  return (
    <div
      style={{
        height: height,
        width: width,

        position: "relative",
      }}
    >
      {/* <FaTimes
        color="white"
        fontSize="1rem"
        style={{ position: "absolute", left: "1rem", top: "1rem", zIndex: 10 }}
        onClick={handleDelete}
      /> */}
      <Link to={`/event/${event?._id}`}>
        <div
          style={{
            background: `linear-gradient(#00000000, #000000) , url('${event?.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            height,
            width,
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
            {event?.name}
          </h2>
          {isMain && (
            <p
              style={{
                backgroundColor: "#ddae2b",
                padding: "1rem 0.5rem",
                color: "blue",
                textDecoration: "non",
                width: "20%",
                borderRadius: "4px",
                position: "absolute",
                bottom: 0,
                right: "2rem",
                color: "white",
              }}
            >
              Événement en avant
            </p>
          )}
          {/* Si la date existe, on l'affiche */}
          {event?.begindate && (
            <Box
              sx={{
                backgroundColor: "#ddae2b",
                padding: "3px",
                position: "absolute",
                borderRadius: "4px",
                bottom: 5,
                right: 5,
              }}
            >
              <p
                style={{
                  color: "white",
                  margin: 0,
                }}
              >
                {new Date(event?.begindate).toLocaleDateString()}
              </p>

              <p
                style={{
                  color: "white",
                  margin: 0,
                }}
              >
                {new Date(event?.begindate).toLocaleTimeString()}
              </p>
            </Box>
          )}
          <div
            className="guests"
            style={{ position: "absolute", bottom: 15, left: 20 }}
          >
            {/* On map les invités */}
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
