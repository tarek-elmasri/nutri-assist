import { Builder } from '.';

export interface IServePlan {
  id: string;
  starch: number;
  vegetable: number;
  fruit: number;
  leanMeat: number;
  mediumMeat: number;
  highMeat: number;
  lowFatMilk: number;
  mediumFatMilk: number;
  highFatMilk: number;
  legume: number;
  sugar: number;
  pufa: number;
  mufa: number;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
}

export const createServePlanMutation = (builder: Builder) =>
  builder.mutation<
    IServePlan,
    { clientId: string; profileId: string; serves: Partial<IServePlan> }
  >({
    query: ({ serves, clientId, profileId }) => ({
      url: `/clients/${clientId}/profiles/${profileId}/serves`,
      method: 'POST',
      body: { serves }
    })
  });
