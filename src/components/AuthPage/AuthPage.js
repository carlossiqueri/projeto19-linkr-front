import Wrapper from "./Wrapper";

const AuthPage = ({ children }) => {
  return (
    <Wrapper>
      <div>
        <h1>linkr</h1>
        <h2>save, share and discover the best links on the web</h2>
      </div>
      {children}
    </Wrapper>
  );
};

export default AuthPage;
