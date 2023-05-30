import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage/SignupPage";
import SigninPage from "./SigninPage/SigninPage";
import React from "react";
import Homepage from "/home/lorena/projeto19-linkr-front/src/pages/Homepage";

function App() {
  const [session, setSession] = React.useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<SigninPage setSession={setSession} />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
