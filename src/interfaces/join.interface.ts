import { ICommonFields } from './commonFields.interface';

export interface IJoin extends ICommonFields{
    roomId: string,
    userId: string,
    accessToken: string
}
