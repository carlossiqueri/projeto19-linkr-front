import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage/SignupPage";
import SigninPage from "./SigninPage/SigninPage";
import React from "react";
import Homepage from "../pages/Homepage";
import UserPage from "../pages/UserPage.js";
import { InfoProvider } from "../context/InfoContext";

function App() {
  const [session, setSession] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setSession(token);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <BrowserRouter>
    <InfoProvider>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/"
          element={
            <SigninPage
              setSession={setSession}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/timeline"
          element={
            <Homepage
              setIsAuthenticated={setIsAuthenticated}
              setSession={setSession}
            />
          }
        />
        <Route
          path="/user"
          element={
            <UserPage
              setIsAuthenticated={setIsAuthenticated}
              setSession={setSession}
            />
          }
        />
      </Routes>
      </InfoProvider>
    </BrowserRouter>
  );
}

export default App;
