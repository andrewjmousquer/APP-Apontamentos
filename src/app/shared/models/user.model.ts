import { AccessList } from "./access-list.model";
import { Customer } from "./customer.model";
import { Person } from "./person.model";

export class User {
    token: string;
    constructor(public id?: number,
        public name?: string,
        public username?: string,
        public confirmUsername?: string,
        public password?: string,
        public confirmPassword?: string,
        public acceptTerm?: boolean,
        public person?: Person,
        public forgotKey?: String,
        public customer?: Customer,
        public customers?: Customer[],
        public accessList?: AccessList,
        public cpf?: string,
    ) {
    }

    static fromJson(jsonData: any): User {
        return Object.assign(new User(), jsonData);
    }
}
