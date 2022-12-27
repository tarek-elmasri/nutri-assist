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
import Profile from './profile';
import ServeMeal from './serveMeal';

class Serve extends Model<
  InferAttributes<Serve, { omit: 'serveMeals' }>,
  InferCreationAttributes<Serve, { omit: 'serveMeals' }>
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

  declare getServeMeals: HasManyGetAssociationsMixin<ServeMeal>; // Note the null assertions!
  declare addServeMeal: HasManyAddAssociationMixin<ServeMeal, string>;
  declare addServeMeals: HasManyAddAssociationsMixin<ServeMeal, string>;
  declare setServeMeal: HasManySetAssociationsMixin<ServeMeal, string>;
  declare removeServeMeal: HasManyRemoveAssociationMixin<ServeMeal, string>;
  declare removeServeMeals: HasManyRemoveAssociationsMixin<ServeMeal, string>;
  declare hasServeMeal: HasManyHasAssociationMixin<ServeMeal, string>;
  declare hasServeMeals: HasManyHasAssociationsMixin<ServeMeal, string>;
  declare countServeMeal: HasManyCountAssociationsMixin;
  declare createServeMeal: HasManyCreateAssociationMixin<ServeMeal, 'serveId'>;

  declare serveMeals?: NonAttribute<ServeMeal[]>;

  declare static associations: {
    serveMeals: Association<Serve, ServeMeal>;
  };
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
