import { Builder } from '.';
import { User } from '../../../features/userSlice';

const createUserMutation = (builder: Builder) =>
  builder.mutation({
    query: (form: Omit<User, 'id'>) => ({
      url: '/users',
      method: 'POST',
      body: { user: form }
    })
  });

export { createUserMutation };
