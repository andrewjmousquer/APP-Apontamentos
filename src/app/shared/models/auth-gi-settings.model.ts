import { User } from "./user.model";

export class AuthGISettings {
    constructor(
        public token?: string,
        public refreshToken?: string,
        public tokenExpirationDate?: number
    ) { }

    static fromJson(jsonData: any): AuthGISettings {
        return Object.assign(new AuthGISettings(), jsonData);
    }
}
