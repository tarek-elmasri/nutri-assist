import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Association
} from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../database/database';
import User from './user';
import Profile from './profile';

class Client extends Model<
  InferAttributes<Client, { omit: 'profiles' }>,
  InferCreationAttributes<Client, { omit: 'profiles' }>
> {
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string | null;
  declare phoneNo: string;
  declare password: string;
  declare userId: ForeignKey<User['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getProfiles: HasManyGetAssociationsMixin<Profile>; // Note the null assertions!
  declare addProfile: HasManyAddAssociationMixin<Profile, string>;
  declare addProfiles: HasManyAddAssociationsMixin<Profile, string>;
  declare setProfile: HasManySetAssociationsMixin<Profile, string>;
  declare removeProfile: HasManyRemoveAssociationMixin<Profile, string>;
  declare removeProfiles: HasManyRemoveAssociationsMixin<Profile, string>;
  declare hasProfile: HasManyHasAssociationMixin<Profile, string>;
  declare hasProfiles: HasManyHasAssociationsMixin<Profile, string>;
  declare countProfiles: HasManyCountAssociationsMixin;
  declare createProfile: HasManyCreateAssociationMixin<Profile, 'clientId'>;

  declare user?: NonAttribute<User>;
  declare profiles?: NonAttribute<Profile[]>;

  declare static associations: {
    profiles: Association<Client, Profile>;
  };
}

Client.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    phoneNo: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'clients',
    sequelize
  }
);

// hashing password before create
Client.beforeCreate(async (client) => {
  const hashedPassword = await bcrypt.hash(
    client.password + process.env.PEPPER,
    parseInt(process.env.SALT_ROUNDS!)
  );
  client.password = hashedPassword;
});

// relations

export default Client;
