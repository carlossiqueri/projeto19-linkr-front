import styled from "styled-components";
import Header from "../components/Header";

export default function Homepage({ setIsAuthenticated, setSession }) {
  return (
    <HomepageContainer>
      <Header setIsAuthenticated={setIsAuthenticated} setSession={setSession} />

      <FeedContainer>
        <p>timeline</p>

        <span>
          <img />
          <div>
            <p>What are you going to share today?</p>

            <input required placeholder="http://..." type="text" />

            <textarea
              required
              placeholder="Awesome article about #javascript"
              type="text"
            />

            <button> Publish </button>
          </div>
        </span>
      </FeedContainer>
    </HomepageContainer>
  );
}

const HomepageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
  width: 100%;
  height: 100vh;
`;

const FeedContainer = styled.div`
  width: 50%;
  margin-top: 148px;
  display: flex;
  flex-direction: column;

  p {
    font-family: "Oswald", sans-serif;
    font-weight: 700;
    font-size: 43px;
    line-height: 63.73px;
    color: #ffffff;
  }

  span {
    width: 611px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    margin-top: 43px;

    img {
      width: 50px;
      height: 50px;
      background-color: purple;
      border-radius: 26.5px;
      margin: 16px;
    }

    div {
      display: flex;
      flex-direction: column;
      width: 502px;
      position: relative;

      p {
        font-family: "Lato", sans-serif;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-top: 21px;
        margin-bottom: 10px;
      }

      input {
        background-color: #efefef;
        border-radius: 5px;
        border: none;
        width: 100%;
        padding: 10px 0 10px 10px;
        outline: none;
        margin-bottom: 5px;

        font-family: "Lato", sans-serif;
        font-size: 15px;
        font-weight: 300;
        line-height: 18px;
        color: #949494;
      }

      textarea {
        height: 66px;
        padding: 10px 10px;
        border: none;
        border-radius: 5px;
        background-color: #efefef;
        outline: none;
        margin-bottom: 8px;
        resize: none;

        font-family: "Lato", sans-serif;
        font-size: 15px;
        font-weight: 300;
        line-height: 18px;
        color: #949494;
      }

      button {
        background-color: #1877f2;
        font-family: "Lato", sans-serif;
        font-weight: 700;
        font-size: 14px;
        line-height: 16.8px;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        padding: 5px;
        width: 112px;
        margin-bottom: 16px;
        margin-left: 400px;
      }
    }
  }
`;
