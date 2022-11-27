import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
  NonAttribute
} from 'sequelize';
import { sequelize } from '../database/database';
import Profile from './profile';

class Serve extends Model<
  InferAttributes<Serve>,
  InferCreationAttributes<Serve>
> {
  declare id: CreationOptional<string>;
  declare count: CreationOptional<number>;
  declare type: string;
  declare profileId: ForeignKey<Profile['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare profile?: NonAttribute<Profile>;
}

// relations
Serve.belongsTo(Profile, { targetKey: 'id' });

Serve.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    type: {
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
    tableName: 'profiles',
    sequelize
  }
);

export default Serve;
