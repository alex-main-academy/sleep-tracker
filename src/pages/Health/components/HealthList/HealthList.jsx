import { useSelector } from "react-redux";
import { useState } from "react";
import css from "./HealthList.module.scss";
import heartImage from "../../img/heart.png";
import pressureImage from "../../img/pressure.png";
import breathImage from "../../img/breath.png";
import tempImage from "../../img/temp.png";
import HeartModal from "../HeartModal/HeartModal";
import sprite from "../../../../assets/img/sprite.svg";
import PressureModal from "../PressureModal/PressureModal";
import BreathModal from "../BreathModal/BreathModal";
import TempModal from "../TempModal/TempModal";

const HealthList = () => {
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userHeart = useSelector((state) => state.user.heart);
  const userPressure = useSelector((state) => state.user.pressure);
  const userBreath = useSelector((state) => state.user.breath);
  const userTemp = useSelector((state) => state.user.temp);

  const [heartModal, setHeartModal] = useState(false);
  const [pressureModal, setPressureModal] = useState(false);
  const [breathModal, setBreathModal] = useState(false);
  const [tempModal, setTempModal] = useState(false);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);

  const handleOpenHeartModal = () => {
    setHeartModal(true);
    setIsAnyModalOpen(true);
  };

  const handleOpenPressureModal = () => {
    setPressureModal(true);
    setIsAnyModalOpen(true);
  };

  const handleOpenBreathModal = () => {
    setBreathModal(true);
    setIsAnyModalOpen(true);
  };

  const handleOpenTempModal = () => {
    setTempModal(true);
    setIsAnyModalOpen(true);
  };

  const handleCloseAllModal = () => {
    setPressureModal(false);
    setHeartModal(false);
    setBreathModal(false);
    setTempModal(false);
    setIsAnyModalOpen(false);
  };

  return (
    <div className={css.health}>
      <ul className={css.health__list}>
        <li
          className={css.health__item}
          onClick={handleOpenHeartModal}
          style={
            isDarkMode
              ? { backgroundColor: "#360A46", color: "#FFFFFF" }
              : { backgroundColor: "#FFFFFF", color: "#000000" }
          }
        >
          <div className={css.health__text}>
            <p className={css.health__top}>
              <span>{userHeart || 0}</span> bmp
            </p>
            <p
              className={css.health__subtitle}
              style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
            >
              Heart rate
            </p>
          </div>
          <img
            src={heartImage}
            alt=""
            className={css.health__image}
            width={88}
            height={88}
          />
        </li>
        <li
          className={css.health__item}
          onClick={handleOpenPressureModal}
          style={
            isDarkMode
              ? { backgroundColor: "#360A46", color: "#FFFFFF" }
              : { backgroundColor: "#FFFFFF", color: "#000000" }
          }
        >
          <div className={css.health__text}>
            <p className={css.health__top}>
              <span>{userPressure || 0}</span>
            </p>
            <p
              className={css.health__subtitle}
              style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
            >
              Pressure
            </p>
          </div>
          <img
            src={pressureImage}
            alt=""
            className={css.health__image}
            width={88}
            height={88}
          />
        </li>
        <li
          className={css.health__item}
          onClick={handleOpenBreathModal}
          style={
            isDarkMode
              ? { backgroundColor: "#360A46", color: "#FFFFFF" }
              : { backgroundColor: "#FFFFFF", color: "#000000" }
          }
        >
          <div className={css.health__text}>
            <p className={css.health__top}>
              <span>{userBreath || 0}</span> tpm
            </p>
            <p
              className={css.health__subtitle}
              style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
            >
              Breathing Breath
            </p>
          </div>
          <img
            src={breathImage}
            alt=""
            className={css.health__image}
            width={71}
            height={88}
          />
        </li>
        <li
          className={css.health__item}
          onClick={handleOpenTempModal}
          style={
            isDarkMode
              ? { backgroundColor: "#360A46", color: "#FFFFFF" }
              : { backgroundColor: "#FFFFFF", color: "#000000" }
          }
        >
          <div className={css.health__text}>
            <p className={css.health__top}>
              <span>{userTemp || 0}</span> °C
            </p>
            <p
              className={css.health__subtitle}
              style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}
            >
              Body Temperature
            </p>
          </div>
          <img
            src={tempImage}
            alt=""
            className={css.health__image}
            width={60}
            height={88}
          />
        </li>
      </ul>
      {heartModal && <HeartModal />}
      {pressureModal && <PressureModal />}
      {breathModal && <BreathModal />}
      {tempModal && <TempModal />}
      {isAnyModalOpen && (
        <button className={css.health__close} onClick={handleCloseAllModal}>
          <svg width={40} height={40}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
      )}
    </div>
  );
};

export default HealthList;
