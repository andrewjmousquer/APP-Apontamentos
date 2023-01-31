import { Classifier } from "./classifier.model";

export class Portion {

    public id: number;
    public name: number;
    public tax: number;
    public calc: number;
    public paymentType: Classifier;

    constructor() { }

    static fromJson(jsonData: any): Portion {
        return Object.assign(new Portion(), jsonData);
    }
}