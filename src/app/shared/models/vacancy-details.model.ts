
import { Workplace } from "./workplace.model";

export class VacancyDetails {
    public hr_request_id: Number;
    public request_type: String;
    public title: String;
    public corporation: String;
    public corporation_code: Number;
    public unit: String;
    public unit_code: Number;
    public creation_date: String;
    public is_confidential: Boolean;
    public hr_request_type: String;
    public internal_code: Number;
    public justification: String;
    public priority: String;
    public validate_inscription: Boolean;
    public occupation: String;
    public occupation_code: String;
    public total_vacancies: Number;
    public contract_type: String[];
    public start_period: String;
    public contract_period: String;
    public time_contract: number;
    public finish_period: String;
    public salary: String;
    public salary_max: Number;
    public salary_type: String;
    public additional_salary: Number;
    public benefits: String;
    public work_schedule: String;
    public workload_type: String;
    public workload: String;
    public activities: String;
    public comments: String;
    public workplace: Workplace;
    public customer: String;
    public requester: String;
    public responsible: String;
    public tags: Tags
    public custom: Custom;
}

export class Tags {
    public tag1: String;
}

export class Custom {
    public organizational_structor_short_code: String;
}
