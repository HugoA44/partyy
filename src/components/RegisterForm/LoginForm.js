import { useState } from "react";

import { Button, Stack, TextField } from "@mui/material";

export const LoginForm = ({ submit, error }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(error);

  const handleChange = (e) => {
    setFormData({
      // Conservation des autres champs
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    // Annulation du comportement par défaut du navigateur (rechargement de la page)
    e.preventDefault();
    submit(formData);
  };

  return (
    <div className="container">
      <h2>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <Stack gap={3}>
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
          {error && (
            <div>
              <h4>{error}</h4>
            </div>
          )}
        </Stack>
        <Button variant="contained" type="submit" value="Se connecter">
          Se connecter
        </Button>
      </form>
    </div>
  );
};
