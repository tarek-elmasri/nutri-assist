import { Migration } from '../database/database';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('serve_meals', 'name', {
    type: DataTypes.STRING,
    allowNull: false
  });
};
export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn('serve_meals', 'name');
};
