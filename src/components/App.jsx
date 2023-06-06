import { Route, Routes } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { login } from 'redux/auth/actions';
import { darkMode, lightMode } from 'redux/theme/actions';
import auth from '../firebase/firebase';

import Layout from './Layout/Layout';
import Login from './Login/Login';
import Register from './Register/Register';
import Reset from './Reset/Reset';
import SleepApp from 'pages/Sleep';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Dashboard from 'pages/Dashboard/Dashboard';
import Information from 'pages/Information/Information';
import Health from 'pages/Health/Health';
import Settings from 'pages/Settings/Settings';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isDarkMode = JSON.parse(localStorage.getItem('isDarkMode'));

    if (isDarkMode) {
      dispatch(darkMode());
    } else {
      dispatch(lightMode());
    }
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      handleRefreshUser(user);
    } else {
      return;
    }
  });

  const handleRefreshUser = async ({ email, password }) => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      const userName = response.user.multiFactor.user.displayName;
      const userEmail = response.user.multiFactor.user.email;
      dispatch(login({ userName, userEmail }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PublicRoute restricted>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="register"
            element={
              <PublicRoute restricted>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
        <Route
          path="reset"
          element={
            <PublicRoute restricted>
              <Reset />
            </PublicRoute>
          }
        />
        <Route
          path="sleep"
          element={
            <PrivateRoute>
              <SleepApp></SleepApp>
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="information" element={<Information />} />
          <Route path="health" element={<Health />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};
