import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import Post from "../Post/Post";

export default function UserContainer() {
  const {userId, setUserId } = useContext(InfoContext);
  const urlUser = `${process.env.REACT_APP_API_URL}/user/${userId}`
  const urlLikePost = `${process.env.REACT_APP_API_URL}/posts/like/`
  const [liked, setLiked] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postId, setPostId] = useState(null);


  const { token, currentUserId } = useContext(InfoContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    console.log(urlUser)
    axios
    .get(urlUser)
    .then((res) => {
      setIsLoading(false);
      setPost(res.data);
      console.log(res.data);
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
    .then( () => {
      setLiked(!liked)
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
        <ContainerTimeline>
            {            console.log(post)}
          {post.map((p, index) => {
            const isCurrentUserPost = p.user_id  === currentUserId;
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
      )}
    </>
  );
}

const ContainerLoader = styled.div`
  margin-top: 30px;
`;

const ContainerTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  /* configs necessarias p mostras os posts se decidirmos mudar a maneira como a hnomepage está organizada*/
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
`;