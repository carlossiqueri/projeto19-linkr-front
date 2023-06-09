import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import Post from "../Post/Post";

export default function UserContainer() {
  const { userId, setUserId } = useContext(InfoContext);
  const urlUser = `${process.env.REACT_APP_API_URL}/user/${userId}`;
  const urlLikePost = `${process.env.REACT_APP_API_URL}/posts/like/`;
  const [liked, setLiked] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postId, setPostId] = useState(null);
  const [image, setImage] =useState("");
  const [name, setName] = useState("");

  const { token, currentUserId } = useContext(InfoContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(urlUser);
    axios
      .get(urlUser)
      .then((res) => {
        setIsLoading(false);
        setPost(res.data);
        setName(res.data[0].username);
        setImage(res.data[0].picture_url);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        console.log(err.response.data);
      });
  }, []);

  function handleLike(id) {
    axios
      .post(`${urlLikePost}${id}`, {}, config)
      .then(() => {
        setLiked(!liked);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        console.log(err.response.data);
      });
  }

  function openModal(id) {
    setOpenedModal(true);
    setPostId(id);
  }

  return (
    <>
      {isLoading ? (
        <ContainerLoader>
          <ThreeDots width={100} height={100} color="#FFFFFF" />
        </ContainerLoader>
      ) : (
        <>
          <Title>
            <img src={image}/>
            <h1>{name}</h1>
          </Title>
          <ContainerTimeline>
            {post.map((p, index) => {
              const isCurrentUserPost = p.user_id === currentUserId;
              return (
                <Post
                  handleLike={handleLike}
                  index={index}
                  isCurrentUserPost={isCurrentUserPost}
                  openModal={openModal}
                  p={p}
                />
              );
            })}
          </ContainerTimeline>
          </>
      )}
    </>
  );
}

const ContainerLoader = styled.div`
  margin-top: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 125px;
  width: 100%;
  max-width: 610px;

  h1 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    /* identical to box height */

    color: #ffffff;
  }

  img {
    width: 50px;
    height: 50px;
    background-color: purple;
    border-radius: 26.5px;
    margin: 16px;
  }
`;

const ContainerTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 41px;
  /* configs necessarias p mostras os posts se decidirmos mudar a maneira como a hnomepage está organizada*/
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;
