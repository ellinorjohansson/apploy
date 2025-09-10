// SearchJobsPage.tsx

import { useEffect, useState } from "react";
import { fetchJobs } from "../services/fetchJobServices";
import type { JobAd } from "../types/jobs";
import { DigiButton } from '@digi/arbetsformedlingen-react';
import { ButtonVariation } from '@digi/arbetsformedlingen';


export const SearchJobsPage = () => {

    const [jobs, setJobs] = useState<JobAd[]>([])
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const limit = 10; // Amount of job ads per page
    
    // Function to load jobs
    const loadJobs = async () => {
        setLoading(true);
        const newJobs = await fetchJobs(limit, offset);
        setJobs((prev) => [...prev, ...newJobs]);
        setLoading(false);
    };

    // Get the first set of jobs when the component mounts or offset changes
    useEffect(() => {
        loadJobs();
    }, [offset]);

    // "Show more"-button
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

        <DigiButton onClick={handleLoadMore} afVariation={ButtonVariation.PRIMARY} style={{ marginTop: "1rem" }}>
            Visa fler
        </DigiButton>
    </>
    )
}