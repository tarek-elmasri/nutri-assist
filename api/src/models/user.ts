import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
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
  Association,
  NonAttribute,
  FindOptions
} from 'sequelize';
import bcrypt from 'bcrypt';
import { sequelize } from '../database/database';
import Client from './client';
import Profile from './profile';
import Serve from './serve';

// interface
class User extends Model<
  InferAttributes<User, { omit: 'clients' }>,
  InferCreationAttributes<User, { omit: 'clients' }>
> {
  declare id: CreationOptional<string>;
  declare firstName: string;
  declare lastName: string | null;
  declare phoneNo: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getClients: HasManyGetAssociationsMixin<Client>; // Note the null assertions!
  declare addClient: HasManyAddAssociationMixin<Client, string>;
  declare addClients: HasManyAddAssociationsMixin<Client, string>;
  declare setClients: HasManySetAssociationsMixin<Client, string>;
  declare removeClient: HasManyRemoveAssociationMixin<Client, string>;
  declare removeClients: HasManyRemoveAssociationsMixin<Client, string>;
  declare hasClient: HasManyHasAssociationMixin<Client, string>;
  declare hasClients: HasManyHasAssociationsMixin<Client, string>;
  declare countClients: HasManyCountAssociationsMixin;
  declare createClient: HasManyCreateAssociationMixin<Client, 'userId'>;

  declare clients?: NonAttribute<Client[]>;

  declare static associations: {
    clients: Association<User, Client>;
  };

  getAllProfiles = async () => {
    const mappedClients = (await this.getClients()).map((client) => client.id);
    return Profile.findAll({
      where: {
        clientId: mappedClients
      },
      include: [
        {
          model: Serve,
          as: 'serves'
        },
        { model: Client, as: 'client' }
      ]
    });
  };
}

//schema
User.init(
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
      allowNull: true,
      defaultValue: 'hello'
    },
    phoneNo: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
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
    tableName: 'users',
    sequelize
  }
);

// hashing password before create
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(
    user.password + process.env.PEPPER,
    parseInt(process.env.SALT_ROUNDS!)
  );
  user.password = hashedPassword;
});

//relations

export default User;
