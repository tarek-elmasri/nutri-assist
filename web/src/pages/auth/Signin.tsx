import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import * as ls from 'local-storage';
import { Navigate, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { GlobalStoreState } from '../../redux/store';
import { useAuthenticateMutation } from '../../redux/services/serverApi';
import { setToken, setUser, UserState } from '../../redux/features/userSlice';
import Loader from '../../components/Loader/Loader';
import logo from '../../assets/logo.png';
import './auth.css';

const schema = yup.object({
  phoneNo: yup
    .number()
    .integer('Invalid phone no.')
    .typeError('Invalid phone no.')
    .required('Required Field'),
  password: yup.string().required('Required Field')
});

const Signin = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = `/${searchParams.get('returnUrl') || ''}`;
  const { user: currentUser } = useSelector<GlobalStoreState, UserState>(
    (state) => state.user
  );
  const [serverError, setServerError] = useState<string | null>(null);

  // react-hook-form manages form states
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{ phoneNo: string; password: string }>({
    resolver: yupResolver(schema)
  });

  // sign up redux mutation to server
  const [submit, { isLoading }] = useAuthenticateMutation();

  const onSubmit = async (form: { phoneNo: string; password: string }) => {
    try {
      const { user, tokens } = await submit(form).unwrap();
      ls.set('refreshToken', tokens.refreshToken);
      dispatch(setToken(tokens.accessToken));
      dispatch(setUser(user));
      navigator(returnUrl);
    } catch (error) {
      if ((error as FetchBaseQueryError).status === 404) {
        setServerError('Invalid phone no. or password');
      } else {
        setServerError('Something went wrong! please try again later');
        console.log(error);
      }
    }
  };

  if (currentUser) return <Navigate to={returnUrl} />;
  return (
    <div className="auth bg__gradient">
      {isLoading && <Loader fullScreen />}
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={logo} alt="logo" />
          <p>Create account and start building your client profiles </p>
          {serverError && <p style={{ color: 'indianred' }}>{serverError}</p>}
        </div>
        <div className="auth__box_form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="auth__box_form-field">
              <label htmlFor="phoneNo">
                <span>Phone No:</span>
              </label>
              <input type="number" {...register('phoneNo')} />
              <span>{errors.phoneNo?.message}</span>
            </div>
            <div className="auth__box_form-field">
              <label htmlFor="password">
                <span>Password:</span>
              </label>
              <input type="password" {...register('password')} />
              <span>{errors.password?.message}</span>
            </div>
            <div className="auth__box_form-field">
              <button
                className="hover-shadow"
                type="submit"
                disabled={isLoading}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
