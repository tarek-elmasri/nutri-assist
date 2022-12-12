import { Migration } from '../database/database';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('serves', {
    id: {
      type: DataTypes.UUID,
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
    profileId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('serves');
};
