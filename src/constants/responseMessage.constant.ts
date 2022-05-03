import {ResponseEnum} from "../enums";

export const responseMessageConstant = {
    [ResponseEnum.UPDATED]: {
        message: 'Successfully patched'
    },
    [ResponseEnum.DELETED]: {
        message: 'Successfully deleted'
    },
    [ResponseEnum.LOGOUT]: {
        message: 'Successfully logout'
    },
    [ResponseEnum.PASSWORDCHANGED]: {
        message: 'password changed'
    },

    [ResponseEnum.CREATED]: (firstName: string, lastName:string) => {
        return { message: `${firstName} ${lastName} successfully created` }
    }
}
