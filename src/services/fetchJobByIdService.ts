import axios from "axios";
import type { JobAd } from "../types/jobs";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://jobsearch.api.jobtechdev.se";

export async function fetchJobById(jobId: string): Promise<JobAd> {
  try {
    const response = await axios.get<JobAd>(`${API_BASE_URL}/ad/${jobId}`);

    if (!response.data || !response.data.id) {
      throw new Error("Invalid job data received");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Job not found (404)");
      }
      throw new Error(`API Error: ${error.response?.status}`);
    }

    throw error;
  }
}
