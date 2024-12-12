import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ServiceError } from '@shared/models';
import { UniqueConstraintError } from 'sequelize';
import { SECRETS } from '@source/secrets';
import { ErrorType } from '@shared/enums';
import { User } from '@db/models';

export class AuthService {
  public static async loginUser(
    username: string,
    password: string
  ): Promise<string> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new ServiceError(
        'Wrong credentials',
        ErrorType.INVALID_CREDENTIALS
      );
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new ServiceError('Unauthorized', ErrorType.UNAUTHORIZED);
    }

    const accessToken = jwt.sign(
      { username: user.username },
      SECRETS.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return accessToken;
  }

  public static async registerUser(
    username: string,
    password: string
  ): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await User.create({ username, password: hashedPassword });
    } catch (error: any) {
      if (error instanceof UniqueConstraintError) {
        throw new ServiceError(
          'Username already exists.',
          ErrorType.INVALID_CREDENTIALS
        );
      } else {
        throw new ServiceError(
          'Error registering user',
          ErrorType.REGISTRATION_ERROR
        );
      }
    }
  }
}
