export class Country {

    public id: Number;
    public name: String;
    public abbreviation: String;

    constructor() { }

    static fromJson(jsonData: any): Country {
        return Object.assign(new Country(), jsonData);
    }
}