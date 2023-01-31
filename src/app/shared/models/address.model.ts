import { City } from "./city.model";
import { Country } from "./country.model";
import { State } from "./state.model";

export class Address {

    public id: Number;
    public street: String;
    public number: String;
    public district: String;
    public complement: String;
    public zipCode: String;
    public latitude: String;
    public longitude: String;
    public city: City;
    constructor() { }

    static fromJson(jsonData: any): Address {
        return Object.assign(new Address(), jsonData);
    }
}