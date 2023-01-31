export class Person {
    constructor(public id?: number,
        public name?: string,
        public photo?: string,
        public cpf?: string,
        public jobTitle?: string,
        public contacts?: string) {
    }

    static fromJson(jsonData: any): Person {
        return Object.assign(new Person(), jsonData);
    }
}
