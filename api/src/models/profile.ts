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
import { sequelize } from '../database/database';
import Client from './client';
import Serve from './serve';

class Profile extends Model<
  InferAttributes<Profile, { omit: 'serves' }>,
  InferCreationAttributes<Profile, { omit: 'serves' }>
> {
  declare id: CreationOptional<string>;
  declare weight: number;
  declare height: number;
  declare age: number;
  declare gender: 'male' | 'female';
  declare activityLevel: 'low' | 'average' | 'height';
  declare clientId: ForeignKey<Client['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getServes: HasManyGetAssociationsMixin<Serve>; // Note the null assertions!
  declare addServe: HasManyAddAssociationMixin<Serve, string>;
  declare addServes: HasManyAddAssociationsMixin<Serve, string>;
  declare setServe: HasManySetAssociationsMixin<Serve, string>;
  declare removeServe: HasManyRemoveAssociationMixin<Serve, string>;
  declare removeServes: HasManyRemoveAssociationsMixin<Serve, string>;
  declare hasServe: HasManyHasAssociationMixin<Serve, string>;
  declare hasServes: HasManyHasAssociationsMixin<Serve, string>;
  declare countServes: HasManyCountAssociationsMixin;
  declare createServe: HasManyCreateAssociationMixin<Serve, 'profileId'>;

  declare serves?: NonAttribute<Serve[]>;
  declare client?: NonAttribute<Client>;

  declare static associations: {
    serves: Association<Profile, Serve>;
  };
}

Profile.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'),
      allowNull: false
    },
    activityLevel: {
      type: DataTypes.ENUM('low', 'average', 'high'),
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
    tableName: 'profiles',
    sequelize
  }
);

// relations

export default Profile;
