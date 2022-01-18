import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";

/**
 * Composer le formulaire d'inscription
 * Lier le state local du composant sur les champs
 * Créer la méthode submit qui console.log les champs au moment de la soumission
 */
export const RegisterForm = ({ submit, error }) => {
  // Stockage des données du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  // Gestion de la saisie du formulaire
  const handleChange = (event) => {
    setFormData({
      // Conserver les autres saisies de champs
      ...formData,
      // Champ modifié ou ajouté
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>S'enregistrer</h2>
      <Stack gap={3}>
        <TextField
          name="firstName"
          label="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth={false}
        />
        <TextField
          name="lastName"
          label="Nom"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          type="email"
          name="email"
          label="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          name="password"
          label="Mot de passe"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label="Téléphone"
          value={formData.phone}
          onChange={handleChange}
        />
      </Stack>
      <Button variant="contained" type="submit" value="S'enregistrer">
        S'enregistrer
      </Button>
    </form>
  );
};
