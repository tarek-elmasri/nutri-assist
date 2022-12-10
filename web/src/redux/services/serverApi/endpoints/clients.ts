import { Builder } from '.';
import { IProfile } from './profiles';

export type Client = {
  id: string;
  firstName: string;
  lastName: string | null;
  phoneNo: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  profiles: IProfile[];
};
const getClientsQuery = (builder: Builder) =>
  builder.query<Client[], null>({
    query: () => '/clients'
  });

const createClientMutation = (builder: Builder) =>
  builder.mutation<
    Client,
    Omit<Client, 'id' | 'profiles' | 'createdAt' | 'updatedAt' | 'userId'> & {
      password: string;
    }
  >({
    query: (clientForm) => ({
      url: '/clients',
      method: 'POST',
      body: { client: clientForm }
    })
  });

export { getClientsQuery, createClientMutation };
