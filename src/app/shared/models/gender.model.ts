export class Gender {

    public id: Number;
    public value: String;
    public type: String;

    constructor() { }

    static fromJson(jsonData: any): Gender {
        return Object.assign(new Gender(), jsonData);
    }
}