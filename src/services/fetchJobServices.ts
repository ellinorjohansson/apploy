// fetchJobService.ts

import axios from 'axios';
import type { JobAd } from "../types/jobs";

// Open API 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jobsearch.api.jobtechdev.se';


export async function fetchJobs(limit = 20, offset = 0): Promise<JobAd[]> {
    try {
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                limit,
                offset,
            },
        });
        return response.data?.hits || [];
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}