import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import styled from "styled-components";
import { InfoContext } from "../../context/InfoContext";

export default function WriteComment({
  imageUserUrl,
  setComments,
  postInfo,
  currentUserId,
}) {
  const urlComment = `${process.env.REACT_APP_API_URL}/comments`;
  const { token } = useContext(InfoContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [comment, setComment] = useState("");

  function handleComment(e) {
    setComment(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await axios.post(
        urlComment,
        { content: comment, user_id: currentUserId, post_id: postInfo.id },
        config
      );

      const res = await axios.get(`${urlComment}/${postInfo.id}`, config);

      setComments(res.data);
      setComment("");
    } catch (err) {
      alert(err);
      console.log(err.response.data);
    }
  }
  return (
    <Wrapper>
      <img src={imageUserUrl} alt="" />
      <form onSubmit={handleSubmit}>
        <input
          data-test="comment-input"
          type="text"
          value={comment}
          placeholder="write a comment..."
          onChange={handleComment}
        />
        <button>
          <AiOutlineSend  data-test="comment-submit" />
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 8fr;
  align-items: center;
  box-sizing: border-box;

  img {
    justify-self: center;
  }

  form {
    display: flex;
    justify-content: space-between;
    background-color: #252525;
    padding: 10px;
    align-items: center;
    border-radius: 8px;
  }

  form input {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
    background-color: #252525;
    border: none;
  }

  form input:focus {
    outline: none;
  }

  svg {
    color: #ffffff;
  }

  button {
    background-color: #252525;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;
