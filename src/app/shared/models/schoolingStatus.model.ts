export class schoolingStatus {

    public id: Number;
    public value: String;
    public type: String;

    constructor() { }

    static fromJson(jsonData: any): schoolingStatus {
        return Object.assign(new schoolingStatus(), jsonData);
    }
}