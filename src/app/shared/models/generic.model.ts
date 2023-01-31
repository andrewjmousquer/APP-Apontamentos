export class generic {

    public id: Number;
    public value: String;
    public type: String;

    constructor() { }

    static fromJson(jsonData: any): generic {
        return Object.assign(new generic(), jsonData);
    }
}