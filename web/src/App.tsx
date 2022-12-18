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
import { setToken, setUser } from './redux/features/userSlice';
import Loader from './components/Loader/Loader';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import DashboardLayout from './layouts/DashboardLayout';
import Clients from './pages/clients/Clients';
import NewClient from './pages/new_client/NewClient';
import 'react-toastify/dist/ReactToastify.css';
import NewServePlan from './pages/new_serve_plan/NewServePlan';
import Client from './pages/client/Client';

const App = () => {
  const dispatch = useDispatch();
  const refreshToken = ls.get<string | null>('refreshToken');
  const [isInitialized, setIsInitialized] = useState(false);
  const { refetch } = useFetchUserQuery(null, {
    skip: true
  });
  const [getAccessToken] = useGetAccessTokenMutation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (refreshToken) {
          const { accessToken } = await getAccessToken({
            refreshToken
          }).unwrap();
          dispatch(setToken(accessToken));
          const { data: user } = await refetch();
          if (user) {
            dispatch(setUser(user));
          }
          setIsInitialized(true);
        } else {
          setIsInitialized(true);
        }
      } catch (error) {
        setIsInitialized(true);
      }
    };

    fetchUser();
  }, [refreshToken, dispatch, getAccessToken, setIsInitialized, refetch]);

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
          <Route path=":clientId" element={<Client />} />
          <Route path=":clientId/profiles/new" element={<NewProfile />} />
          <Route
            path=":clientId/profiles/:profileId/serves/new"
            element={<NewServePlan />}
          />
        </Route>
        <Route path="/dashboard/profiles" element={<DashboardLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
