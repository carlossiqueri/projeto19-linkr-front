import styled from "styled-components";

export default function SearchPeople(){
    return(
        <Search>
            <input type="text"/>
            <span> <ion-icon name="search-sharp"></ion-icon></span>
        </Search>
    )
}

const Search = styled.p`
display:flex;
justify-content: space-between;
width: 40%;
max-width: 563px;
height: 45px;
border-radius: 8px;
background-color: white;
input{
    margin-left: 17px;
    margin-top:3px;
    margin-bottom:3px;
    width: 100%;
    border: 0px none;
}
ion-icon{
    padding-right: 11px;
    color:black;
    width: 21px;
    height: 21px;
}
`