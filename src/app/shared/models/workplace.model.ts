import { City } from "./city.model";
import { Country } from "./country.model";
import { State } from "./state.model";

export class Workplace {

    public address_id: Number;
    public street: String;
    public number: String;
    public district: String;
    public complement: String;
    public zip_code: String;
    public latitude: String;
    public longitude: String;
    public city: String;
    public state: String;
    public country: String;
    public references: String;
    public street_type: String;
    public geocoord_precision: Number;

    constructor() { }

    static fromJson(jsonData: any): Workplace {
        return Object.assign(new Workplace(), jsonData);
    }
}