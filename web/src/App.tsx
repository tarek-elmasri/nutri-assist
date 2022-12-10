import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Main from './pages/main/Main';
import NewProfile from './pages/new_profile';
import Profiles from './pages/profiles';
import {
  useFetchUserQuery,
  useGetAccessTokenMutation
} from './redux/services/serverApi';
import './App.css';

import * as ls from 'local-storage';
import { setToken, setUser, User } from './redux/features/userSlice';
import Loader from './components/Loader/Loader';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import DashboardLayout from './layouts/DashboardLayout';
import Clients from './pages/clients/Clients';
import NewClient from './pages/new_client/NewClient';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  const refreshToken = ls.get<string | null>('refreshToken');
  const [isInitialized, setIsInitialized] = useState(!refreshToken);
  const [skipUser, setskipUser] = useState(true);
  const { data: userData, isError: isUserError } = useFetchUserQuery(null, {
    skip: skipUser
  });
  const [
    getAccessToken,
    { data: accessTokenData, isError: isAccessTokenError }
  ] = useGetAccessTokenMutation();

  // trigger fetching access token
  useEffect(() => {
    if (!isInitialized) {
      getAccessToken(refreshToken);
    }
  }, [isInitialized, getAccessToken, refreshToken]);

  // triggers fetching user when access token is available
  useEffect(() => {
    if (accessTokenData) {
      const { accessToken } = accessTokenData as { accessToken: string };
      dispatch(setToken(accessToken));
      setskipUser(false);
    }
  }, [accessTokenData, setskipUser, dispatch]);

  // dispatch user data to store if available
  useEffect(() => {
    if (userData) {
      dispatch(setUser(userData as User));
      setIsInitialized(true);
    }
  }, [userData, dispatch, setIsInitialized]);

  // initialize app if errors
  useEffect(() => {
    if (isAccessTokenError || isUserError) setIsInitialized(true);
  }, [isAccessTokenError, isUserError, setIsInitialized]);

  if (!isInitialized) return <Loader fullScreen />;

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={false}
        closeOnClick={true}
        theme="dark"
      />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard/clients" element={<DashboardLayout />}>
          <Route index element={<Clients />} />
          <Route path="new" element={<NewClient />} />
          <Route path=":clientId" element={<Clients />} />
          <Route path=":clientId/profiles/new" element={<NewProfile />} />
        </Route>
        <Route path="/dashboard/profiles" element={<DashboardLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
