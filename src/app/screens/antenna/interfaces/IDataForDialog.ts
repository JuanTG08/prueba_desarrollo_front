import { IAntenna } from '../../../shared/interfaces/IAntenna';
export interface IDataForDialog {
    functionality: string;
    access_point: IAntenna[];
    data: any | null;
}