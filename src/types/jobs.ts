// src/types/job.ts

export interface JobAd {
  id: string;
  headline: string;
  application_deadline?: string;
  publication_date: string;
  number_of_vacancies?: number;
  description?: JobAdDescription;
  employer?: Employer;
  salary_description: string
  salary_type: Salary
  workplace_address?: WorkplaceAddress;
  application_details?: ApplicationDetails;
  scope_of_work?: ScopeOfWork;
  logo_url:	string;
  working_hours_type?: Concept;
  duration?: Concept;
  occupation?: Occupation;
  weighted_jobtech_taxonomy_items?: WeightedJobtechTaxonomyItem[];
  freetext_concepts?: FreetextConcept[];
}

export interface JobAdDescription {
  text?: string;
  company_information?: string;
  needs?: string;
  requirements?: string;
}

export interface Employer {
  name?: string;
  workplace?: string;
  url?: string;
}

export interface Salary {
  label: string
}

export interface WorkplaceAddress {
  municipality?: string;
  region?: string;
  country?: string;
  street?: string;
  postcode?: string;
}

export interface ApplicationDetails {
  url?: string;
  email?: string;
  other?: string;
}

export interface ScopeOfWork {
  min?: number;
  max?: number;
}

export interface Concept {
  concept_id?: string;
  label?: string;
}

export interface Occupation {
  label?: string;
}

export interface WeightedJobtechTaxonomyItem {
  id?: string;
  label?: string;
  weight?: number;
  type?: string;
}

export interface FreetextConcept {
  id?: string;
  label?: string;
}
