export class Customer {
    constructor(
        public id?: number,
        public name?: string,
        public cnpj?: string,
        public label?: string,
        public holding?: string,
        public inserted?: boolean,
        public master?: boolean,
        public type?: string,
        ) {
    }
}