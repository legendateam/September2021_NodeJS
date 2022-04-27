import bcrypt from 'bcrypt';

import { config } from '../configs';
import { IHashPassword } from '../interfaces';

class PasswordService {
    public async hash({ password = config.DEFAULT_PASSWORD }: Partial<IHashPassword>): Promise<string> {
        const salt = config.USER_SALT_ROUNDS as string;

        return bcrypt.hash(password, +salt);
    }

    public async compare({ password, hashPassword }: IHashPassword): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }
}

export const passwordService = new PasswordService();
