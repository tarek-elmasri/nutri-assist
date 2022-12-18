import User from './user';
import Client from './client';
import Profile from './profile';
import Serve from './serve';

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

Serve.belongsTo(Profile, { targetKey: 'id', foreignKey: 'profileId' });

export { User, Client, Profile, Serve };
