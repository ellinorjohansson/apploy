import type { JobAd } from "../types/jobs";
import { saveJobToLocalStorage } from "../helpers/ls";

export enum JobActionTypes {
  ADDED,
  REMOVED,
  TOGGLED,
}

export type JobAction =
  | { type: JobActionTypes.ADDED; payload: JobAd }
  | { type: JobActionTypes.REMOVED; payload: string }
  | { type: JobActionTypes.TOGGLED; payload: string };

export const JobReducer = (jobs: JobAd[], action: JobAction): JobAd[] => {
  let returnValue: JobAd[] = [];

  switch (action.type) {
    case JobActionTypes.ADDED: {
      // Check if job is already in the list
      if (jobs.some((job) => job.id === action.payload.id)) {
        return jobs;
      }

      // Add the new job by applied: false, as default
      returnValue = [...jobs, { ...action.payload, applied: false }];
      saveJobToLocalStorage(JSON.stringify(returnValue));
      return returnValue;
    }

    case JobActionTypes.REMOVED: {
      // Remove job by matching id
      returnValue = jobs.filter((job) => job.id !== action.payload);
      saveJobToLocalStorage(JSON.stringify(returnValue));
      return returnValue;
    }

    case JobActionTypes.TOGGLED: {
      const returnValue = jobs.map((job) =>
        job.id === action.payload ? { ...job, applied: !job.applied } : job
      );
      saveJobToLocalStorage(JSON.stringify(returnValue));
      return returnValue;
    }


    default:
      return jobs;
  }
};
