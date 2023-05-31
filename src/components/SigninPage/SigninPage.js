import AuthPage from "../AuthPage/AuthPage";
import SigninForm from "../SigninForm/SigninForm";

const SigninPage = ({ setSession, setIsAuthenticated }) => {
  return (
    <AuthPage>
      <SigninForm
        setSession={setSession}
        setIsAuthenticated={setIsAuthenticated}
      />
    </AuthPage>
  );
};

export default SigninPage;
