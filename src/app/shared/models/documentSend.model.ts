export class Document {
    constructor(
        public id?: number,
        public startDate?: Date,
        public person?: number,
        public type?: number,
        public number?: string,
        public dueDate?: Date,
        public emissionDate?: Date,
        public extraData?: string,
        public hasDocumment?: boolean,
        public file?: string,
    ) {
    }
}
