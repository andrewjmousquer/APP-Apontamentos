import { Classifier } from "./classifier.model";

export class EmergencyContact {

    public id: Number;
    public name: String;
    public kinship: String;
    public phoneNumber: String;

    constructor() { }

    static fromJson(jsonData: any): EmergencyContact {
        return Object.assign(new EmergencyContact(), jsonData);
    }
}

