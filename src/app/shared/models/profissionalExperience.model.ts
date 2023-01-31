export class ProfissionalExperience {

    public id: Number;
    public company: String;
    public startDate: Date;
    public finishDate: Date;
    public presentMoment: boolean;
    public lastPaymentAmount: Number;
    public description: String;

    constructor() { }

    static fromJson(jsonData: any): ProfissionalExperience {
        return Object.assign(new ProfissionalExperience(), jsonData);
    }
}