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
import { createEvent, getMembers } from "../services/api";

export function AddForm({ formOpen, setFormOpen }) {
  const [size, setSize] = useState("scale(0)");
  useEffect(() => {
    setSize("scale(1)");
  }, []);

  const [members, setMembers] = useState([]);

  const getDatas = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  useEffect(() => {
    getDatas();
  }, []);

  const begindate = new Date();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
      guests: [],
      begindate: "",
    },
    onSubmit: async (values) => {
      try {
        await createEvent({
          ...values,
          guests: values.guests.map((guest) => {
            return guest._id;
          }),
        });
        setFormOpen(!formOpen);
      } catch {
        console.error("Erreur");
      }
    },
  });

  console.log(formik.values.guests);
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "#FEE612",
        transition: "all 0.2s",
        transform: size,
        transformOrigin: "bottom center",
        zIndex: 100,
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
          id="description"
          name="description"
          label="Description de l'événement"
          variant="filled"
          style={{ backgroundColor: "white" }}
          value={formik.values.description}
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

        <Select
          multiple
          id="guests"
          name="guests"
          value={formik.values.guests}
          onChange={formik.handleChange}
          style={{ backgroundColor: "white" }}
          renderValue={(selected) =>
            selected
              .map((selectedItem) => {
                return selectedItem?.firstName + " " + selectedItem?.lastName;
              })
              .join(", ")
          }
        >
          {members.map((guest) => (
            <MenuItem key={guest._id} value={guest}>
              <Checkbox checked={formik.values.guests.indexOf(guest) > -1} />
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
              <ListItemText primary={`${guest.firstName} ${guest.lastName}`} />
            </MenuItem>
          ))}
        </Select>

        <TextField
          id="begindate"
          name="begindate"
          label="Heure de l'événement"
          type="datetime-local"
          defaultValue={begindate}
          style={{ backgroundColor: "white" }}
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.begindate}
          onChange={formik.handleChange}
        />
        <Button color="primary" variant="contained" type="submit">
          Créer l'événement
        </Button>
      </form>
    </div>
  );
}
