import {
    IAuthServiceAbstraction, IRole, IRoleToken, IUser,
} from '../../interfaces';
import { userService } from '../user/user.service';
import { tokenService } from '../token/token.service';
import { roleService } from '../role/role.service';

class AuthService implements IAuthServiceAbstraction {
    public async registration(user:IUser):Promise<IRoleToken> {
        const createdUser = await userService.addOne(user);
        const role = await roleService.addRole(createdUser);

        return this._getToken(role);
    }

    public async newTokens(user:IUser): Promise<IRoleToken> {
        const role = await roleService.getRole(user);
        return this._getToken(role as IRole);
    }

    private async _getToken(userRole:IRole):Promise<IRoleToken> {
        const { role, userId } = userRole;
        const tokensPair = await tokenService.generateTokenPair({ userId, role });
        const { accessToken, refreshToken } = tokensPair;
        await tokenService.saveToken({ userId, accessToken, refreshToken });

        return {
            ...tokensPair,
            userId,
            role,
        };
    }
}

export const authService = new AuthService();
