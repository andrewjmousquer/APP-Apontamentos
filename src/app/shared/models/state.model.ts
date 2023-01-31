import { Country } from "./country.model";

export class State {

    public id: Number;
    public name: String;
    public abbreviation: String;
    public country: Country;

    constructor() { }

    static fromJson(jsonData: any): State {
        return Object.assign(new State(), jsonData);
    }
}