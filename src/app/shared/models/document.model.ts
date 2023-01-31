export class Document {
    constructor(public id?: number,
                public name?: string,
                public description?: string,
                public contentType?: string,
                public uploadDate?: Date,
                public person?: string) {
    }

    static fromJson(jsonData: any): Document {
        return Object.assign(new Document(), jsonData);
    }
}
