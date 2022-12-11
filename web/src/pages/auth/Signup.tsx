import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import * as ls from 'local-storage';
import { Navigate, useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { GlobalStoreState } from '../../redux/store';
import { useCreateUserMutation } from '../../redux/services/serverApi';
import {
  setToken,
  setUser,
  User,
  UserState
} from '../../redux/features/userSlice';
import Loader from '../../components/Loader/Loader';
import logo from '../../assets/logo.png';
import './auth.css';
import { notifyError } from '../../utils/notifications';

const schema = yup.object({
  firstName: yup.string().required('Required Field'),
  lastName: yup.string().required('Required Field'),
  phoneNo: yup
    .number()
    .integer('Invalid phone no.')
    .typeError('Invalid phone no.')
    .required('Required Field'),
  email: yup.string().email('Invalid Email').required('Required Field'),
  password: yup.string().required('Required Field')
});

type CreateUserServerError = Partial<
  Record<keyof Omit<User, 'id'> | 'password', string[]>
>;

const Signup = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = `/${searchParams.get('returnUrl') || ''}`;
  const { user: currentUser } = useSelector<GlobalStoreState, UserState>(
    (state) => state.user
  );

  // react-hook-form manages form states
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Omit<User, 'id'> & { password: string }>({
    resolver: yupResolver(schema)
  });

  // sign up redux mutation to server
  const [submit, { isLoading }] = useCreateUserMutation();

  // handle submit
  const onSubmit = async (form: Omit<User, 'id'> & { password: string }) => {
    try {
      const { user, tokens } = await submit(form).unwrap();
      ls.set('refreshToken', tokens.refreshToken);
      dispatch(setToken(tokens.accessToken));
      dispatch(setUser(user));
      navigator(returnUrl);
    } catch (error) {
      if ((error as FetchBaseQueryError).status === 422) {
        const errorData = (error as FetchBaseQueryError)
          .data as CreateUserServerError;

        (Object.keys(errorData) as (keyof CreateUserServerError)[]).forEach(
          (key) => {
            if (errorData[key]) {
              setError(key, { message: errorData[key]![0] });
            }
          }
        );
      } else {
        notifyError('Ops something went wrong, please try again later');
      }
    }
  };

  if (currentUser) return <Navigate to={returnUrl} />;
  return (
    <div className="auth bg__gradient">
      {isLoading && (
        <Loader fullScreen text="Please wait while creating your profile" />
      )}
      <div className="auth__box">
        <div className="auth__box-logo">
          <img src={logo} alt="logo" />
          <p>Create account and start building your client profiles </p>
        </div>
        <div className="auth__box_form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="auth__box_form-field">
              <label htmlFor="firstName">
                <span>First Name:</span>
              </label>
              <input {...register('firstName')} />
              <span>{errors.firstName?.message}</span>
            </div>
            <div className="auth__box_form-field">
              <label htmlFor="lastName">
                <span>Last Name:</span>
              </label>
              <input {...register('lastName')} />
              <span>{errors.lastName?.message}</span>
            </div>
            <div className="auth__box_form-field">
              <label htmlFor="phoneNo">
                <span>Phone No:</span>
              </label>
              <input type="number" {...register('phoneNo')} />
              <span>{errors.phoneNo?.message}</span>
            </div>
            <div className="auth__box_form-field">
              <label htmlFor="email">
                <span>Email:</span>
              </label>
              <input {...register('email')} />
              <span>{errors.email?.message}</span>
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
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
