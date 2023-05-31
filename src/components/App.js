import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage/SignupPage";
import SigninPage from "./SigninPage/SigninPage";
import React from "react";
import Homepage from "../pages/Homepage";
import { InfoProvider } from "../context/InfoContext";

function App() {
  const [session, setSession] = React.useState(null);
  return (
    <BrowserRouter>
    <InfoProvider>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<SigninPage setSession={setSession} />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
      </InfoProvider>
    </BrowserRouter>
  );
}

export default App;
