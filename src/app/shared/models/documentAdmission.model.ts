import { Classifier } from "./classifier.model";

export class DocumentAdmission {

    public id: Number;
    public type: Classifier;
    public number: String;
    public dueDate: Date;
    public emissionDate: Date;
    public extraData: String;
    public hasDocumment: boolean;
    public file: String;

    constructor() { }

    static fromJson(jsonData: any): DocumentAdmission {
        return Object.assign(new DocumentAdmission(), jsonData);
    }
}