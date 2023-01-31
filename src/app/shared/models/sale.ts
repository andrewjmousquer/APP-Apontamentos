import { Portion } from "./portion";
import { User } from "./user.model";

export class Sale {
    public id: number;
    public customer: string;
    public contact: string;
    public comments: string;
    public date: Date;
    public value: number;
    public firstPayment: number;
    public tax: number;
    public portion: number;
    public paymentType: string;
    public user:User;
    public expanded: boolean;
    public label: string;
    public showAllSale: boolean;

    constructor() {}
    
    static fromJson(jsonData: any): Sale {
        return Object.assign(new Sale(), jsonData);
    }
}