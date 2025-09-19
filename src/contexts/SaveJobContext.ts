// SaveJobContext.ts

import { createContext, type Dispatch } from "react";
import type { JobAd } from "../types/jobs";
import type { JobAction } from "../reducers/SaveJobReducer";

// Define the shape of the context state and actions
type JobsContextType = {
  jobs: JobAd[];
  dispatch: Dispatch<JobAction>;
};

// Create the context with a default value
export const JobsContext = createContext<JobsContextType>({
  jobs: [],
  dispatch: () => { },
});
