import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export function HashtagsTrending() {
  const navigate = useNavigate();
  const [ladder, setLadder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const urlHashtags = `${process.env.REACT_APP_API_URL}/hashtags`;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(urlHashtags)
      .then((res) => {
        setLadder(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response.data);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <ContainerLadder>
          <LadderTittle>trending</LadderTittle>
          <div></div>
          <LadderList>
            {ladder.map((l, index) => {
              return <li key={index} onClick={() => navigate(`/hashtag/${l.hashtag_name.replace("#", "")}`)}>{l.hashtag_name}</li>;
            })}
          </LadderList>
        </ContainerLadder>
      )}
    </>
  );
}

const ContainerLadder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  position: absolute;
  width: 301px;
  height: 406px;
  right: 1%;
  top: 319px;

  background: #171717;
  border-radius: 16px;
  div {
    width: 301px;
    border-bottom: 1px solid #484848;
    margin-top: 12px;
  }
`;

const LadderTittle = styled.h1`
  margin-left: 16px;
  margin-top: 9px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  /* identical to box height */

  color: #ffffff;
`;

const LadderList = styled.ul`
  width: 130px;
  height: 293px;
  li {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: 0.05em;
    margin-top: 22px;
    margin-left: 16px;
    color: #ffffff;
    :hover{
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;
