// SearchJobsPage.tsx
// Main component for searching and filtering job advertisements
// This page allows users to search for jobs, filter by location and branch, and view results

import { useEffect, useState } from "react";
import { fetchJobs } from "../services/fetchJobServices";
import type { JobAd } from "../types/jobs";
import { AppButton } from "../components/buttons/AppButton";
import { JobCard } from "../components/JobCard";
import { DigiInfoCardMultiContainer, DigiFormInputSearch, DigiFormFilter } from "@digi/arbetsformedlingen-react";
import { FormInputSearchVariation, FormInputType } from "@digi/arbetsformedlingen";
import { SWEDISH_COUNTIES, JOB_BRANCHES, JOBS_PER_PAGE } from "../constants/filterConstants";
import { filterJobs, getFilterDescription } from "../helpers/filterHelpers";
import { extractSearchValue, extractCheckedItems } from "../helpers/eventHandlers";
import { getJobBranch } from "../helpers/jobBranchClassifier";

export const SearchJobsPage = () => {
    // State for storing all loaded job advertisements
    const [jobs, setJobs] = useState<JobAd[]>([])

    // Track pagination offset for loading more jobs
    const [offset, setOffset] = useState(0);

    // Loading state to show loading indicator
    const [loading, setLoading] = useState(false);

    // Filter states - arrays to support multiple selections
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
   
    

    // Load jobs when the page loads or offset changes
    useEffect(() => {
        const loadJobs = async () => {
            setLoading(true); // Show loading indicator
            const newJobs = await fetchJobs(JOBS_PER_PAGE, offset); // Fetch jobs from API
            
            // Debug: Log occupation labels to see what's available
            console.log('New jobs loaded:', newJobs.length);
            const occupationLabels = newJobs.map(job => job.occupation?.label).filter(Boolean);
            console.log('Occupation labels from API:', [...new Set(occupationLabels)]);
            
            // Debug: Test branch classification for first 5 jobs
            if (newJobs.length > 0) {
                console.log('Testing branch classification for first 5 jobs:');
                newJobs.slice(0, 5).forEach((job, index) => {
                    const branch = getJobBranch(job);
                    console.log(`Job ${index + 1}:`, {
                        headline: job.headline,
                        occupation: job.occupation?.label,
                        classifiedBranch: branch
                    });
                });
                
                // Debug: Check for media/design jobs specifically
                console.log('Looking for media/design jobs:');
                newJobs.forEach((job, index) => {
                    const occupationLabel = job.occupation?.label?.toLowerCase() || '';
                    if (occupationLabel.includes('design') || 
                        occupationLabel.includes('media') || 
                        occupationLabel.includes('foto') || 
                        occupationLabel.includes('journalist') ||
                        occupationLabel.includes('grafisk') ||
                        occupationLabel.includes('video') ||
                        occupationLabel.includes('film') ||
                        occupationLabel.includes('reklam') ||
                        occupationLabel.includes('konst') ||
                        occupationLabel.includes('fotograf') ||
                        occupationLabel.includes('kreativ')) {
                        const branch = getJobBranch(job);
                        console.log(`Media/Design job ${index + 1}:`, {
                            headline: job.headline,
                            occupation: job.occupation?.label,
                            classifiedBranch: branch
                        });
                    }
                });
            }
            
            setJobs((prev) => [...prev, ...newJobs]); // Append new jobs to existing list
            setLoading(false); // Hide loading indicator
        };

        // Load jobs whenever offset changes (pagination)
        loadJobs();
    }, [offset]);

    // Handle "Load more" button click - increases offset to load next page
    const handleLoadMore = () => {
        setOffset((prev) => prev + JOBS_PER_PAGE);
    };

    // Apply all active filters to the job list
    const filteredJobs = filterJobs(jobs, selectedLocations, selectedBranches, searchTerm);
    
    return (
        <div className="search-page">
            <div className="search-header">
                <h1 className="search-title">Utforska aktuella jobbannonser från hela Sverige</h1>
                <p className="search-subtitle">Hitta ditt nästa jobb bland tusentals möjligheter</p>
            </div>
            
            <div className="search-section">
                <div className="search-bar-container">
                    {/* Main search input */}
                    <DigiFormInputSearch
                        afLabel="Sök jobb"
                        afVariation={FormInputSearchVariation.LARGE}
                        afType={FormInputType.SEARCH}
                        afButtonText="Sök"
                        onAfOnChange={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            console.log('Search changed:', e.detail);
                            setSearchTerm(extractSearchValue(e));
                        }}
                        onAfOnSubmitSearch={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                            console.log('Search submitted:', e.detail);
                            setSearchTerm(extractSearchValue(e));
                        }}
                    />
                    <div className="filter-dropdowns">
                        {/* Location filter dropdown */}
                        <DigiFormFilter
                            afFilterButtonText="Ort"
                            afSubmitButtonText="Filtrera"
                            afName="Välj ort"
                            afListItems={SWEDISH_COUNTIES.map(county => ({
                                id: county,
                                label: county
                            }))}
                            onAfSubmitFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Location filter submitted:', e.detail);
                                setSelectedLocations(extractCheckedItems(e));
                            }}
                            onAfResetFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Location filter reset:', e.detail);
                                setSelectedLocations([]);
                            }}
                        />
                        {/* Branch filter dropdown */}
                        <DigiFormFilter
                            afFilterButtonText="Bransch"
                            afSubmitButtonText="Filtrera"
                            afName="Välj bransch"
                            afListItems={JOB_BRANCHES.map(branch => ({
                                id: branch || '',
                                label: branch || ''
                            }))}
                            onAfSubmitFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Branch filter submitted:', e.detail);
                                setSelectedBranches(extractCheckedItems(e));
                            }}
                            onAfResetFilter={(e: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
                                console.log('Branch filter reset:', e.detail);
                                setSelectedBranches([]);
                            }}
                        />
                    </div>
                </div>
                
                {/* Display number of search results */}
                <div className="search-results-info">
                    Din sökning gav {filteredJobs.length} träffar/möjligheter
                </div>
                
                {/* Display current filter state */}
                <div className="filter-section">
                    <p className="filter-description">{getFilterDescription(selectedLocations, selectedBranches, searchTerm)}</p>
                </div>
            </div>
            
            {/* Loading indicator */}
            {loading && <div className="loading-indicator">Laddar fler jobb...</div>}
            
            {/* Job cards container - key prop forces re-render when filter results change */}
            <DigiInfoCardMultiContainer key={filteredJobs.length}>
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </DigiInfoCardMultiContainer>
            
            {/* Load more button for pagination */}
            <div className="load-more-container">
                <AppButton onClick={handleLoadMore}>Se fler</AppButton>
            </div>
        </div>
    )
}