import { useDispatch, useSelector } from "react-redux";
import { baseAPI } from "../../../../components/baseAPI";
import { getCurrentUser } from "../../../../redux/user/userSlice";
import css from "./HeartModal.module.scss";
import axios from "axios";
import Notiflix from "notiflix";

const HeartModal = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userEmail = useSelector((state) => state.user.email);

  const handleGetCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseAPI}/api/users/${userEmail}`);
      dispatch(getCurrentUser(response.data.data.user));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeHeart = async (event) => {
    event.preventDefault();
    const heart = event.target.elements.height.value;

    if (heart > 150 || heart < 20) {
      Notiflix.Notify.failure("Enter the correct data please");
      return;
    } else {
      try {
        const response = await axios.put(
          `${baseAPI}/api/users/${userEmail}/heart`,
          { heart }
        );
        Notiflix.Notify.success("Your heart bmp has already changed");
        handleGetCurrentUser();
        return response.data;
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className={css.overlay}>
      <div
        className={css.modal}
        style={
          isDarkMode
            ? { backgroundColor: "#360A46" }
            : { backgroundColor: "#FFFFFF" }
        }
      >
        <p
          className={css.modal__title}
          style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
        >
          Change your heart bmp now
        </p>
        <form className={css.modal__form} onSubmit={handleChangeHeart}>
          <input
            type="number"
            placeholder="Your bmp..."
            required
            pattern="^1\d{2}$|^2[0-6]\d$|^250$"
            minLength={3}
            maxLength={3}
            className={css.modal__input}
            name="height"
          />
          <button className={css.modal__submit}>Change</button>
        </form>
      </div>
    </div>
  );
};

export default HeartModal;
