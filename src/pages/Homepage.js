import styled from "styled-components";
import Header from "../components/Header";
import { useContext, useState } from "react";
import axios from "axios";
import { InfoContext } from "../context/InfoContext";
import Modal from "react-modal";
import ReactModal from "react-modal";
import { ColorRing } from "react-loader-spinner";

export default function Homepage({ setIsAuthenticated, setSession }) {
  const [form, setForm] = useState({ url: "", description: "" });
  const [disabled, setDisabled] = useState(false);
  const { token } = useContext(InfoContext);
  const [openedModal, setOpenedModal] = useState(false);
  const [delected, setDelected] = useState(false);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function createPost(e) {
    e.preventDefault();

    setDisabled(true);

    setTimeout(() => {
      const urlPost = `${process.env.REACT_APP_API_URL}newPost`;
      const body = { url: form.url, description: form.description };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.post(urlPost, body, config);
      promise.then((res) => {
        console.log("Deu certo!!!");
        setForm({ url: "", description: "" });
      });
      promise.catch((err) => {
        console.log(err.response.data);
        alert("Houve um erro ao publicar seu link");
        setDisabled(false);
      });
      promise.finally(() => {
        setDisabled(false);
      });
    }, 3000);
  }

  function openModal() {
    setOpenedModal(true);
  }

  function deletePost(id){
    setDelected(true);

    setTimeout(() => {
      const urlDelete= `${process.env.REACT_APP_API_URL}`;
    const config = {
      headers:
      {Authorization: `Bearer ${token}`}
    }

    const promise = axios.delete(urlDelete, config);
    promise.then(res => {
      setDelected(false);
      setOpenedModal(false);
    });
    promise.catch((err) => {
      console.log(err.response.data.mensagem);
      setOpenedModal(false);
      alert("Não foi possível excluir o post");
    });
    promise.finally(() => {
      setOpenedModal(false);
    })
    
    }, 3000);
    
  }

  return (
    <HomepageContainer>
      <Header setIsAuthenticated={setIsAuthenticated} setSession={setSession} />

      <FeedContainer disabled={disabled}>
        <p>timeline</p>

        <span>
          <img />
          <div>
            <p>What are you going to share today?</p>

            <form onSubmit={createPost}>
              <input
                required
                placeholder="http://..."
                type="text"
                name="url"
                value={form.url}
                onChange={handleForm}
                disabled={disabled}
              />

              <textarea
                required
                placeholder="Awesome article about #javascript"
                type="text"
                name="description"
                value={form.description}
                onChange={handleForm}
                disabled={disabled}
              />

              {disabled ? (
                <button disabled={disabled}> Publishing... </button>
              ) : (
                <button> Publish </button>
              )}
            </form>

            <button onClick={openModal}>Teste</button>
          </div>
        </span>
      </FeedContainer>

      <StyledModal isOpen={openedModal} style={customStyles}>
        <p>
          Are you sure you want <br /> to delete this post?
        </p>


          {delected ? (
           <ColorRing
           visible={true}
           height="80"
           width="80"
           ariaLabel="blocks-loading"
           wrapperStyle={{}}
           wrapperClass="blocks-wrapper"
           colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF" ]}
         />
            
          ) : (
            <div>
            <WhiteButton onClick={() => setOpenedModal(false)}>No, go back</WhiteButton>
            <BlueButton onClick={deletePost}>Yes, delete it</BlueButton>
            </div>
          )}
        
        
        
      </StyledModal>
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

      p {
        font-family: "Lato", sans-serif;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        color: #707070;
        margin-top: 21px;
        margin-bottom: 10px;
      }
      form {
        display: flex;
        flex-direction: column;

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
          color: ${({ disabled }) => (disabled ? "#949494" : "#000000")};
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
          width: 100%;

          font-family: "Lato", sans-serif;
          font-size: 15px;
          font-weight: 300;
          line-height: 18px;
          color: ${({ disabled }) => (disabled ? "#949494" : "#000000")};
        }
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

const customStyles = {
  
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    backgroundColor: "#333333",
    margin: "auto",
    borderRadius: "50px",
    padding: "20px",

    fontFamily: "Lato",
    fontSize: "20px", 
    fontWeight: "700",
    lineHeight: "25.8px",
    color: "#FFFFFF",
    textAlign: "center"
  },
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    zIndex: "2"
  },
};

const StyledModal = styled(ReactModal)`
  ${customStyles.content}

  div{
    margin-top: 30px;
    margin-bottom: 20px;
  }
`;

const BlueButton = styled.button`
background-color: #1877F2;
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
margin-left: 20px;
`
const WhiteButton = styled.button`
background-color: white;
font-family: "Lato", sans-serif;
font-weight: 700;
font-size: 14px;
line-height: 16.8px;
color: #1877F2;
border: none;
border-radius: 5px;
cursor: pointer;
padding: 5px;
width: 112px;

`