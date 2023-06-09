import styled from "styled-components";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";
import Post from "../Post/Post";
import { HashtagsTrending } from "../HashtagsComponents/HashtagsTrending";

export default function UserContainer() {
  const { userId, setUserId, token, currentUserId } = useContext(InfoContext);
  const urlUser = `${process.env.REACT_APP_API_URL}/user/${userId}`;
  const urlLikePost = `${process.env.REACT_APP_API_URL}/posts/like/`;
  const [liked, setLiked] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postId, setPostId] = useState(null);
  const [image, setImage] =useState("");
  const [name, setName] = useState("");
  const [follow, setFollow]= useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };
  
  useEffect(() => {
    setIsLoading(true);
    
    axios
      .get(urlUser, config)
      .then((res) => {
        setIsLoading(false);
        setPost(res.data);
        setName(res.data[0].username);
        setImage(res.data[0].user_picture);
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

  function handleFollow(){
    axios
    .post(`${process.env.REACT_APP_API_URL}/user/${userId}/follow`, {}, config)
    .then(()=> {
      setFollow(!follow);
    })
    .catch((err)=> {
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
        <Wrapper>
        <ProfileContainer>
        <Title>
            <img src={image}/>
            <h1>{name}</h1>
          </Title>
         { follow ?  (<ButtonFollow data-test="follow-btn" onClick={()=> handleFollow(userId)}>Follow</ButtonFollow>
         ) : (<ButtonUnfollow data-test="follow-btn" onClick={()=> handleFollow(userId)}>Unfollow</ButtonUnfollow>)
         }
        </ProfileContainer>
        
          <ContainerTimeline data-test="post">
            {post.map((p, index) => {
              const isCurrentUserPost = p.user_id === currentUserId;
              return (
                <Post
                  handleLike={handleLike}
                  index={index}
                  isCurrentUserPost={isCurrentUserPost}
                  openModal={openModal}
                  p={p}
                  config={config}
                />
              );
            })}
          </ContainerTimeline>
          <HashtagsTrending />
          </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
display: grid;
grid-template-columns: 2fr 1fr;
max-width:max-content;
align-items: start;


& > :first-child{

grid-column: 1/-1;
}

& > :nth-child(2){
  grid-row: 2;
}
& > :nth-child(3){
  grid-row: 2;
  margin-top: 40px;
}

`

const ContainerLoader = styled.div`
  margin-top: 30px;
`;

const ProfileContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;


`

const ButtonFollow = styled.button`
background-color: #1877f2;
color: #ffffff;
font-family: "Lato", sans-serif;
font-weight: 700;
font-size: 14px;
line-height: 16.8px;
  
border: none;
border-radius: 5px;
cursor: pointer;
margin-top: 125px;
padding: 5px;
width: 112px;
height: 31px;
`

const ButtonUnfollow = styled.button`
background-color: #FFFFFF;
color: #1877F2;
font-family: "Lato", sans-serif;
font-weight: 700;
font-size: 14px;
line-height: 16.8px;
  
border: none;
border-radius: 5px;
cursor: pointer;
margin-top: 125px;
padding: 5px;
width: 112px;
height: 31px;
`

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
