import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  background-color: #151515;
  height: 100vh;
  > div {
    align-self: center;
    margin-left: 200px;
  }
  h1 {
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #ffffff;
  }

  h2 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
    max-width: 20ch;
  }

  form {
    display: grid;
    align-content: center;
    gap: 15px;
    background-color: #333333;
    padding: 10%;
  }

  form > input,
  form > button {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    border-radius: 6px;
    border: none;
  }

  form > input {
    color: #9f9f9f;
    padding: 15px;
  }

  form > button {
    color: #ffffff;
    background-color: #1877f2;
    padding: 15px 0px;
  }

  a {
    place-self: center;
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr;
    h1 {
      font-size: 76px;
    }
    h2 {
      font-size: 23px;
      line-height: 34px;
    }
    > div {
      margin: 0;
      display: grid;
      justify-items: center;
      align-self: center;
    }
    form {
      align-content: flex-start;
    }
  }
`;

export default Wrapper;
