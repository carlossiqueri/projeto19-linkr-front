import styled from "styled-components";
import PostDescription from "../PostDescription/PostDescription";
import { TbTrashFilled } from "react-icons/tb";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";

export default function Post({
  p,
  isCurrentUserPost,
  openModal,
  index,
  handleLike,
}) {
  const [edited, setEdited] = useState(false);
  return (
    <Wrapper key={index}>
      <ContainerLike>
        <PostOwnerImg src={p.user_picture} />
        {p.liked_by ? (
          <AiFillHeart onClick={() => handleLike(p.id)} />
        ) : (
          <AiOutlineHeart onClick={() => handleLike(p.id)} />
        )}
        <p>{p.like_count} likes</p>
      </ContainerLike>
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
            <a href={p.url} target="_blank">
              {p.url}
            </a>
          </LinkInfo>
          <LinkImg src={p.url_picture} />
        </PostLink>
      </div>
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
  margin-top: 20px;
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
