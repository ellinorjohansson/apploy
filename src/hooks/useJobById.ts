import { useState, useEffect } from "react";
import { fetchJobById } from "../services/fetchJobByIdService";
import type { JobAd } from "../types/jobs";

  
  export const useJobById = (jobId: string) => {
  
    const [job, setJob] = useState<JobAd | null>(null); // State för enskilt jobb

    const [loading, setLoading] = useState(false); // Loading state

    const [error, setError] = useState<string | null>(null) // State för Error
  
  useEffect(() => {
    if(!jobId) {
        setError("Jobbannonsens id saknas")
        return;
    }
    const getJob = async () => {
    setLoading(true);
    setError(null)
      try {
        const data = await fetchJobById(`${jobId}`);
        setJob(data);
      } catch (err) {
        console.error(err);
        setError("Något gick fel")
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [jobId]);

  return { job, loading, error}
  }