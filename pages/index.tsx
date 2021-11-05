import AuthPages from "../components/auth/AuthPages";
import { auth } from "../Firestore/Firestore";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { RootState } from "../store";

const Home = () => {
  const loginState = useSelector((state: RootState) => state.auth.isLogin);
  const dispatch = useDispatch();
  auth.onAuthStateChanged((user) => {
    dispatch(authActions.setLogin(!!user));
  });
  return !loginState && <AuthPages />;
};

export default Home;
