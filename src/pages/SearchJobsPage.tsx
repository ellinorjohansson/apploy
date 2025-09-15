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
import { extractSearchValue, extractCheckedItems } from "../helpers/eventHandlers";

/**
 * Generates a description of the current active filters
 * @param selectedLocations - Array of selected locations
 * @param selectedBranches - Array of selected branches  
 * @param searchTerm - Current search term
 * @returns Description string of active filters
 */
const getFilterDescription = (
    selectedLocations: string[], 
    selectedBranches: string[], 
    searchTerm: string
): string => {
    const filters = [];
    
    if (selectedLocations.length > 0) {
        filters.push(`Ort: ${selectedLocations.join(', ')}`);
    }
    
    if (selectedBranches.length > 0) {
        filters.push(`Bransch: ${selectedBranches.join(', ')}`);
    }
    
    if (searchTerm.trim()) {
        filters.push(`Sökord: "${searchTerm}"`);
    }
    
    return filters.length > 0 
        ? `Aktiva filter: ${filters.join(' | ')}`
        : 'Inga filter aktiva - visar alla jobb';
};

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
   
    

    // Reset offset when filters change
    useEffect(() => {
        setOffset(0);
        setJobs([]); // Clear existing jobs when filters change
    }, [selectedBranches, selectedLocations, searchTerm]);

    // Load jobs when the page loads or offset changes
    useEffect(() => {
        const loadJobs = async () => {
            setLoading(true); // Show loading indicator
            
            const newJobs = await fetchJobs(
                JOBS_PER_PAGE, 
                offset, 
                selectedBranches, 
                selectedLocations, 
                searchTerm
            );
            
            console.log('New jobs loaded:', newJobs.length);
            console.log('Applied filters:', { selectedBranches, selectedLocations, searchTerm });
            console.log('API params being sent:', { selectedBranches, selectedLocations, searchTerm });
            
            setJobs((prev) => offset === 0 ? newJobs : [...prev, ...newJobs]);
            setLoading(false); // Hide loading indicator
        };

        // Load jobs whenever offset changes
        loadJobs();
    }, [offset, selectedBranches, selectedLocations, searchTerm]);

    // Handle "Load more" button click - increases offset to load next page
    const handleLoadMore = () => {
        setOffset((prev) => prev + JOBS_PER_PAGE);
    };

    /**
     * Clears all active filters and resets the job search
     * Resets search term, selected locations, selected branches, and fetches fresh jobs
     */
    const handleClearFilters = async () => {
        setSearchTerm('');
        setSelectedLocations([]);
        setSelectedBranches([]);
        setOffset(0);
        setJobs([]);
        
        // Fetch fresh jobs without any filters
        setLoading(true);
        try {
            const freshJobs = await fetchJobs(JOBS_PER_PAGE, 0, [], [], '');
            setJobs(freshJobs);
            setOffset(JOBS_PER_PAGE);
        } catch (error) {
            console.error('Error fetching fresh jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Jobs are already filtered by the server, so we use them directly
    const filteredJobs = jobs;
    
    return (
        <div className="search-page">
            <h3 className="search-subtitle">Hitta ditt nästa jobb bland tusentals möjligheter</h3>
           
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
                    <div className="filter-header">
                        <p className="filter-description">{getFilterDescription(selectedLocations, selectedBranches, searchTerm)}</p>
                        {(selectedBranches.length > 0 || selectedLocations.length > 0 || searchTerm.trim()) && (
                            <AppButton onClick={handleClearFilters} variant="secondary">Rensa filter</AppButton>
                        )}
                    </div>
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