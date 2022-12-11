import { Builder } from '.';
import { User } from '../../../features/userSlice';

const createUserMutation = (builder: Builder) =>
  builder.mutation<
    { user: User; tokens: { accessToken: string; refreshToken: string } },
    Omit<User, 'id'> & { password: string }
  >({
    query: (user) => ({
      url: '/users',
      method: 'POST',
      body: { user }
    })
  });

export { createUserMutation };
