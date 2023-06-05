import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


export default function PostContainer() {
  const urlTimeline = `${process.env.REACT_APP_API_URL}/posts`;
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(urlTimeline)
      .then((res) => {
        setIsLoading(false);
        setPost(res.data);
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

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }}

      if (liked) {
        setLiked(false)
      } else {
        setLiked(true)
      }
      

    axios.post(`${process.env.REACT_APP_API_URL}/posts/like/${id}`, config, token)
    .catch((err) => {
      setIsLoading(false);
      alert(
        "An error occured while trying to fetch the posts, please refresh the page"
      );
      console.log(err.response.data);
    });

  
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
            return (
              <Post key={index}>
                <ContainerLike>
                  <PostOwnerImg src={p.user_picture} />
                  {liked ? (
                    <AiFillHeart onClick={() => handleLike(p.id)} />
                  ) : (
                    <AiOutlineHeart onClick={() => handleLike(p.id)} />
                  )}
                  <p>{p.likes} likes</p>
                </ContainerLike>
                <div>
                  <PostOwner>{p.username}</PostOwner>
                  <PostDescription>
                    {p.description.split(" ").map((s, index) => {
                      if(s.startsWith("#")){
                        return <span key={index} onClick={() => navigate(`/hashtag/${s.replace("#", "")}`)}>{` ${s} `}</span>
                      }else{
                        return <>{` ${s} `}</>
                      }
                    })}
                    </PostDescription>
                  <PostLink  onClick={() => window.open(`${p.url}`, "_blank")}>
                    <LinkInfo>
                      <h3>{p.url_title}</h3>
                      <p>{p.url_description}</p>
                      <a href={p.url} target="_blank">{p.url}</a>
                    </LinkInfo>
                    <LinkImg src={p.url_picture} />
                  </PostLink>
                </div>
              </Post>
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
`;

const PostDescription = styled.p`
  font-family: "Lato", sans-serif;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  span{
    font-weight: bold;
    color: #FFFFFF;
    :hover{
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
  :hover{
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

  svg:hover{
    cursor: pointer;
  }

  p{
    font-size: 11px;
    font-family: "Lato", sans-serif;
    margin-top: 4px;
  }

`