import { sequelize } from '../database/database';
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute
} from 'sequelize';
import Serve from './serve';
import Meal from './meal';

// interface
class ServeMeal extends Model<
  InferAttributes<ServeMeal>,
  InferCreationAttributes<ServeMeal>
> {
  declare id: CreationOptional<string>;
  declare serveId: ForeignKey<Serve['id']>;
  declare mealId: ForeignKey<Meal['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare serve?: NonAttribute<Serve>;
  declare meal?: NonAttribute<Meal>;
}

ServeMeal.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
    tableName: 'serve_meals',
    sequelize
  }
);

export default ServeMeal;
