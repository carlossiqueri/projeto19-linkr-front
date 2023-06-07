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

export default function PostContainer() {
  const urlTimeline = `${process.env.REACT_APP_API_URL}/posts`;
  const urlLikePost = `${process.env.REACT_APP_API_URL}/posts/like/`
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [delected, setDelected] = useState(false);
  const [postId, setPostId] = useState(null);

  const { token, currentUserId } = useContext(InfoContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(urlTimeline, config)
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
      if (liked) {
        setLiked(false)
      } else {
        setLiked(true)
      }})


    .catch((err) => {
      setIsLoading(false);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      console.log(err.response.data);
    });
  }

  function getPost(){
    setIsLoading(true);
    axios
      .get(urlTimeline, config)
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
        getPost();

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

          <StyledModal appElement={document.getElementById('root')} isOpen={openedModal} style={customStyles}>
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
