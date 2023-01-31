import { Classifier } from "./classifier.model";

export class Schooling {

    public id: Number;
    public course: String;
    public institution: String;
    public status: Classifier;
    public type: Classifier;

    constructor() { }

    static fromJson(jsonData: any): Schooling {
        return Object.assign(new Schooling(), jsonData);
    }
}