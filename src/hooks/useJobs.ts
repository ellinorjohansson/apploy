import { useContext } from "react";
import { JobsContext } from "../contexts/SaveJobContext";

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs needs to use in JobsProvider");
  return context;
};
