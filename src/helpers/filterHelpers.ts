// filterHelpers.ts
// This file contains helper functions for filtering job advertisements

import type { JobAd } from "../types/jobs";
import { jobMatchesOccupationField } from "./jobBranchClassifier";

/**
 * Filters job advertisements based on location, branch, and search term
 * @param jobs - Array of job advertisements to filter
 * @param selectedLocations - Array of selected location filters
 * @param selectedBranches - Array of selected branch filters
 * @param searchTerm - Search term to filter by
 * @returns Filtered array of job advertisements
 */
export const filterJobs = (
    jobs: JobAd[], 
    selectedLocations: string[], 
    selectedBranches: string[], 
    searchTerm: string
): JobAd[] => {
    return jobs.filter(job => {
        // Check if job matches location filter (if any locations are selected)
        const matchesLocation = selectedLocations.length === 0 || 
            selectedLocations.includes(job.workplace_address?.region || '');
        
        // Check if job matches branch filter
        const matchesBranch = jobMatchesOccupationField(job, selectedBranches);
        
        // Enhanced search - search in multiple fields
        // If no search term, show all jobs (no search filtering)
        const matchesSearch = !searchTerm || (() => {
            const searchLower = String(searchTerm).toLowerCase();
            return (
                // Search in job headline
                job.headline?.toLowerCase().includes(searchLower) ||
                // Search in employer name
                job.employer?.name?.toLowerCase().includes(searchLower) ||
                // Search in workplace name
                job.employer?.workplace?.toLowerCase().includes(searchLower) ||
                // Search in occupation label
                job.occupation?.label?.toLowerCase().includes(searchLower) ||
                // Search in region
                job.workplace_address?.region?.toLowerCase().includes(searchLower) ||
                // Search in municipality
                job.workplace_address?.municipality?.toLowerCase().includes(searchLower) ||
                // Search in job description
                job.description?.text?.toLowerCase().includes(searchLower) ||
                // Search in free text concepts
                job.freetext_concepts?.some(concept => 
                    concept.label?.toLowerCase().includes(searchLower)
                )
            );
        })();
        
        // Job must match ALL active filters
        return matchesLocation && matchesBranch && matchesSearch;
    });
};

/**
 * Generates a human-readable description of the current filter state
 * @param selectedLocations - Array of selected location filters
 * @param selectedBranches - Array of selected branch filters
 * @param searchTerm - Current search term
 * @returns String description of active filters
 */
export const getFilterDescription = (
    selectedLocations: string[], 
    selectedBranches: string[], 
    searchTerm: string
): string => {
    console.log('Current filter state:', { selectedLocations, selectedBranches, searchTerm });
    const filters = [];
    
    // Add location filter description
    if (selectedLocations.length > 0) filters.push(`Ort: ${selectedLocations.join(", ")}`);
    
    // Add branch filter description
    if (selectedBranches.length > 0) filters.push(`Bransch: ${selectedBranches.join(", ")}`);
    
    // Add search term description
    if (searchTerm) filters.push(`Sökord: "${searchTerm}"`);
    
    // Return appropriate message based on filter state
    if (filters.length === 0) return "Inga filter applicerade";
    return `Aktiva filter: ${filters.join(", ")}`;
};
