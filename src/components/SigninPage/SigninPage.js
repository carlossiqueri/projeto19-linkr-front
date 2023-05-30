import AuthPage from "../AuthPage/AuthPage";
import SigninForm from "../SigninForm/SigninForm";

const SigninPage = ({ setSession }) => {
  return (
    <AuthPage>
      <SigninForm setSession={setSession} />
    </AuthPage>
  );
};

export default SigninPage;
