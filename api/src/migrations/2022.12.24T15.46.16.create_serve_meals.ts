import { Migration } from '../database/database';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('serve_meals', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    serveId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'serves',
        key: 'id'
      }
    },
    mealId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'meals',
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
  await sequelize.getQueryInterface().dropTable('serve_meals');
};
