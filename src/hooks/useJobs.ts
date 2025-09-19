// useJobs.ts

import { useContext } from "react";
import { JobsContext } from "../contexts/SaveJobContext";

// Custom hook to access the JobsContext
export const useJobs = () => {
  const context = useContext(JobsContext);

  // Ensure the hook is only used within a JobsProvider
  if (!context) throw new Error("useJobs needs to use in JobsProvider");
  return context;
};
