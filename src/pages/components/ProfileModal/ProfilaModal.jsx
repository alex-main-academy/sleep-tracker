import { useSelector } from "react-redux";
import css from "./ProfilaModal.module.scss";
import userImage from "../../../assets/img/header/user-big.png";
import { baseAPI } from "../../../components/baseAPI";

const ProfileModal = () => {
  const userAvatar = useSelector((state) => state.user.avatar);
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userName = useSelector((state) => state.user.name);
  const userHeight = useSelector((state) => state.user.height);
  const userWeight = useSelector((state) => state.user.weight);
  const userAge = useSelector((state) => state.user.age);
  const userLike = useSelector((state) => state.user.like);

  return (
    <div
      className={css.modal}
      style={
        isDarkMode
          ? { backgroundColor: "#360A46", color: "#FFFFFF" }
          : { backgroundColor: "#FFFFFF", color: "#000000" }
      }
    >
      <div className={css.modal__user}>
        <img
          src={
            userAvatar
              ? `${baseAPI}/api/users/uploads/${userAvatar}`
              : userImage
          }
          alt=""
          width={150}
          height={150}
        />
        <span>{userName}</span>
      </div>
      <ul className={css.modal__list}>
        <li className={css.modal__item}>
          <p className={css.modal__top}>Height</p>
          <p className={css.modal__bottom}>
            <span>{userHeight || 0} </span> cm
          </p>
        </li>
        <li className={css.modal__item}>
          <p className={css.modal__top}>Weight</p>
          <p className={css.modal__bottom}>
            <span>{userWeight || 0} </span> kg
          </p>
        </li>
        <li className={css.modal__item}>
          <p className={css.modal__top}>Age</p>
          <p className={css.modal__bottom}>{userAge || 0}</p>
        </li>
      </ul>
      <p className={css.modal__subtitle}>
        How many hours would you like to sleep
      </p>
      <div className={css.like__block}>
        <p className={css.like__target}>Target</p>
        <p
          className={css.like__item}
          style={isDarkMode ? { color: "#FFFFFF" } : { color: "#959292" }}
        >
          <span
            style={isDarkMode ? { color: "#FFFFFF" } : { color: "#000000" }}
          >
            {userLike || 0}
          </span>
          / 9 hours
        </p>
      </div>
      <div className={css.like__progress}>
        <div
          className={css.like__progress_active}
          style={{ width: `${(100 / 9) * Number(userLike) || 0}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProfileModal;
