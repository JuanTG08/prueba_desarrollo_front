export interface IResponse {
    error: boolean;
    statusCode: number;
    message: string;
    payload: boolean | any | any[];
}