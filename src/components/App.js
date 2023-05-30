import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./SignupPage/SignupPage";
import "../styles/reset.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
