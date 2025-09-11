import { createContext, type Dispatch } from "react";
import type { JobAd } from "../types/jobs";
import type { JobAction } from "../reducers/SaveJobReducer";

type JobsContextType = {
  jobs: JobAd[];
  dispatch: Dispatch<JobAction>;
};

export const JobsContext = createContext<JobsContextType>({
  jobs: [],
  dispatch: () => {},
});
