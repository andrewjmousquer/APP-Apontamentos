import { State } from "./state.model";

export class City {

    public id: Number;
    public name: String;
    public codIbge: Number;
    public state: State;

    constructor() { }

    static fromJson(jsonData: any): City {
        return Object.assign(new City(), jsonData);
    }
}