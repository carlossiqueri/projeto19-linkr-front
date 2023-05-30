import styled from "styled-components";

export default function Header(){
    return(
        <HeaderContainer>
            <p>linkr</p>
            <span> <ion-icon name="chevron-down-outline"></ion-icon> <img /></span>

        </HeaderContainer>
    )
}

const HeaderContainer = styled.section`
background-color: #151515;
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
height: 72px;
color: #FFFFFF;

position: fixed;
top: 0;
left: 0;
z-index: 1;

p{
    font-family: 'Passion One';
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    margin-left: 28px;
}

span{
    font-size: 25px;
    display: flex;
    align-items: center;

    img{
        width: 53px;
        height: 53px;
        border-radius: 26.5px;
        background-color: purple;
        margin-right: 17px;
        margin-left: 16.3px;
    }
}
`