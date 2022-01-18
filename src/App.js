import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BaseLayout } from "./layouts/BaseLayout";
import { AddForm } from "./pages/AddForm";
import { Event } from "./pages/Event";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#002266",
      },
      secondary: {
        main: "#FEE612",
      },
    },
  });
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <BaseLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/event/:id" element={<Event />} />
              </Routes>
            </BaseLayout>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
