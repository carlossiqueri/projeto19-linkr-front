import styled from "styled-components";
import PostDescription from "../PostDescription/PostDescription";
import { TbTrashFilled } from "react-icons/tb";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { useState } from "react";
import Comments from "../Comments/Comments";
import { useEffect } from "react";
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
      <Wrapper key={index}>
        <InteractionsPostContainer>
          <PostOwnerImg src={p.user_picture} />
          {p.liked_by ? (
            <AiFillHeart onClick={() => handleLike(p.id)} />
          ) : (
            <AiOutlineHeart onClick={() => handleLike(p.id)} />
          )}
          <p>{p.like_count} likes</p>
          <AiOutlineComment
            onClick={() => setOpenComment((prevState) => !prevState)}
          />
          <p>{comments.length} comments</p>
        </InteractionsPostContainer>
        <div>
          <PostOwner>
            {p.username}
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
              <a href={p.url} target="_blank" rel="noreferrer">
                {p.url}
              </a>
            </LinkInfo>
            <LinkImg src={p.url_picture} />
          </PostLink>
        </div>
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
  background-color: purple;
  border-radius: 26.5px;
  margin-bottom: 15px;
`;

const PostOwner = styled.p`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
  margin-bottom: 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;

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

  svg:hover {
    cursor: pointer;
  }

  p {
    font-size: 11px;
    font-family: "Lato", sans-serif;
    margin-top: 4px;
    margin-bottom: 16px;
  }
`;
