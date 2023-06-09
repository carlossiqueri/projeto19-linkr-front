import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import ReactModal from "react-modal";
import { ColorRing } from "react-loader-spinner";
import Post from "../Post/Post";
import useInterval from "use-interval";
import { TfiReload } from "react-icons/tfi";
import { useRef } from "react";

export default function PostContainer() {
  const [post, setPost] = useState([]);
  const [initialPosts, setInitialPosts] = useState(null);
  const [count, setCount] = useState(null);
  const [update, setUpdate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [delected, setDelected] = useState(false);
  const [postId, setPostId] = useState(null);
  const liInfiniteScrollRef = useRef(null);

  const urlTimeline = `${process.env.REACT_APP_API_URL}/posts?page=${currentPage}`;
  const urlLikePost = `${process.env.REACT_APP_API_URL}/posts/like/`;
  const urlTimelineCount = `${process.env.REACT_APP_API_URL}/postsCount`;

  const { token, currentUserId, setProfileImage, setRefresh, refresh } =
    useContext(InfoContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const getTenPosts = () => {
    axios
      .get(urlTimeline, config)
      .then((res) => {
        setIsLoading(false);
        setPost(res.data);
        setProfileImage(res.data.user_picture);
        setRefresh(false);
      })
      .catch((err) => {
        setIsLoading(false);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        console.log(err.response.data);
      });
  };


  const getNumberOfAllPosts = () => {
    axios
      .get(urlTimelineCount)
      .then((res) => {
        setCount(res.data);
        setInitialPosts(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    getTenPosts();
    getNumberOfAllPosts();
    liInfiniteScrollRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [refresh, currentPage]);


  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setCurrentPage((currentValue) => currentValue + 1);
      }
    })
    if(liInfiniteScrollRef.current){
      intersectionObserver.observe(liInfiniteScrollRef.current);
    }
    return () => intersectionObserver.disconnect();
  }, [liInfiniteScrollRef]);
  //START: Utilização do hook useInterval para barra de update posts

  useInterval(() => {
    if (initialPosts !== count) {
      setUpdate(count - initialPosts);
      console.log(update);
    }
  }, 15000);

  useInterval(() => {
    axios
      .get(urlTimelineCount)
      .then((res) => {
        setCount(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, 3000);

  //END: Utilização do hook useInterval para barra de update posts

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

  function deletePost() {
    setDelected(true);
    setTimeout(() => {
      const urlDelete = `${process.env.REACT_APP_API_URL}/posts/${postId}`;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const promise = axios.delete(urlDelete, config);
      console.log(urlDelete);
      promise.then((res) => {
        setDelected(false);
        setOpenedModal(false);
        console.log("finalmente!!!!");
        setRefresh(true);
      });
      promise.catch((err) => {
        console.log(err.response.data.mensagem);
        alert("Não foi possível excluir o post");
        setOpenedModal(false);
        setDelected(false);
      });
      promise.finally(() => {
        setOpenedModal(false);
      });
    }, 1500);
  }

  return (
    <>
      {isLoading ? (
        <ContainerLoader>
          <ThreeDots width={100} height={100} color="#FFFFFF" />
        </ContainerLoader>
      ) : (
        <ContainerTimeline>
          {update !== null ? (
            <UpdatePosts
              setUpdate={setUpdate}
              onClick={() => {
                setRefresh(true);
                setUpdate(null);
              }}
            >
              <p>{update} new posts, load more! </p>
              <TfiReload size={22} color="white" />
            </UpdatePosts>
          ) : null}
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
          <StyledModal
            appElement={document.getElementById("root")}
            isOpen={openedModal}
            style={customStyles}
          >
            <p>
              Are you sure you want <br /> to delete this post?
            </p>

            {delected ? (
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={[
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                  "#FFFFFF",
                ]}
              />
            ) : (
              <div>
                <WhiteButton onClick={() => setOpenedModal(false)}>
                  No, go back
                </WhiteButton>
                <BlueButton onClick={deletePost}>Yes, delete it</BlueButton>
              </div>
            )}
          </StyledModal>
          
        </ContainerTimeline>
      )}
      <li ref={liInfiniteScrollRef} />
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

 
`;

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    backgroundColor: "#333333",
    margin: "auto",
    borderRadius: "50px",
    padding: "20px",

    fontFamily: "Lato",
    fontSize: "20px",
    fontWeight: "700",
    lineHeight: "25.8px",
    color: "#FFFFFF",
    textAlign: "center",
  },
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: "2",
  },
};

const StyledModal = styled(ReactModal)`
  ${customStyles.content}

  div {
    margin-top: 30px;
    margin-bottom: 20px;
  }
`;

const BlueButton = styled.button`
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
  margin-left: 20px;
`;
const WhiteButton = styled.button`
  background-color: white;
  font-family: "Lato", sans-serif;
  font-weight: 700;
  font-size: 14px;
  line-height: 16.8px;
  color: #1877f2;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  width: 112px;
`;

const UpdatePosts = styled.div`
  width: 611px;
  height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-family: "Lato";
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    margin-right: 10px;
  }
  :hover {
    cursor: pointer;
    background: #0456bf;
  }
`;

