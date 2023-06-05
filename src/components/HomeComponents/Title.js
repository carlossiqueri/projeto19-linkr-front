import styled from "styled-components";

export default function Title(){
    return(
        <TitleComponent>
            <p> Fulaninho de Tal</p>
        </TitleComponent>
    )
}

const TitleComponent = styled.div`
p {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 63.73px;
    color: #ffffff;
  }
`

