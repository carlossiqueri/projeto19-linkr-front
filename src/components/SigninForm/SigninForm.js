import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { InfoContext } from "../../context/InfoContext";

const SigninForm = ({ setSession, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const { setToken, setCurrentUserId, setUserInfo } = useContext(InfoContext);
  const [activeButton, setActiveButton] = React.useState(true);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  function updateForm(e) {
    const { name, value } = e.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  const serverUrl = process.env.REACT_APP_API_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      return alert("Por favor, preencha todos os campos!");
    }

    try {
      setActiveButton((prevState) => !prevState);
      const res = await axios.post(`${serverUrl}`, form);
      setActiveButton((prevState) => !prevState);

      if (res.status === 200) {
        setSession(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        setIsAuthenticated(true);
        console.log(res.data);
        setCurrentUserId(res.data.userId);
        const resUser = await axios.get(`${serverUrl}/user/${res.data.userId}`);
        setUserInfo(resUser.data[0]);
        console.log(`${serverUrl}/user/${res.data.userId}`);
        console.log(resUser.data[0]);
        setToken(localStorage.getItem('token'));

        navigate("/timeline");
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert("Email ou senha inválidas");
      }
      setActiveButton((prevState) => !prevState);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        data-test="email"
        onChange={updateForm}
        value={form.email}
        name="email"
        type="email"
        placeholder="e-mail"
      />
      <input
        data-test="sign-up-link"
        onChange={updateForm}
        value={form.password}
        name="password"
        type="password"
        placeholder="password"
      />
      <button data-test="sign-up-link" disabled={!activeButton}>Log In</button>
      <Link data-test="sign-up-link" to="/signup">First time? Create an account!</Link>
    </form>
  );
};

export default SigninForm;
