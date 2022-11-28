import User from './user';
import Client from './client';
import Profile from './profile';
import Serve from './serve';

User.hasMany(Client, {
  sourceKey: 'id',
  foreignKey: 'clientId',
  as: 'clients'
});

Client.belongsTo(User, { targetKey: 'id' });
Client.hasMany(Profile, {
  sourceKey: 'id',
  foreignKey: 'clientId',
  as: 'profiles'
});

Profile.belongsTo(Client, { targetKey: 'id' });
Profile.hasMany(Serve, {
  sourceKey: 'id',
  foreignKey: 'profileId',
  as: 'serves'
});

Serve.belongsTo(Profile, { targetKey: 'id' });

export { User, Client, Profile, Serve };
