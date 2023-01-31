
import { Address } from "./address.model";
import { BankAccount } from "./bankAccount.model";
import { Classifier } from "./classifier.model";
import { Contact } from "./contact.model";
import { DocumentAdmission } from "./documentAdmission.model";
import { EmergencyContact } from "./emergencyContact.model";
import { Schooling } from "./schooling.model";

export class Admission {
    public id: number;


    public contractFile: String;

    public signFile: String;

    public startDate: Date;

    public vacancyId: number;

    public finish: boolean;

    public stage: String;

    public email: String;

    public name: String;

    public cpf: String;

    public bithDay: Date;

    public deficiency: Classifier;

    public gender: Classifier;

    public address: Address;

    public socialName: String;

    public raceColor: Classifier;

    public fatherName: String;

    public motherName: String;

    public maritalStatus: Classifier;

    public placeOfBirthCuntry: String;

    public placeOfBirthCityState: String;

    public contacts: Contact[];

    public bankAccount: BankAccount[];

    public schoolingList: Schooling[];

    public documentList: DocumentAdmission[];

    public emergencyContactList: EmergencyContact[];

    constructor() { }

    static fromJson(jsonData: any): Admission {
        return Object.assign(new Admission(), jsonData);
    }
}

