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
      const newUrl = serverUrl.split("").filter((char, index) => {
        if(char === "/" && index === serverUrl.length - 1){
          return false;
        }
        return true;
      })
      
      console.log(newUrl);

      setActiveButton((prevState) => !prevState);
      const res = await axios.post(`${newUrl.join("")}/signup`, form);
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
        data-test="email"
        onChange={updateForm}
        value={form.email}
        name="email"
        type="email"
        placeholder="e-mail"
      />
      <input
        data-test="password"
        onChange={updateForm}
        value={form.password}
        name="password"
        type="password"
        placeholder="password"
      />
      <input
        data-test="username"
        onChange={updateForm}
        value={form.username}
        name="username"
        type="text"
        placeholder="username"
      />
      <input
        data-test="picture-url"
        onChange={updateForm}
        value={form.picture_url}
        name="picture_url"
        type="url"
        placeholder="picture_url"
      />
      <button data-test="sign-up-btn" disabled={!activeButton}>Sign Up</button>
      <Link data-test="login-link" to="/">Switch back to log in</Link>
    </form>
  );
};

export default SignupForm;
