import styled from "styled-components";
import WriteComment from "../WriteComment/WriteComment";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import axios from "axios";
import { useState } from "react";

const Comments = ({ postInfo, comments, setComments, config }) => {
  const urlFollow = `${process.env.REACT_APP_API_URL}/user/follow`;
  const { userInfo, currentUserId } = useContext(InfoContext);
  const [hasFollower, setHasFollower] = useState(null);
  let usernameFlag = null;

  if (currentUserId === postInfo.user_id) {
    usernameFlag = "• post's author";
  }

  const promise = axios.get(
    `${urlFollow}/${postInfo.user_id}/${currentUserId}`,
    config
  );
  promise.then((res) => setHasFollower(res.data));

  if (hasFollower) usernameFlag = "• following";
  return (
    <Wrapper>
      {comments ? (
        <CommentsWrapper>
          {comments.map(({ username, picture_url, content }) => (
            <li>
              <img src={picture_url} alt="" />
              <div>
                <h2>
                  {username} <span>{usernameFlag}</span>
                </h2>
                <p>{content}</p>
              </div>
            </li>
          ))}
        </CommentsWrapper>
      ) : null}
      <WriteComment
        imageUserUrl={userInfo.picture_url}
        postInfo={postInfo}
        setComments={setComments}
        currentUserId={currentUserId}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-bottom: 20px;
  width: 611px;
  border-radius: 16px;
  padding: 15px;
  box-sizing: border-box;

  img {
    width: 40px;
    height: 40px;
    background-color: purple;
    border-radius: 26.5px;
  }
`;

const CommentsWrapper = styled.ul`
  display: grid;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: 20px;

  li {
    display: grid;
    grid-template-columns: 1fr 8fr;
    padding: 10px 0;
    border-bottom: 1px solid #353535;
  }

  li img {
    justify-self: center;
  }

  li div {
    align-self: center;
  }

  li div h2 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #f3f3f3;
  }

  li div h2 span {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #565656;
  }

  li div p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #acacac;
  }
`;

export default Comments;
