import { IUsers } from '../../interfaces/users.interface';
import { userService } from '../user/user.service';
import { tokenService } from '../token/token.service';
import { IRole } from '../../interfaces/role.inreface';
import { IRoleToken } from '../../interfaces/role.interface';
import { roleService } from '../role/role.service';

class AuthService {
    public async registration(user:IUsers):Promise<IRoleToken> {
        const createdUser = await userService.addOne(user);
        const role = await roleService.addRole(createdUser);
        return this._getToken(role);
    }

    private async _getToken(userRole:IRole):Promise<IRoleToken> {
        const { role, userId } = userRole;
        const tokensPair = await tokenService.generateTokenPair({ userId, role });
        const { refreshToken } = tokensPair;
        await tokenService.saveToken({ userId, refreshToken });

        return {
            ...tokensPair,
            userId,
            role,
        };
    }
}

export const authService = new AuthService();
