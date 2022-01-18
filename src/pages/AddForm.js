import {
  Button,
  Checkbox,
  Input,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { createEvent } from "../services/api";

export function AddForm({ formOpen, setFormOpen }) {
  const [size, setSize] = useState("scale(0)");
  useEffect(() => {
    setSize("scale(1)");
  }, []);

  const date = new Date();

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      //   guests: [],
      date: "",
    },
    onSubmit: async (values) => {
      try {
        await createEvent(values);
        setFormOpen(!formOpen);
      } catch {
        console.error("Erreur");
      }
    },
  });

  const guests = [
    {
      id: "1",
      name: "audrey",
    },
    {
      id: "2",
      name: "hugo",
    },
  ];

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#FEE612",
        transition: "all 0.2s",
        transform: size,
        transformOrigin: "bottom center",
        zIndex: 2,
        position: "fixed",
        top: 0,
      }}
    >
      <FaTimes
        color="white"
        fontSize="2rem"
        style={{ position: "absolute", left: "1rem", top: "1rem" }}
        onClick={() => {
          setFormOpen(!formOpen);
        }}
      />
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "50vh",
          width: "75vw",
          margin: "0 auto",
          paddingTop: "8rem",
        }}
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="name"
          name="name"
          label="Nom de l'événement"
          variant="filled"
          style={{ backgroundColor: "white" }}
          value={formik.values.name}
          onChange={formik.handleChange}
        />

        <TextField
          id="image"
          name="image"
          label="Image de l'événement"
          variant="filled"
          style={{ backgroundColor: "white" }}
          value={formik.values.image}
          onChange={formik.handleChange}
        />

        {/* <Select
          multiple
          id="guests"
          name="guests"
          value={formik.values.guests}
          onChange={formik.handleChange}
          style={{ backgroundColor: "white" }}
          renderValue={(selected) =>
            selected
              .map((selectedItem) => {
                return selectedItem?.name;
              })
              .join(", ")
          }
        >
          {guests.map((guest) => (
            <MenuItem key={guest.id} value={guest.id}>
              <Checkbox checked={formik.values.guests.indexOf(guest) > -1} />
              <ListItemText primary={guest.name} />
            </MenuItem>
          ))}
        </Select> */}

        <TextField
          id="date"
          name="date"
          label="Next appointment"
          type="datetime-local"
          defaultValue={date}
          style={{ backgroundColor: "white" }}
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.date}
          onChange={formik.handleChange}
        />
        <Button color="primary" variant="contained" type="submit">
          Créer l'événement
        </Button>
      </form>
    </div>
  );
}
