import type { JobAd } from "../types/jobs";

export enum JobActionTypes {
  ADDED,
  REMOVED,
  TOGGLED,
}

export type JobAction =
  | { type: JobActionTypes.ADDED; payload: JobAd }
  | { type: JobActionTypes.REMOVED; payload: string } 
  | { type: JobActionTypes.TOGGLED; payload: string }; 

export const JobReducer = (
  jobs: JobAd[],
  action: JobAction
): JobAd[] => {
  switch (action.type) {
    case JobActionTypes.ADDED:
        // If job already exist, return the same list
      if (jobs.some((job) => job.id === action.payload.id)) {
        return jobs;
      }
      // If job not in the list, add job with start of applied: false
      return [...jobs, { ...action.payload, applied: false }];

    case JobActionTypes.REMOVED:
        // Find job with the same id and delete it from list
      return jobs.filter((job) => job.id !== action.payload);

    case JobActionTypes.TOGGLED:
        // Find job by id and change applied status
      return jobs.map((job) =>
        job.id === action.payload
          ? { ...job, applied: !job.applied }
          : job
      );

    default:
      return jobs;
  }
};
