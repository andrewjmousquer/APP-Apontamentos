export class Deficiency {

    public id: Number;
    public value: String;
    public type: String;

    constructor() { }

    static fromJson(jsonData: any): Deficiency {
        return Object.assign(new Deficiency(), jsonData);
    }
}