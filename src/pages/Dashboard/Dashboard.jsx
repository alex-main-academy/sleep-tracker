import { useDispatch, useSelector } from "react-redux";
import { baseAPI } from "../../components/baseAPI";
import { getCurrentUser } from "../../redux/user/userSlice";
import { useEffect } from "react";
import axios from "axios";
import css from "./Dashboard.module.scss";
import Diagram from "./components/Diagram/Diagram";
import Chart from "./components/Chart/Chart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.isDarkMode);
  const userEmail = useSelector((state) => state.user.email);

  useEffect(() => {
    handleGetCurrentUser();
  });

  const handleGetCurrentUser = async () => {
    try {
      const response = await axios.get(`${baseAPI}/api/users/${userEmail}`);
      dispatch(getCurrentUser(response.data.data.user));
      return response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section className={css.dashboard}>
      <h2
        className={css.dashboard__title}
        style={isDarkMode ? { color: "#FFFFFF" } : { color: "#232B36" }}
      >
        Dashboard
        <span style={isDarkMode ? { color: "#FFFFFF" } : { color: "#667481" }}>
          All instruments
        </span>
      </h2>
      <div className={css.dashboard__content}>
        <Diagram />
        <Chart />
      </div>
    </section>
  );
};

export default Dashboard;
