import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import { TbTrashFilled } from "react-icons/tb";
import { AiFillEdit } from "react-icons/ai";
import ReactModal from "react-modal";
import { ColorRing } from "react-loader-spinner";

export default function PostContainer() {
  const urlTimeline = `${process.env.REACT_APP_API_URL}/posts`;
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const [openedModal, setOpenedModal] = useState(false);
  const [delected, setDelected] = useState(false);
  const [postEdit, setPostEdit] = useState(false);

  const { token } = useContext(InfoContext);
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
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}/posts/like/${id}`, config)
      .catch((err) => {
        setIsLoading(false);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
        console.log(err.response.data);
      });
  }

  function openModal() {
    setOpenedModal(true);
  }

  function deletePost(id) {
    setDelected(true);

    setTimeout(() => {
      const urlDelete = `${process.env.REACT_APP_API_URL}/posts/${id}`;
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const promise = axios.delete(urlDelete, config);
      promise.then((res) => {
        setDelected(false);
        setOpenedModal(false);
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
    }, 3000);
  }

  // function clickEdit() {
  //   setPostEdit(true);
  // }

  // function editPost() {
  //   // const { id } = useParams();
  // }

  return (
    <>
      {isLoading ? (
        <ContainerLoader>
          <ThreeDots width={100} height={100} color="#FFFFFF" />
        </ContainerLoader>
      ) : (
        <ContainerTimeline>
          {post.map((p, index) => {
            return (
              <Post key={index}>
                <ContainerLike>
                  <PostOwnerImg src={p.user_picture} />
                  {p.liked_by ? (
                    <AiFillHeart onClick={() => handleLike(p.id)} />
                  ) : (
                    <AiOutlineHeart onClick={() => handleLike(p.id)} />
                  )}
                  <p>{p.likes} likes</p>
                </ContainerLike>
                <div>
                  <PostOwner>
                    {p.username}
                    <div>
                      <AiFillEdit 
                      color="white" 
                      size={15} 
                      onClick={postEdit} />
                      
                      <TbTrashFilled
                        color="white"
                        size={15}
                        onClick={openModal}
                      />
                    </div>
                  </PostOwner>
                  <PostDescription>
                    {p.description.split(" ").map((s, index) => {
                      if (s.startsWith("#")) {
                        return (
                          <span
                            key={index}
                            onClick={() =>
                              navigate(`/hashtag/${s.replace("#", "")}`)
                            }
                          >{` ${s} `}</span>
                        );
                      } else {
                        return <>{` ${s} `}</>;
                      }
                    })}
                  </PostDescription>
                  <PostLink onClick={() => window.open(`${p.url}`, "_blank")}>
                    <LinkInfo>
                      <h3>{p.url_title}</h3>
                      <p>{p.url_description}</p>
                      <a href={p.url} target="_blank">
                        {p.url}
                      </a>
                    </LinkInfo>
                    <LinkImg src={p.url_picture} />
                  </PostLink>
                </div>
              </Post>
            );
          })}

          <StyledModal isOpen={openedModal} style={customStyles}>
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

const Post = styled.div`
  display: flex;
  padding-bottom: 20px;
  width: 611px;
  background-color: #171717;
  border-radius: 16px;
  margin-bottom: 30px;
`;
const PostOwnerImg = styled.img`
  width: 50px;
  height: 50px;
  background-color: purple;
  border-radius: 26.5px;
  margin: 16px;
`;
const PostOwner = styled.p`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  margin-top: 20px;
  margin-bottom: 7px;

  div {
    width: 40px;
    display: flex;
    justify-content: space-between;
  }
`;

const PostDescription = styled.p`
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
`;

const PostLink = styled.div`
  font-family: "Lato", sans-serif;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  margin-top: 10px;
  width: 500px;
  height: 155px;
  :hover {
    cursor: pointer;
  }
`;

const LinkInfo = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  h3 {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 10px;
    color: #cecece;
  }
  p {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    margin-bottom: 10px;
    color: #9b9595;
  }
  a {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
    text-decoration: none;
  }
`;

const LinkImg = styled.img`
  width: 155px;
  height: 155px;
  border-radius: 0px 12px 13px 0px;
`;

const ContainerLike = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: #ffffff;

  svg:hover {
    cursor: pointer;
  }

  p {
    font-size: 11px;
    font-family: "Lato", sans-serif;
    margin-top: 4px;
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
