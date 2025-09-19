// SearchJobsPage.tsx
// Main component for searching and filtering job advertisements
// This page allows users to search for jobs, filter by location and branch, and view results

import { useEffect, useState } from "react";
import { fetchJobs, type FetchJobsResult } from "../services/fetchJobServices";
import type { JobAd } from "../types/jobs";
import { AppButton } from "../components/buttons/AppButton";
import { JobCard } from "../components/JobCard";
import { DigiFormInputSearch, DigiFormFilter, DigiNavigationPagination, DigiTypography } from "@digi/arbetsformedlingen-react";
import { FormInputSearchVariation, FormInputType, TypographyVariation } from "@digi/arbetsformedlingen";
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
    // State for storing current page job advertisements
    const [jobs, setJobs] = useState<JobAd[]>([])

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [totalJobs, setTotalJobs] = useState(0)

    // Loading state to show loading indicator
    const [loading, setLoading] = useState(false);

    // Filter states - arrays to support multiple selections
    const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
    const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    
    // Key state for forcing component re-render when clearing filters
    const [filterResetKey, setFilterResetKey] = useState<number>(0);
    
    /**
     * Smooth scroll to top of page
     * Used when changing pages, filters, or clearing filters
     */
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
        setJobs([]); // Clear existing jobs when filters change
    }, [selectedBranches, selectedLocations, searchTerm]);

    // Load jobs when page or filters change
    useEffect(() => {
        const loadJobs = async () => {
            setLoading(true); // Show loading indicator
            setJobs([]); // Clear existing jobs to prevent DOM conflicts
            
            const offset = (currentPage - 1) * JOBS_PER_PAGE;
            const result: FetchJobsResult = await fetchJobs(
                JOBS_PER_PAGE, 
                offset, 
                selectedBranches, 
                selectedLocations, 
                searchTerm
            );
            
            setJobs(result.jobs);
            setTotalJobs(result.total);
            setTotalPages(Math.max(1, Math.ceil(result.total / JOBS_PER_PAGE)));
            setLoading(false); // Hide loading indicator
        };

        // Load jobs whenever page or filters change
        loadJobs();
    }, [currentPage, selectedBranches, selectedLocations, searchTerm]);

    // Smooth scroll to top when filters change (but not for pagination)
    useEffect(() => {
        if (selectedBranches.length > 0 || selectedLocations.length > 0 || searchTerm.trim()) {
            scrollToTop();
        }
    }, [selectedBranches, selectedLocations, searchTerm]);

    // Handle page change for pagination
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        scrollToTop();
    };

    /**
     * Clears all active filters and resets the job search
     * Resets search term, selected locations, selected branches, and fetches fresh jobs
     * Also forces UI components to reset by changing their key
     */
    const handleClearFilters = async () => {
        setSearchTerm('');
        setSelectedLocations([]);
        setSelectedBranches([]);
        setCurrentPage(1);
        setJobs([]);
        
        // Force UI components to reset by changing their key
        setFilterResetKey(prev => prev + 1);
        
        // Smooth scroll to top when clearing filters
        scrollToTop();
        
        // Fetch fresh jobs without any filters
        setLoading(true);
        try {
            const result = await fetchJobs(JOBS_PER_PAGE, 0, [], [], '');
            setJobs(result.jobs);
            setTotalJobs(result.total);
            setTotalPages(Math.max(1, Math.ceil(result.total / JOBS_PER_PAGE)));
        } catch (error) {
            console.error('Error fetching fresh jobs:', error);
        } finally {
            setLoading(false);
        }
    };

    // Jobs are already filtered by the server, so we use them directly
    const filteredJobs = jobs;
    
    // Check if we have conflicting filters (search term takes priority)
    const hasConflictingFilters = searchTerm.trim() && (selectedBranches.length > 0 || selectedLocations.length > 0);
    
    return (
        <div className="search-page">
            <DigiTypography afVariation={TypographyVariation.SMALL}>
                <h3 className="search-subtitle">Hitta ditt nästa jobb bland tusentals möjligheter</h3>
            </DigiTypography>
           
            <div className="search-section">
            <div className="search-bar-wrapper">
                <div className="search-bar-container">
  <DigiFormInputSearch
    key={`search-${filterResetKey}`}
    afLabel="Sök jobb"
    afVariation={FormInputSearchVariation.MEDIUM}
    afType={FormInputType.SEARCH}
    afButtonText="Sök"
     onAfOnChange={(e: CustomEvent) => setSearchTerm(extractSearchValue(e))}
     onAfOnSubmitSearch={(e: CustomEvent) => setSearchTerm(extractSearchValue(e))} 
  />
</div>
  <div className="filter-dropdowns">
    <DigiFormFilter
      key={`location-${filterResetKey}`}
      afFilterButtonText="Ort"
      afSubmitButtonText="Filtrera"
      afName="Välj ort"
      afListItems={SWEDISH_COUNTIES.map(county => ({ id: county, label: county }))}
       onAfSubmitFilter={(e: CustomEvent) => setSelectedLocations(extractCheckedItems(e))}
       onAfResetFilter={() => setSelectedLocations([])}
    />
    <DigiFormFilter
      key={`branch-${filterResetKey}`}
      afFilterButtonText="Bransch"
      afSubmitButtonText="Filtrera"
      afName="Välj bransch"
      afListItems={JOB_BRANCHES.map(branch => ({ id: branch || '', label: branch || '' }))}
       onAfSubmitFilter={(e: CustomEvent) => setSelectedBranches(extractCheckedItems(e))}
       onAfResetFilter={() => setSelectedBranches([])}
    />
  </div>
</div>

                
                {/* Display number of search results */}
                <DigiTypography afVariation={TypographyVariation.SMALL}>
                    <div className="search-results-info">
                        Din sökning gav {totalJobs} träffar/möjligheter
                    </div>
                </DigiTypography>
                
                {/* Display current filter state */}
                <div className="filter-section">
                    <div className="filter-header">
                        <DigiTypography afVariation={TypographyVariation.SMALL}>
                            <p className="filter-description">{getFilterDescription(selectedLocations, selectedBranches, searchTerm)}</p>
                        </DigiTypography>
                        {(selectedBranches.length > 0 || selectedLocations.length > 0 || searchTerm.trim()) && (
                            <AppButton onClick={handleClearFilters} variant="secondary">Rensa filter</AppButton>
                        )}
                    </div>
                    {hasConflictingFilters && (
                        <DigiTypography afVariation={TypographyVariation.SMALL}>
                            <div className="filter-warning">
                                <p>Sökterm har prioritet - bransch- och ort-filter ignoreras</p>
                            </div>
                        </DigiTypography>
                    )}
                </div>
            </div>
            
            {/* Loading indicator */}
            {loading && (
                <DigiTypography afVariation={TypographyVariation.SMALL}>
                    <div className="loading-indicator">Laddar fler jobb...</div>
                </DigiTypography>
            )}
            
            {/* Job cards container - key prop forces re-render when page or results change */}
            <div 
                className="job-cards-container"
                key={`page-${currentPage}-${filteredJobs.length}`}
            >
                {filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job}/>
                ))}
            </div>
            
            {/* Pagination */}
            <div className="pagination-wrapper">
                <DigiNavigationPagination
                    afTotalPages={totalPages}
                    afInitActivePage={currentPage}
                    onAfOnPageChange={(event: CustomEvent<number>) => {
                        const newPage = event.detail;
                        handlePageChange(newPage);
                    }}
                />
            </div>
        </div>
    )
}