export class Occupation {

    public id: Number;
    public name: String;
    public description: String;
    public code: Number;
    public activities: String;

    constructor() { }

    static fromJson(jsonData: any): Occupation {
        return Object.assign(new Occupation(), jsonData);
    }
}