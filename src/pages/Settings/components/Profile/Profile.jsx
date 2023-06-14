import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { darkMode, lightMode } from "../../../../redux/theme/actions";
import { baseAPI } from "../../../../components/baseAPI";
import { getCurrentUser } from "../../../../redux/user/userSlice";
import axios from "axios";
import css from "./Profile.module.scss";
import Notiflix from "notiflix";

const Profile = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userEmail = useSelector((state) => state.user.email);
  const [toggle, setToggle] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleGetCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseAPI}/api/users/${userEmail}`);
      dispatch(getCurrentUser(response.data.data.user));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("avatar", selectedFile);

      await axios.post(
        `${baseAPI}/api/users/${userEmail}/upload-avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      handleGetCurrentUser();
      Notiflix.Notify.success("Your photo has changed!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeToggle = () => {
    setToggle(!toggle);
    localStorage.setItem("isDarkMode", !toggle);

    if (toggle) {
      dispatch(lightMode());
    } else {
      dispatch(darkMode());
    }
  };

  return (
    <div
      className={css.profile}
      style={
        isDarkMode
          ? { backgroundColor: "#360A46", color: "#FFFFFF" }
          : { backgroundColor: "#FFFFFF", color: "#000000" }
      }
    >
      <p className={css.profile__title}>Profile settings</p>
      <div className={css.profile__content}>
        <div className={css.profile__block}>
          <span className={css.profile__number}>01</span>
          <p className={css.profile__subtitle}>Change the theme</p>
          <button
            type="button"
            className={css.profile__theme}
            onClick={handleChangeToggle}
            style={
              isDarkMode
                ? { backgroundColor: "#220C2B" }
                : { backgroundColor: "#8367D6" }
            }
          >
            <span
              className={css.profile__toggle}
              style={
                isDarkMode ? { left: "calc(100% - 32px)" } : { left: "4px" }
              }
            ></span>
            <span
              className={css.profile__toggle_name}
              style={isDarkMode ? { left: "12px" } : { left: "40px" }}
            >
              {isDarkMode ? "BLACK" : "WHITE"}
            </span>
          </button>
        </div>
        <div className={css.profile__block}>
          <span className={css.profile__number}>02</span>
          <p className={css.profile__subtitle}>Change the photo</p>
          <form className={css.profile__form} onSubmit={handleSubmit}>
            <input
              type="file"
              className={css.profile__input}
              accept="image/*"
              onChange={handleFileChange}
              required
              name="avatar"
            />
            <button className={css.profile__submit}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
