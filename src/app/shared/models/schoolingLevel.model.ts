export class schoolingLevel {

    public id: Number;
    public value: String;
    public type: String;

    constructor() { }

    static fromJson(jsonData: any): schoolingLevel {
        return Object.assign(new schoolingLevel(), jsonData);
    }
}