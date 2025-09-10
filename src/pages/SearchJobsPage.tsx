// SearchJobsPage.tsx

import { useEffect, useState } from "react";
import { fetchJobs } from "../services/fetchJobServices";
import type { JobAd } from "../types/jobs";

import { DigiButton } from '@digi/arbetsformedlingen-react';
import { ButtonSize, ButtonVariation } from '@digi/arbetsformedlingen';

export const SearchJobsPage = () => {

    // Store jobs from the API
    const [jobs, setJobs] = useState<JobAd[]>([])

    // Track how many jobs we have loaded
    const [offset, setOffset] = useState(0);

    // Track if we are currently loading jobs
    const [loading, setLoading] = useState(false);

    // Number of jobs to load per page
    const limit = 10;
   
    
   // Load jobs when the page loads or offset changes
   useEffect(() => {
    const loadJobs = async () => {
        setLoading(true); // Start loading
        const newJobs = await fetchJobs(limit, offset); // Fetch jobs from API
        setJobs((prev) => [...prev, ...newJobs]); // Add new jobs to the list
        setLoading(false); // Stop loading
    };

    // This effect calls loadJobs() to fetch new jobs from the API whenever the `offset` changes, allowing the list to update and load more jobs when the user clicks "Load more".
    loadJobs();
    }, [offset]);


    // Run when user clicks "Visa fler"-button
    const handleLoadMore = () => {
        setOffset((prev) => prev + limit);
    };
    
    return (
    <>
        {loading && <div>Loading jobs...</div>}
            <section>
                <ul> 
                    {jobs.map((job) => (
                        <li key={job.id}>
                            <span>{job.workplace_address?.region}</span>
                            <h2>{job.headline}</h2>
                        </li>
                    ))} 
                </ul>
            </section>

            <DigiButton
                onClick={handleLoadMore}
                afSize={ButtonSize.MEDIUM}
                afVariation={ButtonVariation.PRIMARY}
                afFullWidth={false}>
                Visa fler
            </DigiButton>
    </>
    )
}