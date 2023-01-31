export class VacancyList {
    public current_page: Number;
    public data: VacancyData[];
    public first_page_url: String;
    public from: Number;
    public next_page_url: String;
    public path: String;
    public per_page: Number;
    public prev_page_url: String;
    public to: Number;
}

export class VacancyData {
    public vacancy_id: number;
    public workplace: string;
    public title: string;
    public priority: string;
    public creation_date: string;
    public total_vacancies: number;
    public tags: Tags;
}
export class Tags {
    public tag1: string;
}
