import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/actions";
import auth from "../../firebase/firebase";
import css from "./Login.module.scss";
import Notiflix from "notiflix";
import Loader from "../Loader/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async (e) => {
    setIsLogged(true);
    e.preventDefault();
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      const userName = response.user.multiFactor.user.displayName;
      const userEmail = response.user.multiFactor.user.email;

      localStorage.setItem("user", JSON.stringify({ email, password }));

      dispatch(login({ userName, userEmail }));
      setIsLogged(false);
      Notiflix.Notify.success("You have successfully logged into your account");
    } catch (error) {
      Notiflix.Notify.failure(
        "You are not Logged In. Enter correct data please or register on the site"
      );
      setIsLogged(false);
    }
  };

  return (
    <div className={css.login}>
      {isLogged && <Loader />}
      <p className={css.login__title}>Login to continue</p>
      <form className={css.login__form} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className={css.login__input}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={css.login__input}
          name="password"
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={css.login__submit}>Log In</button>
      </form>
      <Link to="register" className={css.login__link}>
        Don`t have an account? Register here.
      </Link>
    </div>
  );
};

export default Login;
