import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GlobalStoreState } from '../../store';
import {
  authMutation,
  fetchUserQuery,
  getAccessTokenQuery
} from './endpoints/auth';
import { createClientMutation, getClientsQuery } from './endpoints/clients';
import { createUserMutation } from './endpoints/users';

const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_BASE_URL,
    prepareHeaders: (headers, api) => {
      const accessToken = (api.getState() as GlobalStoreState).user.token;

      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // sessions routes
    authenticate: authMutation(builder),
    getAccessToken: getAccessTokenQuery(builder),
    // users routes
    fetchUser: fetchUserQuery(builder),
    createUser: createUserMutation(builder),
    // clients routes
    getClients: getClientsQuery(builder),
    createClient: createClientMutation(builder)
  })
});

export const {
  useAuthenticateMutation,
  useFetchUserQuery,
  useGetAccessTokenMutation,
  useCreateUserMutation,
  useGetClientsQuery,
  useCreateClientMutation
} = serverApi;

export default serverApi;
