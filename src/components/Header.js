import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SearchPeople from "../components/HomeComponents/SearchPeople.js"

export default function Header({ setIsAuthenticated, setSession }) {
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  const typeIonIcon = isOpenMenu
    ? "chevron-up-outline"
    : "chevron-down-outline";
  const menuRef = React.useRef();
  const imgRef = React.useRef();

  function toggleLogoutMenu(e) {
    setIsOpenMenu((prevState) => !prevState);
  }

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (imgRef.current.contains(event.target)) {
        return;
      }
      if (!menuRef.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  function handleLogout() {
    setIsAuthenticated(false);
    setSession(null);
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <HeaderContainer>
      <p className="Title">linkr</p>

      <SearchPeople />
      <span ref={imgRef} onClick={toggleLogoutMenu}>
        <ion-icon name={typeIonIcon}></ion-icon> <img data-test="avatar" />
      </span>

      <div data-test="menu"
        onClick={handleLogout}
        ref={menuRef}
        style={{ display: isOpenMenu ? "initial" : "none" }}
      >
        <span data-test="logout">Logout</span>
      </div>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.section`
  background-color: #151515;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 72px;
  color: #ffffff;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  p {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    margin-left: 28px;
  }

  
  .Title{
    margin-left: 28px;
  }
  
  span {
    font-size: 25px;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 53px;
      height: 53px;
      border-radius: 26.5px;
      background-color: purple;
      margin-right: 17px;
      margin-left: 16.3px;
    }
  }

  > div {
    position: fixed;
    top: 72px;
    right: 0;
    background-color: #151515;
    padding: 25px;
    border-radius: 0 0 0 20px;
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }

  > div > span {
    cursor: pointer;
  }
`;
