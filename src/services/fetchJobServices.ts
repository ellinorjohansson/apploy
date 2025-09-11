// fetchJobService.ts

import axios from 'axios';
import type { JobAd } from "../types/jobs";

// Open API 
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://jobsearch.api.jobtechdev.se';


export async function fetchJobs(limit = 20, offset = 0): Promise<JobAd[]> {
    try {
        // Add some randomization to get more variety
        const randomOffset = offset + Math.floor(Math.random() * 200);
        
        // Array of different occupation fields for variety
        const occupationFields = [
            'Hälsa, medicin, vård, omsorg',
            'Data, IT, telekommunikation',
            'Administration, ekonomi, juridik',
            'Bygg, anläggning, installation',
            'Försäljning, inköp, marknadsföring',
            'Teknik, tillverkning, transport'
        ];
        
        // Pick a random occupation field
        const randomField = occupationFields[Math.floor(Math.random() * occupationFields.length)];
        
        const response = await axios.get(`${API_BASE_URL}/search`, {
            params: {
                limit,
                offset: randomOffset,
                // Add some filters to get more variety
                'occupation.label': randomField,
            },
        });
        return response.data?.hits || [];
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
}