import { Builder } from '.';
import { ActivityLevel, Gender } from '../../../../modules/profile';

export type Client = {
  id: string;
  firstName: string;
  lastName: string | null;
  phoneNo: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  profiles: {
    id: string;
    weight: number;
    height: number;
    age: number;
    gender: Gender;
    activityLevel: ActivityLevel;
    createdAt: Date;
    updatedAt: Date;
    serves: {
      id: string;
      count: number;
      type: string;
      createdAt: Date;
      updatedAt: Date;
      profileId: string;
    }[];
  }[];
};
const getClientsQuery = (builder: Builder) =>
  builder.query<Client[], null>({
    query: () => '/clients'
  });

const createClientMutation = (builder: Builder) =>
  builder.mutation({
    query: (
      clientForm: Omit<
        Client,
        'id' | 'profiles' | 'createdAt' | 'updatedAt' | 'userId'
      > & { password: string }
    ) => ({
      url: '/clients',
      method: 'POST',
      body: { client: clientForm }
    })
  });

export { getClientsQuery, createClientMutation };
