import { sequelize } from '../database/database';
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model
} from 'sequelize';

// interface
class Meal extends Model<InferAttributes<Meal>, InferCreationAttributes<Meal>> {
  declare id: CreationOptional<string>;
  declare category: string;
  declare subCategory: CreationOptional<string>;
  declare ar: string;
  declare en: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Meal.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ar: {
      type: DataTypes.STRING,
      allowNull: false
    },
    en: {
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
    tableName: 'meals',
    sequelize
  }
);

export default Meal;
