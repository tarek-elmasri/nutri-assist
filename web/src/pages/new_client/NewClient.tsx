import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useNavigate } from 'react-router';
import { useCreateClientMutation } from '../../redux/services/serverApi';
import Loader from '../../components/Loader/Loader';
import './new_client.css';
import { Client } from '../../redux/services/serverApi/endpoints/clients';

const schema = yup.object({
  firstName: yup.string().required('Required Field'),
  lastName: yup.string().required('Required Field'),
  phoneNo: yup
    .number()
    .integer('Invalid phone no.')
    .typeError('Invalid phone no.')
    .required('Required Field'),
  password: yup.string().required('Required Field')
});

type CreateClientServerError = Partial<
  Record<
    | keyof Omit<
        Client,
        'id' | 'createdAt' | 'updatedAt' | 'profiles' | 'userId'
      >
    | 'password',
    string[]
  >
>;

const NewClient = () => {
  const navigator = useNavigate();
  const [isServerError, setIsServerError] = useState(false);

  // react-hook-form manages form states
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<
    Omit<Client, 'id' | 'profiles' | 'createdAt' | 'updatedAt' | 'userId'> & {
      password: string;
    }
  >({
    resolver: yupResolver(schema)
  });

  // createClient redux mutation to server
  const [submit, { data, isLoading, error: submitError }] =
    useCreateClientMutation();

  //handle server error responses
  useEffect(() => {
    if (submitError) {
      if ((submitError as FetchBaseQueryError).status === 422) {
        const errorData = (submitError as FetchBaseQueryError)
          .data as CreateClientServerError;

        (Object.keys(errorData) as (keyof CreateClientServerError)[]).forEach(
          (key) => {
            if (errorData[key]) {
              setError(key, { message: errorData[key]![0] });
            }
          }
        );
      } else {
        setIsServerError(true);
        console.log(submitError);
      }
    }
  }, [submitError, setError]);

  //  handle success sign up
  useEffect(() => {
    if (data) {
      const { id } = data as Client;
      navigator(`/dashboard/clients/${id}`);
    }
  }, [data, navigator]);

  return (
    <div className="new-client">
      {isLoading && (
        <Loader fullScreen text="Please wait while creating your profile" />
      )}
      <div className="new-client__box">
        <div className="new-client__box-logo">
          <p className="gradient__text">Add New Client</p>
          {isServerError && (
            <span style={{ color: 'indianred' }}>
              Something Went Wrong! please try again later.
            </span>
          )}
        </div>
        <div className="new-client__box_form">
          <form onSubmit={handleSubmit(submit)}>
            <div className="new-client__box_form-field">
              <label htmlFor="firstName">
                <span>First Name:</span>
              </label>
              <input {...register('firstName')} />
              <span>{errors.firstName?.message}</span>
            </div>
            <div className="new-client__box_form-field">
              <label htmlFor="lastName">
                <span>Last Name:</span>
              </label>
              <input {...register('lastName')} />
              <span>{errors.lastName?.message}</span>
            </div>
            <div className="new-client__box_form-field">
              <label htmlFor="phoneNo">
                <span>Phone No:</span>
              </label>
              <input type="number" {...register('phoneNo')} />
              <span>{errors.phoneNo?.message}</span>
            </div>
            <div className="new-client__box_form-field">
              <label htmlFor="password">
                <span>Password:</span>
              </label>
              <input type="password" {...register('password')} />
              <span>{errors.password?.message}</span>
            </div>
            <div className="new-client__box_form-field">
              <button
                className="hover-shadow"
                type="submit"
                disabled={isLoading}
              >
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewClient;
