import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom"

export default function SearchPeople() {
  const searchRef = React.useRef();
  const [isOpenSearch, setIsOpenSearch] = React.useState(false);

  function toogleSearchUser() {
    console.log("pesquisando");
  }

  function handleSearch(e) {
    if(e.target.value ==""){
      setIsOpenSearch(false)
      console.log("some")
    }else{
      setIsOpenSearch(true)
      console.log("aparece")
    }
    console.log(e.target.value)
  }
  
  console.log(isOpenSearch)
  return (
    <Search>
      <SearchInput>
        <input
          required
          placeholder="Search for people"
          type="text"
          name="url"
          onChange={handleSearch}
        />

        <Icone>
          <ion-icon name="search-sharp"></ion-icon>
        </Icone>
      </SearchInput>
      <SearchBar style={{ display: isOpenSearch ? "initial" : "none" }}>
        <Link to="/">
          <img src="" alt="" />
          <h1> João Avatares</h1>
        </Link>
        <Link to="/">
          <img src="" alt="" />
          <h1> João Avatares</h1>
        </Link>
        <Link to="/">
          <img src="" alt="" />
          <h1> João Avatares</h1>
        </Link>
      </SearchBar>
    </Search>
  );
}
const Search = styled.span`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 26px;
  left: 0vw;
  height: 110px;
  padding: 0px;
  margin: 0px;
  div {
    background-color: white;
  }

  span {
    display: ${(props) => (props.isOpenSearch ? "none" : "flex")};
    margin-bottom: -100px;
    height: 60px;
    height: 120px;
    height: 150px;
  }
`;

const Icone = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SearchInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60vw;
  max-width: 563px;
  border-radius: 8px;
  background-color: white;
  position: relative;
  z-index: 1;
  margin-bottom: -30px;
  input {
    ::placeholder {
      font-family: "Lato";
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 23px;
      color: #c6c6c6;
    }
    margin-left: 17px;
    margin-top: 3px;
    margin-bottom: 3px;
    width: 100%;
    border: 0px none;
    height: 45px;
  }
  ion-icon {
    padding-right: 11px;
    color: #c6c6c6;
    width: 21px;
    height: 21px;
  }
`;

const SearchBar = styled.span`
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  background-color: #c6c6c6;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-top: 20px;
  margin-top: 15px;
  width: 60vw;
  max-width: 563px;
  height: 300px;
  a{
    text-decoration: none;
    display: flex;
    align-items: center;
    width: 100%;
    height: 53px;
    background-color: #c6c6c6;
    margin-bottom: 8px;
  }
  img{
    width: 39px;
    height: 39px;
  }
  h1{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 23px;
    color: #515151;
  }
`;