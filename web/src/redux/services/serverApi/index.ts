import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GlobalStoreState } from '../../store';
import {
  authMutation,
  fetchUserQuery,
  getAccessTokenQuery
} from './endpoints/auth';
import { createClientMutation, getClientsQuery } from './endpoints/clients';
import { createProfileMutation, getProfileQuery } from './endpoints/profiles';
import { createServePlanMutation } from './endpoints/serves';
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
    createClient: createClientMutation(builder),

    // create profile
    createProfile: createProfileMutation(builder),
    getProfile: getProfileQuery(builder),

    // serves routes
    createServePlan: createServePlanMutation(builder)
  })
});

export const {
  useAuthenticateMutation,
  useFetchUserQuery,
  useGetAccessTokenMutation,
  useCreateUserMutation,
  useGetClientsQuery,
  useCreateClientMutation,
  useCreateProfileMutation,
  useGetProfileQuery,
  useCreateServePlanMutation
} = serverApi;

export default serverApi;
