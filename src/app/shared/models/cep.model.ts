export class Cep {

    public cep: string;
    public state: string;
    public city: string;
    public neighborhood: string;
    public street: string;

    constructor(
        cep: string,
        state: string,
        city: string,
        neighborhood: string,
        street: string
    ) {
        this.cep = cep;
        this.state = state;
        this.city = city;
        this.neighborhood = neighborhood;
        this.street = street;
    }
}