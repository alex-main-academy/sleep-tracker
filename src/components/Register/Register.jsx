import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/actions";
import css from "./Register.module.scss";
import auth from "../../firebase/firebase";
import Loader from "../Loader/Loader";
import Notiflix from "notiflix";
import axios from "axios";
import { createUser } from "../../redux/user/userSlice";
import { baseAPI } from "../baseAPI";

const Register = () => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [displayName, setName] = useState(null);

  const handleCreateUser = async (user) => {
    try {
      const response = await axios.post(`${baseAPI}/api/users`, user);
      dispatch(createUser(response.data.data.user));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsLogged(true);
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await user.updateProfile({
        displayName: displayName,
      });
      const name = displayName;

      localStorage.setItem("user", JSON.stringify({ email, password }));

      dispatch(register({ name, email }));
      handleCreateUser({ name, email });
      setIsLogged(false);
      Notiflix.Notify.success("You have successfully created your account");
    } catch (error) {
      Notiflix.Notify.failure(
        "You are not created your account. Enter correct data please!"
      );
      setIsLogged(false);
    }
  };

  return (
    <div className={css.register}>
      {isLogged && <Loader />}
      <p className={css.register__title}>Sign up to continue</p>
      <form className={css.register__form} onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Name"
          className={css.register__input}
          name="name"
          minLength={4}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={css.register__input}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={css.register__input}
          name="password"
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={css.register__submit}>Sign Up</button>
      </form>
      <Link to="/" className={css.register__link}>
        Already have an account? Login here.
      </Link>
    </div>
  );
};

export default Register;
