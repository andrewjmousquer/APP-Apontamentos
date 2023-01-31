import { Classifier } from "./classifier.model";

export class BankAccount {

    public id: Number;
    public bank: String;
    public agency: String;
    public accountNumber: String;
    public mainAccount: boolean;
    public type: Classifier;

    constructor() { }

    static fromJson(jsonData: any): BankAccount {
        return Object.assign(new BankAccount(), jsonData);
    }
}
