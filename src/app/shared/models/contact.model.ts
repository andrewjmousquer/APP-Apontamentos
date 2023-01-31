import { Classifier } from "./classifier.model";

export class Contact {

    public id: Number;
    public street: String;
    public complement: String;
    public value: String;
    public type: Classifier;

    constructor() { }

    static fromJson(jsonData: any): Contact {
        return Object.assign(new Contact(), jsonData);
    }
}