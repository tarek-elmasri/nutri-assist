import { Builder } from '.';
import { ActivityLevel, Gender } from '../../../../modules/profile';
import { IServePlan } from './serves';

export interface IProfile {
  id: string;
  clientId: string;
  weight: number;
  height: number;
  age: number;
  gender: Gender;
  activityLevel: ActivityLevel;
  createdAt: Date;
  updatedAt: Date;
  serves: IServePlan[];
}

export const createProfileMutation = (builder: Builder) =>
  builder.mutation<IProfile, { profile: Partial<IProfile>; clientId: string }>({
    query: ({ profile, clientId }) => ({
      url: `clients/${clientId}/profiles`,
      method: 'POST',
      body: { profile }
    })
  });
