import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { LoginForm } from "../components/RegisterForm/LoginForm";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { Upload } from "../components/Upload/Upload";

import {
  actionTypes,
  loginUser,
  registerUser,
  useAuth,
} from "../contexts/AuthContext";
import { getProfile, register } from "../services/api";

export const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [profil, setProfil] = useState(null);

  const {
    dispatch,
    state: { error, user, loading },
  } = useAuth();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  // Soumission du formulaire
  const handleSubmit = async (infos) => {
    // let data;
    if (isRegister) {
      // Appel de la fonction d'API register
      await registerUser(infos, dispatch);
    } else {
      // Appel de la fonction d'API login
      await loginUser(infos, dispatch);
    }
  };

  useEffect(async () => {
    const profile = await getProfile();
    setProfil(profile);
  }, [user]);

  const logout = () => {
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };

  return (
    <div>
      {isLoggedIn ? (
        <Box>
          <img
            alt={profil?.firstName}
            src={
              profil?.picture ||
              "https://jsl-online.com/wp-content/uploads/2017/01/placeholder-user.png"
            }
            style={{ width: "5rem", height: "5rem", borderRadius: "100%" }}
          />
          <Upload />

          <Typography variant="h3">
            {profil?.firstName} {profil?.lastName}
          </Typography>
          <Typography variant="body1">{profil?.email}</Typography>
          <Typography variant="body1">{profil?.phone}</Typography>
          <Button variant={"contained"} onClick={logout}>
            Se déconnecter
          </Button>
        </Box>
      ) : (
        <div>
          {isRegister ? (
            <RegisterForm submit={handleSubmit} error={error} />
          ) : (
            <LoginForm submit={handleSubmit} error={error} />
          )}
          <Button color={"primary"} onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "J'ai déjà un compte" : "Je n'ai pas de compte"}
          </Button>
        </div>
      )}
    </div>
  );
};
