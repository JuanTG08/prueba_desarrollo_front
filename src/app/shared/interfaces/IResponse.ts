export interface IResponse {
    error: boolean;
    statusCode: number;
    message: string;
    others: boolean | any | any[];
}