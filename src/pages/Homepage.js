import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useState } from "react";
import axios from "axios";
import { InfoContext } from "../context/InfoContext";
import Title from "../components/HomeComponents/Title.js";
import PostContainer from "../components/PostsComponents/PostsContainer.js";

export default function Homepage({ setIsAuthenticated, setSession }) {
  const [form, setForm] = useState({ url: "", description: "" });
  const [disabled, setDisabled] = useState(false);
  const { token } = useContext(InfoContext);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function createPost(e) {
    e.preventDefault();

    setDisabled(true);

    setTimeout(() => {
      const urlPost = `${process.env.REACT_APP_API_URL}/newPost`;
      const body = { url: form.url, description: form.description };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.post(urlPost, body, config);
      promise.then((res) => {
        console.log("Deu certo!!!");
        setForm({ url: "", description: "" });
      });
      promise.catch((err) => {
        console.log(err.response.data);
        alert("Houve um erro ao publicar seu link");
        setDisabled(false);
      });
      promise.finally(() => {
        setDisabled(false);
      });
    }, 3000);
  }

  return (
    <HomepageContainer>
      <Header setIsAuthenticated={setIsAuthenticated} setSession={setSession} />

      <FeedContainer disabled={disabled}>
        <p>timeline</p>

        <Title />

        <span>
          <img />
          <div>
            <p>What are you going to share today?</p>

            <form onSubmit={createPost}>
              <input
                required
                placeholder="http://..."
                type="text"
                name="url"
                value={form.url}
                onChange={handleForm}
                disabled={disabled}
              />

              <textarea
                required
                placeholder="Awesome article about #javascript"
                type="text"
                name="description"
                value={form.description}
                onChange={handleForm}
                disabled={disabled}
              />

              {disabled ? (
                <button disabled={disabled}> Publishing... </button>
              ) : (
                <button> Publish </button>
              )}
            </form>
          </div>
        </span>
      </FeedContainer>
      <PostContainer />
    </HomepageContainer>
  );
}

const HomepageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
  width: 100%;
  height: 100%;
`;

const FeedContainer = styled.div`
  width: 50%;
  margin-top: 148px;
  display: flex;
  flex-direction: column;

  p {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 63.73px;
    color: #ffffff;
  }

  span {
    width: 611px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    margin-top: 43px;

    img {
      width: 50px;
      height: 50px;
      background-color: purple;
      border-radius: 26.5px;
      margin: 16px;
    }

    div {
      display: flex;
      flex-direction: column;
      width: 502px;

      p {
        font-family: "Lato", sans-serif;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-top: 21px;
        margin-bottom: 10px;
      }
      form {
        display: flex;
        flex-direction: column;

        input {
          background-color: #efefef;
          border-radius: 5px;
          border: none;
          width: 100%;
          padding: 10px 0 10px 10px;
          outline: none;
          margin-bottom: 5px;

          font-family: "Lato", sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 18px;
          color: ${({ disabled }) => (disabled ? "#949494" : "#000000")};
        }

        textarea {
          height: 66px;
          padding: 10px 10px;
          border: none;
          border-radius: 5px;
          background-color: #efefef;
          outline: none;
          margin-bottom: 8px;
          resize: none;
          width: 100%;

          font-family: "Lato", sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 18px;
          color: ${({ disabled }) => (disabled ? "#949494" : "#000000")};
        }
      }
      button {
        background-color: #1877f2;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        font-size: 14px;
        line-height: 16.8px;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 5px;
        width: 112px;
        margin-bottom: 16px;
        margin-left: 400px;
      }
    }
  }
`;
