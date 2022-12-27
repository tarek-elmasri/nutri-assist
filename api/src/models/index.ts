import User from './user';
import Client from './client';
import Profile from './profile';
import Serve from './serve';
import ServeMeal from './serveMeal';
import Meal from './meal';

User.hasMany(Client, { foreignKey: 'userId', sourceKey: 'id', as: 'clients' });

Client.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });
Client.hasMany(Profile, {
  sourceKey: 'id',
  foreignKey: 'clientId',
  as: 'profiles'
});

Profile.belongsTo(Client, {
  targetKey: 'id',
  foreignKey: 'clientId',
  as: 'client'
});
Profile.hasMany(Serve, {
  sourceKey: 'id',
  foreignKey: 'profileId',
  as: 'serves'
});

ServeMeal.belongsTo(Serve, {
  targetKey: 'id',
  foreignKey: 'serveId',
  as: 'serveMeal'
});

ServeMeal.belongsTo(Meal, {
  targetKey: 'id',
  foreignKey: 'mealId',
  as: 'meal'
});

Serve.belongsTo(Profile, { targetKey: 'id', foreignKey: 'profileId' });
Serve.hasMany(ServeMeal, {
  sourceKey: 'id',
  foreignKey: 'serveId',
  as: 'serveMeals'
});

export { User, Client, Profile, Serve, ServeMeal };
