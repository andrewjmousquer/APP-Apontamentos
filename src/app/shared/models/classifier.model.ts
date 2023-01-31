
export class Classifier {
    constructor(public id?: number,
                public value?: string,
                public type?: string,
                public label?: string
                ) {
    }

    static fromJson(jsonData: any): Classifier {
        return Object.assign(new Classifier(), jsonData);
    }
}
