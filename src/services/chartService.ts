// chartService.ts

import axios from 'axios';
import type { JobAd } from "../types/jobs";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jobsearch.api.jobtechdev.se';

// Get data published within 24 hours
export async function fetchChartJobs(limit = 100, offset = 0): Promise<JobAd[]> {
    try {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                limit,
                offset,
            },
        });

        const jobs: JobAd[] = response.data?.hits || [];

        // Filter job on date
        const recentJobs = jobs.filter(job => {
            if (!job.publication_date) return false;
            const pubDate = new Date(job.publication_date);
            return pubDate >= yesterday && pubDate <= now;
        });

        return recentJobs;
    } catch (error) {
        console.error('Error fetching chart jobs:', error);
        return [];
    }
}
