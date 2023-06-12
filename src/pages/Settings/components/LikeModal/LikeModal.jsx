import { useDispatch, useSelector } from "react-redux";
import { baseAPI } from "../../../../components/baseAPI";
import { getCurrentUser } from "../../../../redux/user/userSlice";
import css from "./LikeModal.module.scss";
import axios from "axios";
import Notiflix from "notiflix";

const LikeModal = () => {
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

  const handleChangeAge = async (event) => {
    event.preventDefault();
    const like = event.target.elements.like.value;

    if (like > 9 || like < 1) {
      Notiflix.Notify.failure("Enter the correct data please");
      return;
    } else {
      try {
        const response = await axios.put(
          `${baseAPI}/api/users/${userEmail}/like`,
          { like }
        );
        Notiflix.Notify.success("Your hours to sleep has already changed");
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
        <p className={css.modal__title}>Change your sleep now</p>
        <form className={css.modal__form} onSubmit={handleChangeAge}>
          <input
            type="number"
            placeholder="Your hours..."
            required
            pattern="^1\d{2}$|^2[0-6]\d$|^250$"
            minLength={3}
            maxLength={3}
            className={css.modal__input}
            name="like"
          />
          <button className={css.modal__submit}>Change</button>
        </form>
      </div>
    </div>
  );
};

export default LikeModal;
