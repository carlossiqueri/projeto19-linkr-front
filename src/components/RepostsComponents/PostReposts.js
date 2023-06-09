import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import { useContext } from "react";
import { InfoContext } from "../../context/InfoContext";

export default function PostReposts({hasShared}){

    const {userInfo} = useContext(InfoContext);
    return(
        <Wrapper>
       {  hasShared ?    
        (<RepostContainer>
        <BiRepost size={25}/>
         <p>Re-posted by {userInfo.username}</p>
        </RepostContainer>) : null}
        </Wrapper>
    )
}

const Wrapper = styled.div`

`
const RepostContainer = styled.div`
display: flex;
align-items: center;
color: #FFFFFF;
font-family: 'Lato';
font-weight: 400;
font-size: 11px;
line-height: 13px;
padding: 5px;
margin-left: 8px;
p{
    margin-left: 5px;
}
`