import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@source/db/connect';

interface UserAttributes {
  id?: string;
  username: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  id!: string;
  username!: string;
  password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export { User };
