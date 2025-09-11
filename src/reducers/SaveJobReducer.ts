import type { JobAd } from "../types/jobs";
import { saveCartToLocalStorage } from "../helpers/ls";

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
      saveCartToLocalStorage(JSON.stringify(returnValue));
      return returnValue;
    }

    case JobActionTypes.REMOVED: {
      // Remove job by matching id
      returnValue = jobs.filter((job) => job.id !== action.payload);
      saveCartToLocalStorage(JSON.stringify(returnValue));
      return returnValue;
    }

    case JobActionTypes.TOGGLED: {
      // Toggle between save and applied
      returnValue = jobs.map((job) =>
        job.id === action.payload ? { ...job, applied: true } : job
      );
      saveCartToLocalStorage(JSON.stringify(returnValue));
      return returnValue;
    }

    default:
      return jobs;
  }
};
