export class LocalFile {

    public name: String;
    public path: String;
    public data: String;

    constructor() { }

    static fromJson(jsonData: any): LocalFile {
        return Object.assign(new LocalFile(), jsonData);
    }
}