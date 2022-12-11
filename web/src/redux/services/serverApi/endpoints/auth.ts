import { Builder } from '.';
import { User } from '../../../features/userSlice';

const authMutation = (builder: Builder) =>
  builder.mutation<
    { user: User; tokens: { accessToken: string; refreshToken: string } },
    { phoneNo: string; password: string }
  >({
    query: ({ phoneNo, password }) => ({
      url: '/auth',
      method: 'POST',
      body: {
        phoneNo: `${phoneNo}`,
        password
      }
    })
  });

const fetchUserQuery = (builder: Builder) =>
  builder.query<User, null>({
    query: () => '/auth'
  });

const getAccessTokenQuery = (builder: Builder) =>
  builder.mutation<{ accessToken: string }, { refreshToken: string }>({
    query: ({ refreshToken }) => ({
      url: '/auth',
      method: 'PATCH',
      body: { refreshToken }
    })
  });

export { authMutation, fetchUserQuery, getAccessTokenQuery };
