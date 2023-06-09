import styled from "styled-components";
import PostDescription from "../PostDescription/PostDescription";
import { TbTrashFilled } from "react-icons/tb";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { useState } from "react";
import Comments from "../Comments/Comments";
import { useEffect } from "react";
import { BiRepost } from "react-icons/bi";
import { Link } from "react-router-dom";
import { InfoContext } from "../../context/InfoContext";
import { useContext } from "react";
import { ColorRing } from "react-loader-spinner";
import ReactModal from "react-modal";
import PostReposts from "../RepostsComponents/PostReposts";
import axios from "axios";

export default function Post({
  p,
  isCurrentUserPost,
  openModal,
  index,
  handleLike,
  config,
}) {

  const [edited, setEdited] = useState(false);

  const { userId, setUserId, token, setRefresh } = useContext(InfoContext);
  const [share, setShare] = useState(false);
  const [hasShared, setHasShared] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);

  function sharePost(id){
    if(hasShared === true){
      setOpenedModal(false);
      setShare(false);
      return;
    }
    setShare(true);
    
   setTimeout(() => {

    const urlRepost = `${process.env.REACT_APP_API_URL}/posts/${id}`;
    const config = {
     headers : {
      Authorization: `Bearer ${token}`
     }
    };
    console.log(urlRepost);

    const promise = axios.post(urlRepost, {}, config);
    promise.then((res) => {
      setOpenedModal(false);
      setShare(false);
      setRepostCount(repostCount + 1);
      setRefresh(true);
      setHasShared(true);
    });
    promise.catch((err) => {
      console.log(err.response.data.mensagem);
      alert("Não foi possível repostar o post");
      setOpenedModal(false);
      setShare(false);
    })
   }, 1500);
  }

  function clickOnUsername() {
    console.log("aqui na função");
  }

  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const urlComment = `${process.env.REACT_APP_API_URL}/comments`;

  useEffect(() => {
    const res = axios.get(`${urlComment}/${p.id}`, config);

    res.then((res) => {
      setComments(res.data);
    });
  }, []);

  return (
    <WrapperContainer>
       <PostReposts hasShared={hasShared} username={p.username} />
      <Wrapper data-test="post" key={index}>
        <InteractionsPostContainer>
          <PostOwnerImg src={p.user_picture} />
          {p.liked_by ? (
            <AiFillHeart data-test="like-btn" onClick={() => handleLike(p.id)} />
          ) : (
            <AiOutlineHeart onClick={() => handleLike(p.id)} />
          )}
          <p data-test="counter">{p.like_count} likes</p>

          <AiOutlineComment data-test="comment-btn"
            onClick={() => setOpenComment((prevState) => !prevState)}
          />
          <p data-test="comment-counter">{comments.length} comments</p>

          <BiRepost
        data-test="repost-btn"
        size={25}
        onClick={() => {setOpenedModal(true)}}
         />
         <p data-test="repost-counter"> {p.reposts_count} re-post</p>
        </InteractionsPostContainer>
        <div>
          <PostOwner>
            {
            <Link data-test="username" onClick={() => setUserId(`${p.user_id}`)} to={`/user`}>
              {p.username}
            </Link>
            }
            <div>
              {isCurrentUserPost && (
                <>
                  <AiFillEdit
                    data-test="edit-btn"
                    color="white"
                    size={15}
                    onClick={() => setEdited(true)}
                  />

                  <TbTrashFilled
                    data-test="delete-btn"
                    color="white"
                    size={15}
                    onClick={() => openModal(p.id)}
                  />
                </>
              )}
            </div>
          </PostOwner>

          <PostDescription
            id={p.id}
            edited={edited}
            setEdited={setEdited}
            description={p.description}
          />

          <PostLink onClick={() => window.open(`${p.url}`, "_blank")}>
            <LinkInfo>
              <h3>{p.url_title}</h3>
              <p>{p.url_description}</p>
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.url}
              </a>
            </LinkInfo>
            <LinkImg src={p.url_picture} />
          </PostLink>
        </div>

        <StyledModal appElement={document.getElementById('root')} isOpen={openedModal} style={customStyles}>
            <p>
              Do you want to re-post <br /> this link?
            </p>

            {share ? (
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
                <WhiteButton data-test="cancel" onClick={() => setOpenedModal(false)}>
                  No, cancel
                </WhiteButton>
                <BlueButton data-test="confirm" onClick={()=> {
                  sharePost(p.id)
                  setHasShared(true);
                }}>Yes, share!</BlueButton>
              </div>
            )}
          </StyledModal>
      </Wrapper>
      {openComment ? (
        <Comments
          postInfo={p}
          comments={comments}
          setComments={setComments}
          config={config}
        >
          <PostOwnerImg />
        </Comments>
      ) : null}
    </WrapperContainer>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 8fr;
  padding-bottom: 20px;
  width: 611px;
  background-color: #171717;
  padding: 20px;
  border-radius: 16px;
  box-sizing: border-box;
`;

const WrapperContainer = styled.div`
  margin-bottom: 30px;
  background-color: #1e1e1e;
  border-radius: 16px;
`;

const PostOwnerImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin-bottom: 15px;
`;

const PostOwner = styled.p`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    text-decoration: none;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div {
    width: 40px;
    display: flex;
    justify-content: space-between;
  }
`;

const PostLink = styled.div`
  font-family: "Lato", sans-serif;
  display: flex;
  justify-content: space-between;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  margin-top: 10px;
  height: 155px;
  :hover {
    cursor: pointer;
  }
`;

const LinkInfo = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  max-width: 300px;
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

const InteractionsPostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  color: #ffffff;

  span{
    display: flex;
    font-size: 11px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    line-height: 13.2px;

  }

  svg:hover {
    cursor: pointer;
  }

  p {
    font-size: 11px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    line-height: 13.2px;
    margin-top: 4px;
    margin-bottom: 16px;
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
