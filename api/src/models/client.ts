import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey
} from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../database/database';
import User from './user';

class Client extends Model<
  InferAttributes<Client>,
  InferCreationAttributes<Client>
> {
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string | null;
  declare phoneNo: string;
  declare password: string;
  declare userId: ForeignKey<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

// relations
Client.belongsTo(User);

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

export default Client;
