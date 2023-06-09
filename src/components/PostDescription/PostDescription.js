import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import axios from "axios";

export default function PostDescription({edited, setEdited, description, id }) {
  const navigate = useNavigate();
  const { token } = useContext(InfoContext);
  const [form, setForm] = useState({ description: "" });
  const [editedDescription, setEditedDescription] = useState(description);
  const [disabled, setDisabled] = useState(false);

  function handleEscOrEnter(event) {
    if (event.key === "Escape") {
      setEdited(false);
      setEditedDescription(description);
    } else if (event.key === "Enter") {
        setDisabled(true);
      saveChanges(id);
    }
  }


  function saveChanges(id) {
    const urlUpdate = `${process.env.REACT_APP_API_URL}/posts/${id}`;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body = { description: editedDescription };

    const promise = axios.put(urlUpdate, body, config);
    promise.then((res) => {
      setEdited(false);
      console.log("Deu certo!!!!!!!");
      setDisabled(false);
    });
    promise.catch((err) => {
      console.log(err.response.data.mensagem);
      setDisabled(false);
    });
  }

  return (
    <Wrapper data-test="description"  >
      {edited ? (
        <input
          data-test="edit-input"
          type="text"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          onKeyDown={handleEscOrEnter}
          autoFocus
          disabled={disabled}
        />
      ) : (
        editedDescription.split(" ").map((s, index) => {
          if (s.startsWith("#")) {
            return (
              <span
                key={index}
                onClick={() => navigate(`/hashtag/${s.replace("#", "")}`)}
              >{` ${s} `}</span>
            );
          } else {
            return <>{` ${s} `}</>;
          }
        })
      )}
    </Wrapper>
  );
}

const Wrapper = styled.p`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  span {
    font-weight: bold;
    color: #ffffff;
    :hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  input {
    width: 98%;
    border: none;
    outline: none;
    padding: 7px;
    border-radius: 7px;
    background-color: #FFFFFF;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 16.8px;
    text-transform: capitalize;
    color: #4C4C4C;
  }
`;
