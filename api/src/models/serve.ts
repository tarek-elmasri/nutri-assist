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
  declare starch: CreationOptional<number>;
  declare vegetable: CreationOptional<number>;
  declare fruit: CreationOptional<number>;
  declare leanMeat: CreationOptional<number>;
  declare mediumMeat: CreationOptional<number>;
  declare highMeat: CreationOptional<number>;
  declare lowFatMilk: CreationOptional<number>;
  declare mediumFatMilk: CreationOptional<number>;
  declare highFatMilk: CreationOptional<number>;
  declare legume: CreationOptional<number>;
  declare sugar: CreationOptional<number>;
  declare pufa: CreationOptional<number>;
  declare mufa: CreationOptional<number>;
  declare profileId: ForeignKey<Profile['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare profile?: NonAttribute<Profile>;
}

Serve.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    starch: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    vegetable: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    fruit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    leanMeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    mediumMeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    highMeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    lowFatMilk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    mediumFatMilk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    highFatMilk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    legume: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    sugar: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    pufa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    mufa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
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
    tableName: 'serves',
    sequelize
  }
);

// relations

export default Serve;
