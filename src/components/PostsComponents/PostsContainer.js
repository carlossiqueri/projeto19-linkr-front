import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function PostContainer() {
  const urlTimeline = `${process.env.REACT_APP_API_URL}posts`;
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get(urlTimeline)
      .then((res) => {
        setPost(res.data)
      })
      .catch((err) => console.log(err.response.data));
  }, []);
  return (
    <>
      {post.map((p) => {
        return(
          <Post>
      <img />
      <div>
        <PostOwner>Carlos</PostOwner>
        <PostDescription>
          {p.description}
        </PostDescription>
        <PostLink>{p.url}</PostLink>
      </div>
    </Post>
        )
      })}
    </>
  );
}

const Post = styled.div`
  display: flex;
  width: 611px;
  height: 276px;
  background-color: #171717;
  margin-top: 30px;
  border-radius: 16px;
  img {
    width: 50px;
    height: 50px;
    background-color: purple;
    border-radius: 26.5px;
    margin: 16px;
  }
`;

const PostOwner = styled.p`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 7px;
`;

const PostDescription = styled.p`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
`;

const PostLink = styled.a`
  font-family: "Lato", sans-serif;
`;
