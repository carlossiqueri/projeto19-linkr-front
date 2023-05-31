import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = React.useState(true);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
    username: "",
    picture_url: "",
  });

  function updateForm(e) {
    const { name, value } = e.target;
    setForm((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password || !form.picture_url || !form.username) {
      return alert("Por favor, preencha todos os campos!");
    }

    try {
      const serverUrl = process.env.REACT_APP_API_URL;

      setActiveButton((prevState) => !prevState);
      const res = await axios.post(`${serverUrl}signup`, form);
      setActiveButton((prevState) => !prevState);

      if (res.status === 201) {
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) {
        alert("Verifique os campos preenchidos e tente novamente");
      } else if (err.response.status === 422) {
        alert("Username ou Email já estão sendo utilizados");
      }
      setActiveButton((prevState) => !prevState);
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={updateForm}
        value={form.email}
        name="email"
        type="email"
        placeholder="e-mail"
      />
      <input
        onChange={updateForm}
        value={form.password}
        name="password"
        type="password"
        placeholder="password"
      />
      <input
        onChange={updateForm}
        value={form.username}
        name="username"
        type="text"
        placeholder="username"
      />
      <input
        onChange={updateForm}
        value={form.picture_url}
        name="picture_url"
        type="url"
        placeholder="picture_url"
      />
      <button disabled={!activeButton}>Sign Up</button>
      <Link to="/">Switch back to log in</Link>
    </form>
  );
};

export default SignupForm;
