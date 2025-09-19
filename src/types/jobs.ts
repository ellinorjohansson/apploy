// types/jobs.ts
// TypeScript type definitions for job advertisement data structures
// These interfaces match the JobTech API response format

/**
 * Main job advertisement interface
 * Represents a single job posting from the JobTech API
 */
export interface JobAd {
  id: string;
  headline: string;
  application_deadline?: string;
  publication_date: string;
  number_of_vacancies?: number;
  description?: JobAdDescription;
  employer?: Employer;
  salary_description: string;
  salary_type: Salary;
  workplace_address?: WorkplaceAddress;
  application_details?: ApplicationDetails;
  scope_of_work?: ScopeOfWork;
  logo_url: string;
  working_hours_type?: Concept;
  duration?: Concept;
  occupation?: Occupation;
  weighted_jobtech_taxonomy_items?: WeightedJobtechTaxonomyItem[];
  freetext_concepts?: FreetextConcept[];
  applied?: boolean;
}

/**
 * Job description details
 * Contains the main job description text and additional information
 */
export interface JobAdDescription {
  text?: string;
  company_information?: string;
  needs?: string;
  requirements?: string;
}

/**
 * Employer information
 * Details about the company or organization posting the job
 */
export interface Employer {
  name?: string;
  workplace?: string;
  url?: string;
}

/**
 * Salary information
 * Details about compensation for the position
 */
export interface Salary {
  label: string;
}

/**
 * Workplace address information
 * Location details for the job position
 */
export interface WorkplaceAddress {
  municipality?: string;
  region?: string;
  country?: string;
  street?: string;
  postcode?: string;
}

/**
 * Application details
 * Information about how to apply for the job
 */
export interface ApplicationDetails {
  url?: string;
  email?: string;
  other?: string;
}

/**
 * Scope of work
 * Information about work percentage (full-time, part-time, etc.)
 */
export interface ScopeOfWork {
  min?: number;
  max?: number;
}

/**
 * Generic concept interface
 * Used for various categorized data like working hours, duration, etc.
 */
export interface Concept {
  concept_id?: string;
  label?: string;
}

/**
 * Occupation information
 * Details about the specific job role/position
 */
export interface Occupation {
  concept_id?: string;
  label?: string;
}

/**
 * Weighted taxonomy items
 * Categorized job information with relevance weights
 */
export interface WeightedJobtechTaxonomyItem {
  id?: string;
  label?: string;
  weight?: number;
  type?: string;
}

/**
 * Freetext concepts
 * Additional keywords and concepts associated with the job
 */
export interface FreetextConcept {
  id?: string;
  label?: string;
}
