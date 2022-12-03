import { Builder } from '.';

const authMutation = (builder: Builder) =>
  builder.mutation({
    query: (credentials: { phoneNo: string; password: string }) => ({
      url: '/auth',
      method: 'POST',
      body: {
        phoneNo: `${credentials.phoneNo}`,
        password: credentials.password
      }
    })
  });

const fetchUserQuery = (builder: Builder) =>
  builder.query({
    query: () => '/auth'
  });

const getAccessTokenQuery = (builder: Builder) =>
  builder.mutation({
    query: (refreshToken) => ({
      url: '/auth',
      method: 'PATCH',
      body: { refreshToken }
    })
  });

export { authMutation, fetchUserQuery, getAccessTokenQuery };
