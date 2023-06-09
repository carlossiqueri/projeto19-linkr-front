import styled from "styled-components";
import PostDescription from "../PostDescription/PostDescription";
import { TbTrashFilled } from "react-icons/tb";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiRepost } from "react-icons/bi";
import { useState } from "react";
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
}) {

  const [edited, setEdited] = useState(false);
  const { userId, setUserId, token } = useContext(InfoContext);
  const [share, setShare] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const [openedModal, setOpenedModal] = useState(false);

  function sharePost(id){
    setShare(true);
   setTimeout(() => {

    const urlRepost = `${process.env.REACT_APP_API_URL}/posts/${id}`;
    const config = {
     headers : {
      Authorization: `Bearer ${token}`
     }
    };

    const promise = axios.post(urlRepost, {}, config);
    promise.then((res) => {
      setOpenedModal(false);
      setShare(false);
      setRepostCount(repostCount + 1);
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

  return (
    <Wrapper key={index}>
      <PostReposts />
      <ContainerLike>
        <PostOwnerImg src={p.user_picture} />
        {p.liked_by ? (
          <AiFillHeart onClick={() => handleLike(p.id)} />
        ) : (
          <AiOutlineHeart onClick={() => handleLike(p.id)} />
        )}
        <p>{p.like_count} likes</p>

        <BiRepost
        size={25}
        onClick={() => setOpenedModal(true)}
         />
         <p> re-post</p>

      </ContainerLike>
      <div>
        <PostOwner>
          {
            <Link onClick={() => setUserId(`${p.user_id}`)} to={`/user`}>
              {p.username}
            </Link>
          }
          <div>
            {isCurrentUserPost && (
              <>
                <AiFillEdit
                  color="white"
                  size={15}
                  onClick={() => setEdited(true)}
                />

                <TbTrashFilled
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
            <a href={p.url} target="_blank">
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
                <WhiteButton onClick={() => setOpenedModal(false)}>
                  No, cancel
                </WhiteButton>
                <BlueButton onClick={()=> sharePost(p.id)}>Yes, share!</BlueButton>
              </div>
            )}
          </StyledModal>

    </Wrapper>
    
  );
}

const Wrapper = styled.div`
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
  margin-top: 10px;
  margin-bottom: 7px;
  display: flex;
  align-items: start;
  justify-content: start;

  a {
    text-decoration: none;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
    margin-top: 20px;
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
  width: 500px;
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
    font-weight: 400;
    line-height: 13.2px;
    margin-top: 4px;
    margin-bottom: 10px;
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
