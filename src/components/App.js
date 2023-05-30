import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage/SignupPage";
import "../styles/reset.css";
import SigninPage from "./SigninPage/SigninPage";
import React from "react";

function App() {
  const [session, setSession] = React.useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<SigninPage setSession={setSession} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
