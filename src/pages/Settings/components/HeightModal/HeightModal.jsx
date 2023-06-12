import { useDispatch, useSelector } from "react-redux";
import { baseAPI } from "../../../../components/baseAPI";
import { getCurrentUser } from "../../../../redux/user/userSlice";
import css from "./HeightModal.module.scss";
import axios from "axios";
import Notiflix from "notiflix";

const HeightModal = () => {
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

  const handleChangeHeight = async (event) => {
    event.preventDefault();
    const height = event.target.elements.height.value;

    if (height > 300 || height < 100) {
      Notiflix.Notify.failure("Enter the correct data please");
      return;
    } else {
      try {
        const response = await axios.put(
          `${baseAPI}/api/users/${userEmail}/height`,
          { height }
        );
        Notiflix.Notify.success("Your height has already changed");
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
        <p className={css.modal__title}>Change your height now</p>
        <form className={css.modal__form} onSubmit={handleChangeHeight}>
          <input
            type="number"
            placeholder="Your height..."
            required
            pattern="^1\d{2}$|^2[0-6]\d$|^270$"
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

export default HeightModal;
