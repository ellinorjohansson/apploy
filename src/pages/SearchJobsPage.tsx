// SearchJobsPage.tsx

import { useEffect, useState } from "react";
import { fetchJobs } from "../services/fetchJobServices";
import type { JobAd } from "../types/jobs";
import { AppButton } from "../components/buttons/AppButton";
import { useJobs } from "../hooks/useJobs"; // FLYTTA TILL DETAIL
import { JobActionTypes } from "../reducers/SaveJobReducer"; // FLYTTA TILL DETAIL

export const SearchJobsPage = () => {

    // Store jobs from the API
    const [jobs, setJobs] = useState<JobAd[]>([])

    // Track how many jobs we have loaded
    const [offset, setOffset] = useState(0);

    // Track if we are currently loading jobs
    const [loading, setLoading] = useState(false);

    // Number of jobs to load per page
    const limit = 10;

    const { dispatch } = useJobs(); // FLYTTA TILL DETAIL
   
    
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

    // FLYTTA TILL DETAIL + KNAPPEN I RETURN
    const handleSaveJob = (job: JobAd) => {
        dispatch({ type: JobActionTypes.ADDED, payload: job });
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
                            <AppButton onClick={() => handleSaveJob(job)}>
                                Spara jobb
                            </AppButton>
                        </li>
                    ))} 
                </ul>
            </section>
            <AppButton onClick={handleLoadMore}>Se fler</AppButton>
    </>
    )
}