import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useState } from "react";
import { InfoContext } from "../context/InfoContext.js";
import UserContainer from "../components/UserContainer/UserContainer.js";

export default function Homepage({ setIsAuthenticated, setSession }) {
    const [form, setForm] = useState({ url: "", description: "" });
    const { token } = useContext(InfoContext);
  
    return (
      <UserpageContainer>
        <Header setIsAuthenticated={setIsAuthenticated} setSession={setSession} />
  
        <UserContainer />
      </UserpageContainer>
    );
  }
  
  const UserpageContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #333333;
    width: 100%;
    height: 100%;
  `;
