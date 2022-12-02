import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GlobalStoreState } from '../../store';
import {
  authMutation,
  fetchUserQuery,
  getAccessTokenQuery
} from './endpoints/auth';

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
    authenticate: authMutation(builder),
    fetchUser: fetchUserQuery(builder),
    getAccessToken: getAccessTokenQuery(builder)
  })
});

export const {
  useAuthenticateMutation,
  useFetchUserQuery,
  useGetAccessTokenMutation
} = serverApi;

export default serverApi;
